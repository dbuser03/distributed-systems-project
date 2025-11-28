import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {
  public type ThreadId = Text;
  public type CommentId = Text;

  public type ThreadInput = {
    title : Text;
    abstract : Text;
    body : Text;
    tags : [Text];
    file : ?Blob;
    fileType : ?Text; // "image/png", "application/pdf",
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
    file : ?Blob;
    fileType : ?Text;
    comments : ?[Text];
    createdAt : Time.Time;
  };

  public type Comment = {
    id : CommentId;
    threadId : ThreadId;
    author : Principal;
    body : Text;
    createdAt : Time.Time;
  };
}
