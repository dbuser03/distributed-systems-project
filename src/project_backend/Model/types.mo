import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {
  public type ThreadId = Text;
  public type CommentId = Text;

  public type BlobRef = {
  offset : Nat64;
  length : Nat64;
};

  public type ThreadInput = {
    title : Text;
    abstract : Text;
    body : Text;
    tags : [Text];
    file : ?[Blob];
    fileType : ?[Text]; // "image/png", "application/pdf",
  };

  public type CommentInput = {
    threadId : ThreadId;
    body : Text;
  };

  public type Thread = {
    id : ThreadId;
    author : Principal;
    title : Text;
    abstract : Text;
    body : Text;
    tags : [Text];
    file : ?[BlobRef];
    fileType : ?[Text];
    comments : ?[CommentId];
    likes : Nat;
    dislikes : Nat;
    createdAt : Time.Time;
  };

  public type CommentedThread = {
    id : ThreadId;
    author : Principal;
    title : Text;
    abstract : Text;
    body : Text;
    tags : [Text];
    file : ?[BlobRef];
    fileType : ?[Text];
    comments : ?[Comment];
    likes : Nat;
    dislikes : Nat;
    createdAt : Time.Time;
  };

  public type Comment = {
    id : CommentId;
    threadId : ThreadId;
    author : Principal;
    body : Text;
    likes : Nat;
    dislikes : Nat;
    createdAt : Time.Time;
  };

  public type FeedbackInput = {
    author : Principal;
    voteType : Text;
  };
};
