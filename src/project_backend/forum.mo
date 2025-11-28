import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Utils "Utils/utils";
import DocumentStore "canister:document_store";

persistent actor Forum {
  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;

  // This will act as a central hub: receives the requests from the user (add post, like, unlike, etc.) calls the relative methods in documentStore, and keeps a reverse index (cache) of the threads by likes and tags to make the front page navigable.
}