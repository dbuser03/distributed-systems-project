import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Types "../Model/types";

module {
  public type VoteType = Types.VoteType;
  public func newId() : async Text {
    let rand : Blob = await Random.blob();
    let hex : [Text] = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];

    var out = "";
    var count : Nat = 0;
    label iter for (byte in rand.vals()) {
      if (count >= 16) { break iter };
      let n = Nat8.toNat(byte);
      let hi = n / 16;
      let lo = n % 16;
      out #= hex[hi] # hex[lo];
      count += 1;
    };
    out;
  };

  public func applyVote(
    voteType : VoteType,
    likes : Nat,
    dislikes : Nat,
    alreadyLiked : Bool,
    alreadyDisliked : Bool,
  ) : { likes : Nat; dislikes : Nat; status : Int } {

    var newLikes = likes;
    var newDislikes = dislikes;

    switch (voteType) {
      case (#like) {
        if (alreadyLiked) {
          if (newLikes > 0) { newLikes -= 1 };
        } else {
          newLikes += 1;
          if (alreadyDisliked and newDislikes > 0) {
            newDislikes -= 1;
          };
        };
      };
      case (#dislike) {
        if (alreadyDisliked) {
          if (newDislikes > 0) { newDislikes -= 1 };
        } else {
          newDislikes += 1;
          if (alreadyLiked and newLikes > 0) {
            newLikes -= 1;
          };
        };
      };
      case (#none) {
        return { likes = likes; dislikes = dislikes; status = 400 };
      };
    };

    { likes = newLikes; dislikes = newDislikes; status = 200 };
  };

  public func validateTags(
    tags : [Text],
    isicMap : HashMap.HashMap<Text, Text>,
    countryMap : HashMap.HashMap<Text, Text>,
  ) : Bool {

    for (tag in tags.vals()) {

      let inIsic = switch (isicMap.get(tag)) {
        case (null) false;
        case (_) true;
      };

      if (not inIsic) {
        let inCountry = switch (countryMap.get(tag)) {
          case (null) false;
          case (_) true;
        };

        if (not inCountry) {
          return false;
        };
      };
    };

    true;
  };

  public func isValidUser(
    id : Principal,
    users : HashMap.HashMap<Principal, Types.User>,
  ) : Bool {
    switch (users.get(id)) {
      case (?u) { not u.isBanned };
      case (null) { false };
    };
  };

  public func textToVoteType(t : Text) : VoteType {
    switch (t) {
      case ("up") { #like };
      case ("down") { #dislike };
      case ("null") { #none };
      case (_) { #none };
    };
  };
};
