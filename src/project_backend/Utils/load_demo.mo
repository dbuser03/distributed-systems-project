import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Utils "../Utils/utils";
import Types "../Model/types";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import DummyData "dummy_data";
import DocumentStore "../Services/document_store";
import ReverseIndexes "../Services/reverse_indexes";

module {
    public type Thread = Types.Thread;
    public type ThreadInput = Types.ThreadInput;
    public type Comment = Types.Comment;
    public type CommentInput = Types.CommentInput;
    public type ThreadId = Types.ThreadId;
    public type CommentId = Types.CommentId;
    public type HydratedThread = Types.HydratedThread;
    public type BlobRef = Types.BlobRef;
    public type User = Types.User;

    func newDummyPrincipal() : Principal {
        Principal.fromText("aaaaa-aa");
    };

    public func seedDemoData(
        users : HashMap.HashMap<Principal, Types.User>
    ) : async { #ok : Principal; #err : Text } {

        let dummyPrincipal = newDummyPrincipal();

        switch (users.get(dummyPrincipal)) {
            case (?_) {
                return #ok(dummyPrincipal);
            };
            case null {};
        };

        let dummyUser : User = {
            id = dummyPrincipal;
            alias = "anonymous";
            role = #User;
            credibilityScore = 0;
            isBanned = false;
            createdAt = Time.now();
            threads = [];
            comments = [];
            likedThreads = [];
            dislikedThreads = [];
            dislikedComments = [];
            likedComments = [];
            allLikes = 0;
            allDislikes = 0;
        };

        users.put(dummyPrincipal, dummyUser);

        return #ok(dummyPrincipal);
    };

    public func seedAllDemoData(
        users : HashMap.HashMap<Principal, Types.User>,
        threadsStore : HashMap.HashMap<ThreadId, Thread>,
        commentsStore : HashMap.HashMap<CommentId, Comment>,
        scoreIndexHash : HashMap.HashMap<ThreadId, Int>,
        tagIndex : HashMap.HashMap<Text, [ThreadId]>,
    ) : async { #status : Int } {

        let userRes = await seedDemoData(users);

        switch (userRes) {
            case (#err msg) {
                return #status(500);
            };
            case (#ok dummyPrincipal) {
                let now = Time.now();

                for (seed in DummyData.threads.vals()) {
                    let tid : ThreadId = await Utils.newId();

                    let thread : Thread = {
                        id = tid;
                        author = dummyPrincipal;
                        title = seed.title;
                        abstract = seed.abstract;
                        body = seed.body;
                        tags = seed.tags;
                        file = null;
                        fileType = null;
                        comments = null;
                        likes = seed.likes;
                        dislikes = seed.dislikes;
                        createdAt = now;
                    };

                    threadsStore.put(tid, thread);
                    ReverseIndexes.updateScoreOfThread(scoreIndexHash, seed.likes - seed.dislikes, tid);
                    ReverseIndexes.indexThreadTags(tagIndex, seed.tags, tid);

                    for (cText in seed.comments.vals()) {
                        let input : CommentInput = {
                            threadId = tid;
                            body = cText;
                        };

                        ignore await DocumentStore.createComment(
                            threadsStore,
                            commentsStore,
                            dummyPrincipal,
                            input,
                        );
                    };
                };

                return #status(200);
            };
        };
    };
};
