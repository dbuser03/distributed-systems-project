import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Types "../Model/types";
import DocumentStore "../Services/document_store";
import ReverseIndexes "../Services/reverse_indexes";
import Region "mo:base/Region";
import ReferenceData "../Model/reference_data";
import Demo "../Utils/load_demo";
import Utils "../Utils/utils";
import Time "mo:base/Time";
import Result "mo:base/Result";
import UserLogic "../Services/user_logic";

// This will act as a central hub: receives the requests from the user (add post, like, unlike, etc.) calls the relative methods in documentStore, and keeps a reverse index (cache) of the threads by likes and tags to make the front page navigable.
persistent actor Forum {

  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type HydratedThread = Types.HydratedThread;
  public type VoteType = Types.VoteType;

  transient var threadsStore = HashMap.HashMap<ThreadId, Thread>(10, Text.equal, Text.hash);
  // start for the storage of blobs
  var fileRegion : Region.Region = Region.new();
  var base : Nat64 = 0;

  var userStore : [(Principal, Types.User)] = [];
  transient var users = HashMap.HashMap<Principal, Types.User>(10, Principal.equal, Principal.hash);

  transient var commentsStore = HashMap.HashMap<CommentId, Comment>(10, Text.equal, Text.hash);

  transient var tagIndex = HashMap.HashMap<Text, [ThreadId]>(
    20,
    Text.equal,
    Text.hash,
  );

  var scoreIndexOrdered : [(Int, ThreadId)] = [];
  transient var scoreIndexHash = HashMap.HashMap<ThreadId, Int>(10, Text.equal, Text.hash);
  var isScoreIndexSorted : Bool = false;

  transient var isicMap = HashMap.HashMap<Text, Text>(32, Text.equal, Text.hash);
  transient var countryMap = HashMap.HashMap<Text, Text>(32, Text.equal, Text.hash);

  do {
    for ((k, v) in ReferenceData.ISICSections.vals()) {
      isicMap.put(k, v);
    };

    for ((k, v) in ReferenceData.Countries.vals()) {
      countryMap.put(k, v);
    };
  };

  public shared (msg) func createThread(input : ThreadInput) : async {
    #id : ThreadId;
    #err : Int;
  } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };
    let ok = Utils.validateTags(input.tags, isicMap, countryMap);
    if (not ok) {
      return #err(400);
    };
    var lastStoredBatchSize : Nat64 = 0;
    switch (DocumentStore.ensureCapacity(fileRegion, input.file, base)) {
      case (#ok totalLen) {
        lastStoredBatchSize := totalLen;
      };
      case (#err _) {
        return #err(500);
      };
    };
    let id = await DocumentStore.createThread(threadsStore, caller, input, fileRegion, base);
    ReverseIndexes.indexThreadTags(tagIndex, input.tags, id);
    ReverseIndexes.indexThreadByScore(scoreIndexHash, id);
    await UserLogic.addUserThread(users, caller, id);
    #id(id);
  };

  public shared (msg) func createComment(input : CommentInput) : async {
    #ok : CommentId;
    #err : Int;
  } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };
    let res = await DocumentStore.createComment(threadsStore, commentsStore, caller, input);
    switch (res) {
      case (#err(e)) {
        return #err(e);
      };
      case (#ok(id)) {
        await UserLogic.addUserComment(users, caller, id);
        return #ok(id);
      };
    };
  };

  // single thread with only references to comments
  public shared func getThread(
    id : ThreadId
  ) : async { #ok : Thread; #err : Int } {
    await DocumentStore.getThread(threadsStore, id);
  };

  public shared func getThreads(
    ids : [ThreadId]
  ) : async [Thread] {
    await DocumentStore.getThreads(threadsStore, ids);
  };

  public shared func getHydratedThread(
    id : ThreadId
  ) : async { #ok : HydratedThread; #err : Int } {
    await DocumentStore.getHydratedThread(threadsStore, commentsStore, id, fileRegion);
  };

  public shared func getComments(ids : [CommentId]) : async [Comment] {
    await DocumentStore.getComments(commentsStore, ids);
  };

  public shared (msg) func addFeedbackThread(
    input : VoteType,
    threadId : ThreadId,
  ) : async { #status : Int } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #status(401);
    };
    let res = await DocumentStore.addFeedbackThread(threadsStore, users, caller, input, threadId);
    switch (res) {
      case (#status(code)) {
        #status(code);
      };
      case (#newScore(val)) {
        ReverseIndexes.updateScoreOfThread(scoreIndexHash, val, threadId);
        isScoreIndexSorted := false;
        switch (input) {
          case (#like) {
            await UserLogic.addLikedThread(users, caller, threadId);
          };
          case (#dislike) {
            await UserLogic.addDislikedThread(users, caller, threadId);
          };
          case (#none) {};
        };

        #status(200);
      };
    };
  };

  public shared (msg) func addFeedbackComment(
    input : VoteType,
    commentId : CommentId,
  ) : async { #status : Int } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #status(401);
    };
    let res = await DocumentStore.addFeedbackComment(commentsStore, users, caller, input, commentId);
    switch (res) {
      case (404) {
        #status(404);
      };
      case (200) {
        switch (input) {
          case (#like) {
            await UserLogic.addLikedComment(users, caller, commentId);
          };
          case (#dislike) {
            await UserLogic.addDislikedComment(users, caller, commentId);
          };
          case (#none) {};
        };
        #status(200);
      };
    };
  };

  public shared func getThreadsByTags(tags : [Text]) : async {
    #threads : [Thread];
    #err : Text;
  } {
    let ok = Utils.validateTags(tags, isicMap, countryMap);
    if (not ok) {
      return #err("Invalid tags");
    };
    let res = await ReverseIndexes.getThreadsByTags(threadsStore, tagIndex, tags);
    #threads(res);
  };

  public func getThreadsByScore(
    startIdx : Int,
    endIdx : Int,
  ) : async [Thread] {
    if (scoreIndexOrdered.size() == 0 and scoreIndexHash.size() == 0) {
      if (isScoreIndexSorted) {
        isScoreIndexSorted := false;
      };
      return [];
    };
    if (not isScoreIndexSorted) {
      scoreIndexOrdered := await ReverseIndexes.orderScoreIndex(scoreIndexHash);
      isScoreIndexSorted := true;
    };

    await ReverseIndexes.sliceByScore(
      threadsStore,
      scoreIndexOrdered,
      startIdx,
      endIdx,
    );
  };

  // Get all threads (for gallery page)
  public shared func getAllThreads() : async [Thread] {
    let allThreads = Iter.toArray(threadsStore.vals());
    // Sort by creation time, newest first
    Array.sort<Thread>(
      allThreads,
      func(a : Thread, b : Thread) : Order.Order {
        if (a.createdAt > b.createdAt) { #less } else if (a.createdAt < b.createdAt) {
          #greater;
        } else { #equal };
      },
    );
  };

  public query (message) func whoami() : async Principal {
    message.caller;
  };

  public shared (msg) func deleteThread(
    id : ThreadId
  ) : async { #status : Int } {
    if (not Utils.isValidUser(msg.caller, users)) {
      return #status(401);
    };
    switch (threadsStore.get(id)) {
      case (null) {
        return #status(404);
      };
      case (?thread) {
        if (thread.author != msg.caller) {
          return #status(401);
        };
        switch (thread.file) {
          case (null) {};
          case (?fileRefs) {
            base := DocumentStore.deleteFilesOfThread(base, fileRefs);
          };
        };
        switch (thread.comments) {
          case (null) {};
          case (?commentIds) {
            DocumentStore.deleteCommentsOfThread(commentsStore, commentIds);
          };
        };
        ignore threadsStore.remove(id);
        return #status(204);
      };
    };
  };

  public shared (msg) func deleteComment(commentId : CommentId) : async (status : Int) {
    if (not Utils.isValidUser(msg.caller, users)) {
      return 401;
    };
    await DocumentStore.deleteComment(threadsStore, commentsStore, msg.caller, commentId);
  };

  public query func getISICSections() : async [(Text, Text)] {
    Iter.toArray(isicMap.entries());
  };

  public query func getCountries() : async [(Text, Text)] {
    Iter.toArray(countryMap.entries());
  };

  //-------------------------------- User specific functions --------------------------------

  // Method to get all threads created by a user
  public shared (msg) func getUserThreads(userId : Principal) : async {
    #list : [Thread];
    #err : Int;
  } {
    if (not Utils.isValidUser(msg.caller, users)) {
      return #err(401);
    };
    // Fetch the user to ensure they exist and are not banned
    let userResult = users.get(userId);
    switch (userResult) {
      case (null) {
        return #err(500) // If user doesn't exist or is banned, return empty list
      };
      case (?user) {
        // Get the list of thread IDs from the user's data
        let threadIds = user.threads;
        if (threadIds == []) {
          return #list([]) // If no threads, return empty list
        };

        // Fetch the threads using the existing `getThreads` function
        let threads = await DocumentStore.getThreads(threadsStore, threadIds);
        return #list(threads); // Return the list of threads created by the user
      };
    };
  };

  public shared (msg) func getUserFeedbackOnThreads(
    userId : Principal,
    threadIds : [ThreadId],
  ) : async { #feedback : [(ThreadId, VoteType)]; #err : Int } {

    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };

    var results : [(ThreadId, VoteType)] = [];

    for (threadId in threadIds.vals()) {
      let vote = await UserLogic.hasUserLikedOrDislikedThread(users, userId, threadId);
      results := Array.append(results, [(threadId, vote)]);
    };

    return #feedback(results);
  };

  public shared (msg) func getUserFeedbackOnComments(
    userId : Principal,
    commentIds : [CommentId],
  ) : async { #feedback : [(CommentId, VoteType)]; #err : Int } {

    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };

    var results : [(CommentId, VoteType)] = [];

    for (commentId in commentIds.vals()) {
      let vote = await UserLogic.hasUserLikedOrDislikedComment(users, userId, commentId);
      results := Array.append(results, [(commentId, vote)]);
    };

    return #feedback(results);
  };

  // Method to check if a user liked or disliked a specific post (ThreadId)
  public shared (msg) func hasUserLikedOrDislikedThread(userId : Principal, postId : ThreadId) : async {
    #feedback : VoteType;
    #err : Int;
  } {
    if (not Utils.isValidUser(msg.caller, users)) {
      return #err(401);
    };
    let res = await UserLogic.hasUserLikedOrDislikedThread(users, userId, postId);
    return #feedback(res);
  };

  public shared (msg) func hasUserLikedOrDislikedComment(userId : Principal, commentId : CommentId) : async {
    #feedback : VoteType;
    #err : Int;
  } {
    if (not Utils.isValidUser(msg.caller, users)) {
      return #err(401);
    };
    let res = await UserLogic.hasUserLikedOrDislikedComment(users, userId, commentId);
    return #feedback(res);
  };

  //update user alias
  public shared (msg) func updateAlias(newAlias : Text) : async {
    #ok : Types.User;
    #err : Text;
  } {
    let caller = msg.caller;

    switch (users.get(caller)) {
      case (null) {
        return #err("Utente non trovato. Effettua il login prima.");
      };
      case (?existingUser) {

        if (existingUser.isBanned) {
          return #err("Sei bannato. Non puoi modificare il profilo.");
        };

        let updatedUser : Types.User = {
          id = existingUser.id;
          alias = newAlias;
          role = existingUser.role;
          credibilityScore = existingUser.credibilityScore;
          isBanned = existingUser.isBanned;
          createdAt = existingUser.createdAt;
          threads = existingUser.threads;
          comments = existingUser.comments;
          likedThreads = existingUser.likedThreads;
          dislikedThreads = existingUser.dislikedThreads;
          dislikedComments = existingUser.dislikedComments;
          likedComments = existingUser.likedComments;
        };

        users.put(caller, updatedUser);
        return #ok(updatedUser);
      };
    };
  };

  //get profile of the caller
  public shared (msg) func getMyProfile() : async {
    #ok : Types.User;
    #err : Text;
  } {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?user) #ok(user);
      case (null) {
        return #err("USER NOT REGISTERED");
      };
    };
  };

  // get user role
  public shared (msg) func getMyRole() : async Types.Role {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?user) user.role;
      case (null) #User;
    };
  };

  // thats me (alessio) for testing, u might want to change it to yout current internet identity ID that u are using.
  // I know that it is horrible hardcoded like this, but ya know. Feel free to change it.
  let OWNER_ID = Principal.fromText("s26nm-yteng-muide-2zjtd-hq4s7-ah76k-5ilng-7ergv-t74p3-d7rxq-yqe");

  // promote user to admin or verifier
  public shared (msg) func promoteUser(targetUser : Principal, newRole : Types.Role) : async {
    #ok;
    #err : Text;
  } {
    if (msg.caller != OWNER_ID) {
      return #err("must be admin.");
    };

    switch (users.get(targetUser)) {
      case (?u) {
        let updatedUser = {
          id = u.id;
          alias = u.alias;
          role = newRole;
          createdAt = u.createdAt;
          credibilityScore = u.credibilityScore;
          isBanned = u.isBanned;
          threads = u.threads;
          comments = u.comments;
          likedThreads = u.likedThreads;
          dislikedThreads = u.dislikedThreads;
          dislikedComments = u.dislikedComments;
          likedComments = u.likedComments;

        };
        users.put(targetUser, updatedUser);
        return #ok;
      };
      case (null) {
        return #err("User not found. They must register first.");
      };
    };
  };

  // login or register (called by authContext in frontend)
  public shared (msg) func login() : async { #ok : Types.User; #err : Text } {
    return getUserAndCheckBan(msg.caller);
  };

  // internal function to get user or register if not existing, and check if banned
  func getUserAndCheckBan(p : Principal) : Result.Result<Types.User, Text> {

    var user : Types.User = {
      id = p;
      alias = "";
      role = #User;
      credibilityScore = 0;
      isBanned = false;
      createdAt = 0;
      threads = [];
      comments = [];
      likedThreads = [];
      dislikedThreads = [];
      dislikedComments = [];
      likedComments = [];
    };

    switch (users.get(p)) {
      case (?u) {
        user := u;
      };
      case (null) {
        let isOwner = (p == OWNER_ID);
        let newUser : Types.User = {
          id = p;
          alias = Principal.toText(p);
          role = if (isOwner) #Admin else #User;
          credibilityScore = 10;
          isBanned = false;
          createdAt = Time.now();
          threads = [];
          comments = [];
          likedThreads = [];
          dislikedThreads = [];
          dislikedComments = [];
          likedComments = [];
        };
        users.put(p, newUser);
        user := newUser;
      };
    };
    if (user.isBanned) {
      return #err("U GOT BANNED, SKILL ISSUE.");
    };

    return #ok(user);
  };

  // getLikedThreads
  public shared (msg) func getLikedThreads(
    userId : Principal
  ) : async { #ok : [ThreadId]; #err : Int } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };
    let res = await UserLogic.getLikedThreads(users, userId);
    return #ok(res);
  };

  // getDislikedThreads
  public shared (msg) func getDislikedThreads(
    userId : Principal
  ) : async { #ok : [ThreadId]; #err : Int } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };
    let res = await UserLogic.getDislikedThreads(users, userId);
    return #ok(res);
  };

  public shared (msg) func getUserComments(
    userId : Principal
  ) : async { #ok : [CommentId]; #err : Int } {
    let caller = msg.caller;
    if (not Utils.isValidUser(caller, users)) {
      return #err(401);
    };
    let res = await UserLogic.getUserComments(users, userId);
    return #ok(res);
  };

  // ----------- Demo Call ---------------
  public shared func createDemo() : async {#status : Int} {
    isScoreIndexSorted := false;
    await Demo.seedAllDemoData(users, threadsStore, commentsStore, scoreIndexHash, tagIndex);

  };

};
