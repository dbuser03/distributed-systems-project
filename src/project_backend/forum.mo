import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Utils "Utils/utils";
import Types "Model/types";
import DocumentStore "canister:document_store";

// This will act as a central hub: receives the requests from the user (add post, like, unlike, etc.) calls the relative methods in documentStore, and keeps a reverse index (cache) of the threads by likes and tags to make the front page navigable.
persistent actor Forum {

  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type CommentedThread = Types.CommentedThread;

  /// Reverse index on tags (fixed-size list of 1-char Text tags)
  /// tag -> list of thread ids that have that tag
  var tagIndexStore : [(Text, [ThreadId])] = [];
  transient var tagIndex = HashMap.HashMap<Text, [ThreadId]>(
    20,
    Text.equal,
    Text.hash,
  );

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

  public shared func createThread(input : ThreadInput) : async ThreadId {
    let id = await DocumentStore.createThread(input);
    indexThreadTags(input.tags, id);
    id;
  };

  public shared func createComment(input : CommentInput) : async { #ok : CommentId; #err : Int } {
    await DocumentStore.createComment(input);
  };

  // single thread with only references to comments
  public shared func getThread(
    id : ThreadId
  ) : async { #ok : Thread; #err : Int } {
    await DocumentStore.getThread(id);
  };

  public shared func getCommentedThread(
    id : ThreadId
  ) : async { #ok : CommentedThread; #err : Int } {
    await DocumentStore.getCommentedThread(id);
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
          let res = await DocumentStore.getThread(tid);

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
};
