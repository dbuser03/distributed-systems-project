# List of things to do in the backend
- [x] Enable creating and saving documents
- [x] Save comments checking that the thread exists 
- [x] Retrieve threads based on tags
- [x] handle liking / disliking (missing call to user state)
- [X] add inverted index for likes
- [X] handle saving files
- [X] delete threads / comments
- [X] implement user data structure and logic
- [X] implement authentication and role based access control

- [] add in types.mo for type user respectively the array for ThreadId and CommentId of the user's posts and comments
- [] add in the same type also the arrays of IDs (Text) for the user of likes/dislikes they gave on different posts/comments
- [] create method that given a user's id it returns the list of threads they wrote (use getThreads in forum.mo)
- [] create method that given an id of thread/comment for a user it determines if they liked/disliked it or not