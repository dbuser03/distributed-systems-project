// src/adapters/storyAdapter.ts

import { Principal } from "@dfinity/principal";
import { Story, ISICSectionKey, CountryCode } from "../types";

import { Comment } from "../components/ui/CommentThread";

export interface BackendThread {
  id: string; 
  author: Principal;
  title: string;
  abstract: string;
  body: string;
  tags: string[];
  file: any[]; 
  fileType: string[];
  comments:  BackendComment[]; 
  likes: bigint; 
  dislikes: bigint; 
  createdAt: bigint; 
}

export interface BackendComment {
  id: string;
  threadId: string;
  author: Principal;
  body: string;
  likes: bigint;
  dislikes: bigint;
  createdAt: bigint;
}

function safePrincipalToText(p: any): string {
  if (!p) return "Anonymous"; // Se è null o undefined

  // Caso: è un array opzionale di Motoko [] o [Principal]
  if (Array.isArray(p)) {
    if (p.length === 0) return "Anonymous";
    return safePrincipalToText(p[0]); // Ricorsione sul primo elemento
  }

  // Caso: è un oggetto Principal corretto
  if (typeof p.toText === "function") {
    return p.toText();
  }

  // Caso: è un oggetto serializzato JSON (quello che vedevi nel log)
  if (p.__principal__) {
    return p.__principal__;
  }

  // Fallback estremo
  return String(p);
}

/**
 * Convert a BackendThread to a Story
 */
export function adaptThreadToStory(thread: BackendThread): Story {

  const rawTags = thread.tags || [];

  const industryTags = rawTags.filter((t) => t.length === 1) as ISICSectionKey[];

  const foundCountry = rawTags.find((t) => t.length === 2);
  const country = (foundCountry || "CH") as CountryCode;

  return {
    id: thread.id,
    title: thread.title,
    preview: thread.abstract,
    content: thread.body,

    publisherId: thread.author.toText(),

    upvotes: Number(thread.likes),
    downvotes: Number(thread.dislikes),

    createdAt: thread.createdAt,
    publishedAt: thread.createdAt,

    industryTags: industryTags, 
    country: country,

    status: "VERIFIED",
  };
}

export function adaptComment(comment: BackendComment): Comment {
  return {
    id: comment.id,
    threadId: comment.threadId,
    author: safePrincipalToText(comment.author),
    body: comment.body,
    likes: Number(comment.likes),
    dislikes: Number(comment.dislikes),
    createdAt: comment.createdAt,
  };
}