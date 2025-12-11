import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {
  public type ThreadId = Text;
  public type CommentId = Text;

  public type BlobRef = {
  offset : Nat64;
  length : Nat64;
  };

  public type Role = {
    #User;
    #Verifier;
    #Admin;
  };

  public type User = {
    id : Principal;
    alias : Text;
    role : Role;
    credibilityScore : Int;
    isBanned : Bool;
    createdAt : Time.Time;
    threads: [ThreadId]; // New field to store the user’s created threads
    comments: [CommentId]; // New field to store the user’s created comments
    likedThreads: [ThreadId]; // New field to store the threads the user liked
    dislikedThreads: [ThreadId]; // New field to store the threads the user disliked
    likedComments: [CommentId];
    dislikedComments: [CommentId];
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
    isValidated : Bool;
  };

  public type HydratedThread = {
    id : ThreadId;
    author : Principal;
    title : Text;
    abstract : Text;
    body : Text;
    tags : [Text];
    file : ?[Blob];
    fileType : ?[Text];
    comments : ?[Comment];
    likes : Nat;
    dislikes : Nat;
    createdAt : Time.Time;
    isValidated : Bool;
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

  public type VoteType = {
    #like;
    #dislike;
    #none
  };
};
