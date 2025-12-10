import HashMap "mo:base/HashMap";
import Utils "../Utils/utils";
import Types "../Model/types";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Int "mo:base/Int";

module {
    public type Thread = Types.Thread;
    public type Comment = Types.Comment;
    public type ThreadId = Types.ThreadId;
    public type CommentId = Types.CommentId;
    public type User = Types.User;
    public type VoteType = Types.VoteType;

    public func updateUserCredibilityScore(
        users : HashMap.HashMap<Principal, Types.User>,
        userId : Principal,
        voteType : VoteType,
    ) : async { #status : Int } {

        switch (users.get(userId)) {

            case (null) {
                return #status(404);
            };

            case (?usr) {
                let newAllLikes = switch (voteType) {
                    case (#like) usr.allLikes + 1;
                    case (_) usr.allLikes;
                };

                let newAllDislikes = switch (voteType) {
                    case (#dislike) usr.allDislikes + 1;
                    case (_) usr.allDislikes;
                };
                var alpha = 10;
                var beta = 20;
                let num : Float = Float.fromInt(newAllLikes + alpha);

                let denom : Float = Float.fromInt(newAllLikes + newAllDislikes + alpha + beta);
                let ratio : Float = num / denom;
                let scaled : Float = ratio * 100.0;
                let newCredibility : Int = Float.toInt(Float.nearest(scaled));
                let updatedUser : Types.User = {
                    id = usr.id;
                    alias = usr.alias;
                    role = usr.role;
                    credibilityScore = newCredibility;
                    allLikes = newAllLikes;
                    allDislikes = newAllDislikes;
                    isBanned = usr.isBanned;
                    createdAt = usr.createdAt;
                    threads = usr.threads;
                    comments = usr.comments;
                    likedThreads = usr.likedThreads;
                    dislikedThreads = usr.dislikedThreads;
                    likedComments = usr.likedComments;
                    dislikedComments = usr.dislikedComments;
                };

                users.put(userId, updatedUser);

                return #status(200);
            };
        };
    };

    // Method to check if a user liked or disliked a specific post (ThreadId)
    public func hasUserLikedOrDislikedThread(users : HashMap.HashMap<Principal, Types.User>, userId : Principal, postId : ThreadId) : async VoteType {
        // Fetch the user to ensure they exist and are not banned
        if (not Utils.isValidUser(userId, users)) {
            return #none;
        };
        let userResult = users.get(userId);
        switch (userResult) {
            case (null) {
                return #none; // If user doesn't exist or is banned, return no interaction
            };
            case (?user) {
                // Check if the user liked or disliked the given thread
                if (Array.find<ThreadId>(user.likedThreads, func(x) { x == postId }) != null) {
                    return #like;
                } else if (Array.find<ThreadId>(user.dislikedThreads, func(x) { x == postId }) != null) {
                    return #dislike;
                } else {
                    return #none; // Return "no interaction" if no action was taken
                };
            };
        };
    };

    public func hasUserLikedOrDislikedComment(
        users : HashMap.HashMap<Principal, Types.User>,
        userId : Principal,
        commentId : CommentId,
    ) : async VoteType {
        if (not Utils.isValidUser(userId, users)) {
            return #none;
        };

        let userResult = users.get(userId);
        switch (userResult) {
            case (null) {
                return #none;
            };
            case (?user) {
                if (Array.find<CommentId>(user.likedComments, func(x) { x == commentId }) != null) {
                    return #like;
                } else if (Array.find<CommentId>(user.dislikedComments, func(x) { x == commentId }) != null) {
                    return #dislike;
                } else {
                    return #none;
                };
            };
        };
    };

    public func getLikedThreads(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
    ) : async [ThreadId] {
        switch (users.get(userId)) {
            case (?u) u.likedThreads;
            case (null) [];
        };
    };

    public func getDislikedThreads(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
    ) : async [ThreadId] {
        switch (users.get(userId)) {
            case (?u) u.dislikedThreads;
            case (null) [];
        };
    };

    public func getLikedComments(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
    ) : async [CommentId] {
        switch (users.get(userId)) {
            case (?u) u.likedComments;
            case (null) [];
        };
    };

    public func getDislikedComments(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
    ) : async [CommentId] {
        switch (users.get(userId)) {
            case (?u) u.dislikedComments;
            case (null) [];
        };
    };

    func containsThreadId(arr : [ThreadId], id : ThreadId) : Bool {
        switch (Array.find<ThreadId>(arr, func(x : ThreadId) : Bool { x == id })) {
            case (?_) true;
            case null false;
        };
    };

    func containsCommentId(arr : [CommentId], id : CommentId) : Bool {
        switch (Array.find<CommentId>(arr, func(x : CommentId) : Bool { x == id })) {
            case (?_) true;
            case null false;
        };
    };

    public func addLikedThread(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        threadId : ThreadId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsThreadId(u.likedThreads, threadId)) {
                    let updated = {
                        u with likedThreads = Array.append(u.likedThreads, [threadId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

    public func addDislikedThread(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        threadId : ThreadId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsThreadId(u.dislikedThreads, threadId)) {
                    let updated = {
                        u with dislikedThreads = Array.append(u.dislikedThreads, [threadId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

    public func addLikedComment(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        commentId : CommentId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsCommentId(u.likedComments, commentId)) {
                    let updated = {
                        u with likedComments = Array.append(u.likedComments, [commentId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

    public func addDislikedComment(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        commentId : CommentId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsCommentId(u.dislikedComments, commentId)) {
                    let updated = {
                        u with dislikedComments = Array.append(u.dislikedComments, [commentId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

    public func addUserThread(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        threadId : ThreadId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsThreadId(u.threads, threadId)) {
                    let updated = {
                        u with threads = Array.append(u.threads, [threadId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

    public func getUserComments(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
    ) : async [CommentId] {
        switch (users.get(userId)) {
            case (?u) u.comments;
            case null [];
        };
    };

    public func addUserComment(
        users : HashMap.HashMap<Principal, User>,
        userId : Principal,
        commentId : CommentId,
    ) : async () {
        switch (users.get(userId)) {
            case (?u) {
                if (not containsCommentId(u.comments, commentId)) {
                    let updated = {
                        u with comments = Array.append(u.comments, [commentId])
                    };
                    users.put(userId, updated);
                };
            };
            case null {};
        };
    };

};
