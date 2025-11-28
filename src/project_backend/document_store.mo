import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Utils "Utils/utils";
import Types "Model/types";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Bool "mo:base/Bool";

persistent actor DocumentStore {

  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type CommentedThread = Types.CommentedThread;
  public type FeedbackInput = Types.FeedbackInput;

  // this is for persistent storage (i.e. data persists between code modifications), if needed
  var docsStore : [(ThreadId, Thread)] = [];
  transient var threadsStore = HashMap.HashMap<ThreadId, Thread>(10, Text.equal, Text.hash);
  transient var commentsStore = HashMap.HashMap<CommentId, Comment>(10, Text.equal, Text.hash);

  // // Rebuild HashMap after upgrade from stable data
  // system func postupgrade() {
  //   documents := HashMap.HashMap<DocId, Thread>(docsStore.size(), Text.equal, Text.hash);
  //   for ((id, doc) in docsStore.vals()) {
  //     documents.put(id, doc);
  //   };
  // };

  // // Before upgrade, dump HashMap into stable array
  // system func preupgrade() {
  //   docsStore := Iter.toArray(documents.entries());
  // };

  public shared (msg) func createThread(input : ThreadInput) : async ThreadId {
    let id = await Utils.newId();

    let doc : Thread = {
      id = id;
      author = msg.caller;
      title = input.title;
      abstract = input.abstract;
      body = input.body;
      tags = input.tags;
      file = input.file;
      fileType = input.fileType;
      comments = null;
      likes = 0;
      dislikes = 0;
      createdAt = Time.now();
    };

    threadsStore.put(id, doc);
    id;
  };

  public shared (msg) func createComment(input : CommentInput) : async {
    #ok : CommentId;
    #err : Int;
  } {

    switch (threadsStore.get(input.threadId)) {
      case (null) {
        return #err(404);
      };
      case (?thread) {};
    };

    let id = await Utils.newId();

    let comm : Comment = {
      id = id;
      threadId = input.threadId;
      author = msg.caller;
      body = input.body;
      likes = 0;
      dislikes = 0;
      createdAt = Time.now();
    };

    commentsStore.put(id, comm);

    switch (threadsStore.get(input.threadId)) {
      case (null) {
        return #err(404);
      };
      case (?thread) {
        let updatedComments = switch (thread.comments) {
          case (null) { [id] };
          case (?list) { Array.append<Text>(list, [id]) };
        };

        let updatedThread : Thread = {
          id = thread.id;
          author = thread.author;
          title = thread.title;
          abstract = thread.abstract;
          body = thread.body;
          tags = thread.tags;
          file = thread.file;
          fileType = thread.fileType;
          comments = ?updatedComments;
          likes = thread.likes;
          dislikes = thread.dislikes;
          createdAt = thread.createdAt;
        };

        threadsStore.put(thread.id, updatedThread);
      };
    };

    return #ok(id);
  };

  public shared func getComments(ids : [CommentId]) : async [Comment] {
    var result : [Comment] = [];

    for (cid in ids.vals()) {
      switch (commentsStore.get(cid)) {
        case (null) {};
        case (?comm) {
          result := Array.append<Comment>(result, [comm]);
        };
      };
    };

    result;
  };

  public shared func getThread(
    id : ThreadId
  ) : async { #ok : Thread; #err : Int } {

    let res = threadsStore.get(id);

    switch (res) {
      case (null) {
        return #err(404);
      };
      case (?thread) {
        return #ok(thread);
      };
    };
  };

  public shared func getCommentedThread(
    id : ThreadId
  ) : async { #ok : CommentedThread; #err : Int } {

    let res = threadsStore.get(id);

    switch (res) {
      case (null) {
        return #err(404);
      };
      case (?baseThread) {
        let hydrated : CommentedThread = switch (baseThread.comments) {
          case (null) {
            {
              id = baseThread.id;
              author = baseThread.author;
              title = baseThread.title;
              abstract = baseThread.abstract;
              body = baseThread.body;
              tags = baseThread.tags;
              file = baseThread.file;
              fileType = baseThread.fileType;
              comments = null;
              likes = baseThread.likes;
              dislikes = baseThread.dislikes;
              createdAt = baseThread.createdAt;
            };
          };

          case (?commentIds) {
            let comments = await getComments(commentIds);
            {
              id = baseThread.id;
              author = baseThread.author;
              title = baseThread.title;
              abstract = baseThread.abstract;
              body = baseThread.body;
              tags = baseThread.tags;
              file = baseThread.file;
              fileType = baseThread.fileType;
              comments = ?comments;
              likes = baseThread.likes;
              dislikes = baseThread.dislikes;
              createdAt = baseThread.createdAt;
            };
          };
        };
        return #ok(hydrated);
      };
    };
  };

  public shared func addFeedbackThread(input : FeedbackInput, threadId : ThreadId) : async {
    #status : Int;
  } {
    switch (threadsStore.get(threadId)) {
      case (null) {
        return #status(404);
      };
      case (?thread) {
        let alreadyLiked : Bool = false;
        let alreadyDisliked : Bool = false;
        // do call to userStore with the author ID and retrieve it they already liked or disliked the thread

        let result = Utils.applyVote(
          input.voteType,
          thread.likes,
          thread.dislikes,
          alreadyLiked,
          alreadyDisliked,
        );

        if (result.status != 200) {
          return #status(result.status);
        };

        let updatedThread : Thread = {
          id = thread.id;
          author = thread.author;
          title = thread.title;
          abstract = thread.abstract;
          body = thread.body;
          tags = thread.tags;
          file = thread.file;
          fileType = thread.fileType;
          comments = thread.comments;
          likes = result.likes;
          dislikes = result.dislikes;
          createdAt = thread.createdAt;
        };
        threadsStore.put(thread.id, updatedThread);
        return #status(200);
      };
    };
  };

  public shared func addFeedbackComment(input : FeedbackInput, commentId : CommentId) : async {
    #status : Int;
  } {
    switch (commentsStore.get(commentId)) {
      case (null) {
        return #status(404);
      };
      case (?comment) {
        let alreadyLiked : Bool = false;
        let alreadyDisliked : Bool = false;
        // do call to userStore with the author ID and retrieve it they already liked or disliked the thread

        let result = Utils.applyVote(
          input.voteType,
          comment.likes,
          comment.dislikes,
          alreadyLiked,
          alreadyDisliked,
        );

        if (result.status != 200) {
          return #status(result.status);
        };

        let updatedComment : Comment = {
          id = comment.id;
          threadId = comment.threadId;
          author = comment.author;
          body = comment.body;
          likes = result.likes;
          dislikes = result.dislikes;
          createdAt = comment.createdAt;
        };
        commentsStore.put(comment.id, updatedComment);
        return #status(200);
      };
    };
  };
};
