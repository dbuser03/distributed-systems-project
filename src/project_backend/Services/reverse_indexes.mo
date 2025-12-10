import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Types "../Model/types";
import Order "mo:base/Order";
import Int "mo:base/Int";
import DocumentStore "../Services/document_store";

module {
  public type ThreadId = Types.ThreadId;
  public type CommentId = Types.CommentId;
  public type Thread = Types.Thread;
  public type ThreadInput = Types.ThreadInput;
  public type Comment = Types.Comment;
  public type CommentInput = Types.CommentInput;
  public type HydratedThread = Types.HydratedThread;

  // This does not return the hydrated comments as it is intended to be used when retrieving the list of results that then can be clicked and opened.
  public func getThreadsByTags(
  threadsStore : HashMap.HashMap<ThreadId, Thread>,
  tagIndex : HashMap.HashMap<Text, [ThreadId]>,
  tags : [Text],
) : async [Thread] {

  let seen = HashMap.HashMap<ThreadId, ()>(10, Text.equal, Text.hash);
  for (tag in tags.vals()) {
    switch (tagIndex.get(tag)) {
      case (null) {};
      case (?ids) {
        for (tid in ids.vals()) {
          seen.put(tid, ());
        };
      };
    };
  };

  var collected : [ThreadId] = [];
  for ((tid, _) in seen.entries()) {
    collected := Array.append(collected, [tid]);
  };
  return await DocumentStore.getThreads(threadsStore, collected);
};

  public func indexThreadTags(
    tagIndex : HashMap.HashMap<Text, [ThreadId]>,
    tags : [Text],
    id : ThreadId,
  ) {
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

  public func orderScoreIndex(
    scoreIndexHash : HashMap.HashMap<ThreadId, Int>
  ) : async [(Int, ThreadId)] {
    var tmp : [(Int, ThreadId)] = [];
    for ((id, score) in scoreIndexHash.entries()) {
      tmp := Array.append(tmp, [(score, id)]);
    };

    let sorted = Array.sort<(Int, ThreadId)>(
      tmp,
      func(a : (Int, ThreadId), b : (Int, ThreadId)) : Order.Order {
        let (sa, _) = a;
        let (sb, _) = b;

        if (sa > sb) {
          #less;
        } else if (sa < sb) {
          #greater;
        } else {
          #equal;
        };
      },
    );

    sorted;
  };

  public func sliceByScore(
    threadsStore : HashMap.HashMap<ThreadId, Thread>,
    ordered : [(Int, ThreadId)],
    startIdx : Int,
    endIdx : Int,
  ) : async [Thread] {
    let n = ordered.size();
    let from = if (startIdx < 0) 0 else startIdx;
    let to = if (endIdx >= n) n - 1 else endIdx;

    if (from > to) {
      return [];
    };

    var idxList : [ThreadId] = [];
    var i = from;
    while (i <= to) {
      // seemingly the only way to cast from Int to Nat, and Int is not supported for indexes (!?!?)
      let (_, tid) = ordered[Int.abs(i)];
      idxList := Array.append(idxList, [tid]);
      i += 1;
    };

    await DocumentStore.getThreads(threadsStore, idxList);
  };

  public func indexThreadByScore(
    scoreIndexHash : HashMap.HashMap<ThreadId, Int>,
    id : ThreadId,
  ) {
    scoreIndexHash.put(id, 0);
  };

public func updateScoreOfThread(
  scoreIndexHash : HashMap.HashMap<ThreadId, Int>,
  newScore : Int,
  id : ThreadId,
) {
  scoreIndexHash.put(id, newScore);
};

};
