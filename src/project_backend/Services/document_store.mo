import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Utils "../Utils/utils";
import Types "../Model/types";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Order "mo:base/Order";
import StableMemory "mo:base/ExperimentalStableMemory";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";


module {
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type CommentedThread = Types.CommentedThread;
  public type FeedbackInput = Types.FeedbackInput;
  public type BlobRef = Types.BlobRef;

  public func createThread(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    caller : Principal,
    input : ThreadInput,
    base : Nat64,
  ) : async ThreadId {
    let id = await Utils.newId();
     let fileRefs : ?[BlobRef] = storeFiles(input.file, base);

    let doc : Thread = {
      id = id;
      author = caller;
      title = input.title;
      abstract = input.abstract;
      body = input.body;
      tags = input.tags;
      file = fileRefs;
      fileType = input.fileType;
      comments = null;
      likes = 0;
      dislikes = 0;
      createdAt = Time.now();
    };

    threadsStore.put(id, doc);
    id;
  };

  public func createComment(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    commentsStore : HashMap.HashMap<CommentId, Comment>,
    caller : Principal,
    input : CommentInput,
  ) : async { #ok : CommentId; #err : Int } {
    switch (threadsStore.get(input.threadId)) {
      case (null) {
        return #err(404);
      };
      case (?_) {};
    };

    let id = await Utils.newId();

    let comm : Comment = {
      id = id;
      threadId = input.threadId;
      author = caller;
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

    #ok(id);
  };

  public func getComments(
    commentsStore : HashMap.HashMap<CommentId, Comment>,
    ids : [CommentId],
  ) : async [Comment] {
    var result : [Comment] = [];

    for (cid in ids.vals()) {
      switch (commentsStore.get(cid)) {
        case (null) {};
        case (?comm) {
          result := Array.append<Comment>(result, [comm]);
        };
      };
    };

    let sorted = Array.sort<Comment>(
    result,
    func (a : Comment, b : Comment) : Order.Order {
      let sa = a.likes - a.dislikes;
      let sb = b.likes - b.dislikes;

      if (sa > sb) {
        #less;
      } else if (sa < sb) {
        #greater;
      } else {
        #equal;
      };
    }
  );

  sorted;
  };

  public func getThread(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    id : ThreadId,
  ) : async { #ok : Thread; #err : Int } {
    let res = threadsStore.get(id);

    switch (res) {
      case (null) {
        #err(404);
      };
      case (?thread) {
        #ok(thread);
      };
    };
  };

  public func getThreads(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    ids : [ThreadId],
  ) : [Thread] {
    var result : [Thread] = [];
    for (id in ids.vals()) {
      let res = threadsStore.get(id);
      switch (res) {
        case (null) {};
        case (?thread) {
          result := Array.append(result, [thread]);
        };
      };
    };
    return result;
  };

  public func getCommentedThread(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    commentsStore : HashMap.HashMap<CommentId, Comment>,
    id : ThreadId,
  ) : async { #ok : CommentedThread; #err : Int } {
    let res = threadsStore.get(id);

    switch (res) {
      case (null) {
        #err(404);
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
            let comments = await getComments(commentsStore, commentIds);
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
        #ok(hydrated);
      };
    };
  };

  public func addFeedbackThread(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    input : FeedbackInput,
    threadId : ThreadId,
  ) : async { #status : Int; #newScore : Int } {
    switch (threadsStore.get(threadId)) {
      case (null) {
        #status(404);
      };
      case (?thread) {
        let alreadyLiked : Bool = false;
        let alreadyDisliked : Bool = false;

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
        #newScore(result.likes - result.dislikes);
      };
    };
  };

  public func addFeedbackComment(
    commentsStore : HashMap.HashMap<CommentId, Comment>,
    input : FeedbackInput,
    commentId : CommentId,
  ) : async { #status : Int } {
    switch (commentsStore.get(commentId)) {
      case (null) {
        #status(404);
      };
      case (?comment) {
        let alreadyLiked : Bool = false;
        let alreadyDisliked : Bool = false;

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
        #status(200);
      };
    };
  };

  public func ensureCapacity(files : ?[Blob], base: Nat64) : { #ok : Nat64; #err : Text;} {
    switch (files) {
      case (null) {
        #ok(0);
      };
      case (?fs) {
        let n = fs.size();
        if (n == 0) {
          return #ok(0);
        };
        var total : Nat64 = 0;
        for (b in fs.vals()) {
          let len : Nat64 = Nat64.fromNat(b.size());
          if (total + len < total) {
            return #err("Total size overflow");
          };

          total += len;
        };
        let requiredEnd : Nat64 = base + total;
        if (requiredEnd < base) {
          return #err("Offset overflow");
        };
        let pageSize : Nat64 = 65536;
        let neededPages : Nat64 = (requiredEnd + pageSize - 1) / pageSize;
        let currentPages : Nat64 = StableMemory.size();
        if (neededPages <= currentPages) {
          #ok(total);
        } else {
          let delta : Nat64 = neededPages - currentPages;
          let old = StableMemory.grow(delta);
          if (old == 0xFFFF_FFFF_FFFF_FFFF) {
            #err("Stable memory grow failed");
          } else {
            #ok(total);
          };
        };
      };
    };
  };

  public func storeFiles(files : ?[Blob], base: Nat64) : ?[BlobRef] {
    switch (files) {
      case (null) {
        null;
      };
      case (?fs) {
        let n : Nat = fs.size();
        if (n == 0) {
          return ?[];
        };
        let refs = Array.tabulate<BlobRef>(
          n,
          func(i : Nat) : BlobRef {
            let b : Blob = fs[i];
            let len : Nat64 = Nat64.fromNat(b.size());
            let start : Nat64 = base;
            StableMemory.storeBlob(start, b);
            {
              offset = start;
              length = len;
            };
          },
        );

        ?refs;
      };
    };
  };
};
