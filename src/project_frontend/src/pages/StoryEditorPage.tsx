import React from "react";

/**
 * This page is for editing a story.
 * Add some dependency that allows us to have some sort of document editor.
 * maybe something like react-quill or something else.
 * ? https://uiwjs.github.io/react-md-editor/
 */

function StoryEditorPage() {
  return (
    <div className="min-h-full p-8">
      <h1 className="text-3xl mb-8">Edit Story</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Text
          </label>
          <textarea
            id="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default StoryEditorPage;
