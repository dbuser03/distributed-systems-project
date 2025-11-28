import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";

module {
    public func newId() : async Text {
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
}