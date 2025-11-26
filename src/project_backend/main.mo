import Time "mo:base/Time";
import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Array  "mo:base/Array";

persistent actor {
  var documents : [Document] = [];

  type DocId = Text;

type DocumentInput = {
  title : Text;
  abstract : Text;
  body : Text;
  tags : [Text];
};

type Document = {
  id : DocId;
  title : Text;
  abstract : Text;
  body : Text;
  tags : [Text];
  publishedAt : Time.Time;
};

 func newId() : async DocId {
  let rand : Blob = await Random.blob();
  let hex : [Text] = [
    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "a", "b", "c", "d", "e", "f"
  ];

  var out = "";
  var count : Nat = 0;
  label iter for (byte in rand.vals()) {
    if (count >= 16) { break iter };
    let n  = Nat8.toNat(byte);
    let hi = n / 16;
    let lo = n % 16;
    out #= hex[hi] # hex[lo];
    count += 1;
  };
  out
};

  public func addDocument(input : DocumentInput) : async DocId {
    let id = await newId();

    let doc : Document = {
      id = id;
      title = input.title;
      abstract = input.abstract;
      body = input.body;
      tags = input.tags;
      publishedAt = Time.now();
    };

    documents := Array.append(documents, [doc]);
    id
  };

  public query func getDocuments() : async [Document] {
    documents
  };
}


