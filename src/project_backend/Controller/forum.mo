import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Types "../Model/types";
import DocumentStore "../Services/document_store";
import ReverseIndexes "../Services/reverse_indexes";
import Region "mo:base/Region";
import ReferenceData "../Model/reference_data";

// This will act as a central hub: receives the requests from the user (add post, like, unlike, etc.) calls the relative methods in documentStore, and keeps a reverse index (cache) of the threads by likes and tags to make the front page navigable.
persistent actor Forum {

  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type HydratedThread = Types.HydratedThread;
  public type FeedbackInput = Types.FeedbackInput;

  transient var threadsStore = HashMap.HashMap<ThreadId, Thread>(10, Text.equal, Text.hash);
  // start for the storage of blobs
  var fileRegion : Region.Region = Region.new();
  var base : Nat64 = 0;

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
    #err : Text;
  } {
    let caller = msg.caller;
    var lastStoredBatchSize : Nat64 = 0;
    switch (DocumentStore.ensureCapacity(fileRegion, input.file, base)) {
      case (#ok totalLen) {
        lastStoredBatchSize := totalLen;
      };
      case (#err _) {
        return #err("Error while saving linked documents");
      };
    };
    let id = await DocumentStore.createThread(threadsStore, caller, input, fileRegion, base);
    ReverseIndexes.indexThreadTags(tagIndex, input.tags, id);
    ReverseIndexes.indexThreadByScore(scoreIndexHash, id);
    #id(id);
  };

  public shared (msg) func createComment(input : CommentInput) : async {
    #ok : CommentId;
    #err : Int;
  } {
    await DocumentStore.createComment(threadsStore, commentsStore, msg.caller, input);
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
    DocumentStore.getThreads(threadsStore, ids);
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
    input : FeedbackInput,
    threadId : ThreadId,
  ) : async { #status : Int } {
    let caller = msg.caller;
    let res = await DocumentStore.addFeedbackThread(threadsStore, caller, input, threadId);
    switch (res) {
      case (#status(code)) {
        #status(code);
      };
      case (#newScore(val)) {
        ReverseIndexes.updateScoreOfThread(scoreIndexHash, val, threadId);
        isScoreIndexSorted := false;
        #status(200);
      };
    };
  };

  public shared (msg) func addFeedbackComment(
    input : FeedbackInput,
    commentId : CommentId,
  ) : async { #status : Int } {
    let caller = msg.caller;
    await DocumentStore.addFeedbackComment(commentsStore, caller, input, commentId);
  };

  public shared func getThreadsByTags(tags : [Text]) : async [Thread] {
    await ReverseIndexes.getThreadsByTags(threadsStore, tagIndex, tags);
  };

  public func getThreadsByScore(
    startIdx : Int,
    endIdx : Int,
  ) : async [Thread] {
    if (not isScoreIndexSorted) {
      scoreIndexOrdered := ReverseIndexes.orderScoreIndex(scoreIndexHash);
      isScoreIndexSorted := true;
    };

    ReverseIndexes.sliceByScore(
      threadsStore,
      scoreIndexOrdered,
      startIdx,
      endIdx,
    );
  };

  public query (message) func whoami() : async Principal {
    message.caller;
  };

  public shared (msg) func deleteThread(
    id : ThreadId
  ) : async (status : Int) {
    switch (threadsStore.get(id)) {
      case (null) {
        return 404;
      };
      case (?thread) {
        if (thread.author != msg.caller) {
          return 401;
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
        return 204;
      };
    };
  };

  public shared (msg) func deleteComment(commentId : CommentId) : async (status : Int) {
    await DocumentStore.deleteComment(threadsStore, commentsStore, msg.caller, commentId);
  };

  public query func getISICSections() : async [(Text, Text)] {
    Iter.toArray(isicMap.entries());
  };

  public query func getCountries() : async [(Text, Text)] {
    Iter.toArray(countryMap.entries());
  };
};
