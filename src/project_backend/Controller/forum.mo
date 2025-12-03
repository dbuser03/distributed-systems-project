import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Order "mo:base/Order";
import Utils "../Utils/utils";
import Types "../Model/types";
import DocumentStore "../Services/document_store";

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
  transient var commentsStore = HashMap.HashMap<CommentId, Comment>(10, Text.equal, Text.hash);

  transient var tagIndex = HashMap.HashMap<Text, [ThreadId]>(
    20,
    Text.equal,
    Text.hash,
  );

  var scoreIndexOrdered : [(Int, ThreadId)] = [];
  transient var scoreIndexHash = HashMap.HashMap<ThreadId, Int>(10, Text.equal, Text.hash);
  var scoreIndexSorted : Bool = false;

  public shared func createThread(caller : Principal, input : ThreadInput) : async ThreadId {
    let id = await DocumentStore.createThread(threadsStore, caller, input);
    indexThreadTags(input.tags, id);
    id;
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
    await DocumentStore.addFeedbackThread(threadsStore, input, threadId);
  };

  public shared func addFeedbackComment(
    input : FeedbackInput,
    commentId : CommentId,
  ) : async { #status : Int } {
    await DocumentStore.addFeedbackComment(commentsStore, input, commentId);
  };

  // This does not return the hydrated comments as it is intended to be used when retrieving the list of results that then can be clicked and opened.
  public shared func getThreadsByTag(tag : Text) : async [Thread] {
    switch (tagIndex.get(tag)) {
      case (null) {
        return [];
      };

      case (?ids) {
        var result : [Thread] = [];

        for (tid in ids.vals()) {
          let res = await DocumentStore.getThread(threadsStore, tid);

          switch (res) {
            case (#ok(val)) {
              result := Array.append<Thread>(result, [val]);
            };
            case (#err(_)) {};
          };
        };

        return result;
      };
    };
  };

  func indexThreadTags(tags : [Text], id : ThreadId) {
    for (tag in tags.vals()) {
      switch (tagIndex.get(tag)) {
        case (null) {
          tagIndex.put(tag, [id]);
        };
        case (?ids) {
          let updated = Array.append<ThreadId>(ids, [id]);
          tagIndex.put(tag, updated);
        };
      };
    };
  };

  public query (message) func whoami() : async Principal {
    message.caller;
  };
  
};
