import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Utils "Utils/utils";
import Types "Model/types";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

persistent actor DocumentStore {

  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;

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

  public shared (msg) func createDocument(input : ThreadInput) : async ThreadId {
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
      createdAt = Time.now();
      comments = null;
    };

    threadsStore.put(id, doc);
    id;
  };

  public shared (msg) func createComment(input : CommentInput) : async CommentId {
    let id = await Utils.newId();

    let comm : Comment = {
      id = id;
      threadId = input.threadId;
      author = msg.caller;
      body = input.body;
      createdAt = Time.now();
    };

    commentsStore.put(id, comm);

    switch (threadsStore.get(input.threadId)) {
    case (null) {
    };
    case (?thread) {
      let updatedComments =
        switch (thread.comments) {
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
        createdAt = thread.createdAt;
        comments = ?updatedComments;
      };

      threadsStore.put(thread.id, updatedThread);
    };
  };

    id;
  };

  public query func getThreads() : async [Thread] {
    Iter.toArray(threadsStore.vals());
  };

  public query func getThread(id : ThreadId) : async ?Thread {
    threadsStore.get(id);
  };
};
