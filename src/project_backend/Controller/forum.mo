import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Utils "../Utils/utils";
import Types "../Model/types";
import DocumentStore "../Services/document_store";
import ReverseIndexes "../Services/reverse_indexes";

// This will act as a central hub: receives the requests from the user (add post, like, unlike, etc.) calls the relative methods in documentStore, and keeps a reverse index (cache) of the threads by likes and tags to make the front page navigable.
persistent actor Forum {

  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type CommentedThread = Types.CommentedThread;
  public type FeedbackInput = Types.FeedbackInput;

  transient var threadsStore = HashMap.HashMap<ThreadId, Thread>(10, Text.equal, Text.hash);
  // start for the storage of blobs
  stable var base : Nat64 = 0;
  transient var commentsStore = HashMap.HashMap<CommentId, Comment>(10, Text.equal, Text.hash);

  transient var tagIndex = HashMap.HashMap<Text, [ThreadId]>(
    20,
    Text.equal,
    Text.hash,
  );

  var scoreIndexOrdered : [(Int, ThreadId)] = [];
  transient var scoreIndexHash = HashMap.HashMap<ThreadId, Int>(10, Text.equal, Text.hash);
  var isScoreIndexSorted : Bool = false;

  public shared func createThread(caller : Principal, input : ThreadInput) : async { #id : ThreadId; #err : Text;} {
    var lastStoredBatchSize : Nat64 = 0;
    switch (ensureCapacity(files)) {
      case (#ok totalLen) {
        lastStoredBatchSize := totalLen;
      };
      case (#err msg) {
        #err("Error while saving linked documents");
      };
    };
    let id = await DocumentStore.createThread(threadsStore, caller, input);
    ReverseIndexes.indexThreadTags(tagIndex, input.tags, id);
    ReverseIndexes.indexThreadByScore(scoreIndexHash, id);
    #id(id);
  };

  public shared func createComment(caller : Principal, input : CommentInput) : async {
    #ok : CommentId;
    #err : Int;
  } {
    await DocumentStore.createComment(threadsStore, commentsStore, caller, input);
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

  public shared func getCommentedThread(
    id : ThreadId
  ) : async { #ok : CommentedThread; #err : Int } {
    await DocumentStore.getCommentedThread(threadsStore, commentsStore, id);
  };

  public shared func getComments(ids : [CommentId]) : async [Comment] {
    await DocumentStore.getComments(commentsStore, ids);
  };

  public shared func addFeedbackThread(
    input : FeedbackInput,
    threadId : ThreadId,
  ) : async { #status : Int } {
    let res = await DocumentStore.addFeedbackThread(threadsStore, input, threadId);
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

  public shared func addFeedbackComment(
    input : FeedbackInput,
    commentId : CommentId,
  ) : async { #status : Int } {
    await DocumentStore.addFeedbackComment(commentsStore, input, commentId);
  };

  public shared func getThreadsByTag(tag : Text) : async [Thread] {
    await ReverseIndexes.getThreadsByTag(threadsStore, tagIndex, tag);
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
  }

};
