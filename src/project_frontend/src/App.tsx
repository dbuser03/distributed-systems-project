import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  StoryGalleryPage,
  StoryEditorPage,
  SearchPage,
  UserPage,
  StoryPage,
} from "./pages";
import { Layout } from "./components";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StoryGalleryPage />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/story-editor/:id?" element={<StoryEditorPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
