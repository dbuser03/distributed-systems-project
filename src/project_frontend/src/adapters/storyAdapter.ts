// src/adapters/storyAdapter.ts

import { Principal } from "@dfinity/principal";
import { Story, ISICSectionKey, CountryCode } from "../types";
import { StoryFile } from "../types";

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
  if (!p) return "Anonymous";

  if (Array.isArray(p)) {
    if (p.length === 0) return "Anonymous";
    return safePrincipalToText(p[0]);
  }

  if (typeof p.toText === "function") {
    return p.toText();
  }

  if (p.__principal__) {
    return p.__principal__;
  }

  return String(p);
}

function convertDate(val: bigint): bigint {
  if (val === undefined || val === null) {
    // Ritorna 0 o la data attuale in formato BigInt
    return 0n; 
  }

  // 2. Se è un array (caso Motoko Optional ?Int)
  if (Array.isArray(val)) {
    if (val.length === 0) return 0n;
    return convertDate(val[0]); // Ricorsione sul contenuto
  }

  try {
    // 3. Convertiamo in BigInt qualsiasi cosa sia (stringa, number, bigint)
    const bigNs = BigInt(val);
    // 4. Convertiamo Nanosecondi in Millisecondi
    return bigNs / 1_000_000n;
  } catch (e) {
    console.error("Errore conversione data:", val, e);
    return 0n;
  }
}


function adaptBackendFiles(
  files: any[] | undefined,
  fileTypes: any[] | undefined
): StoryFile[] {
  if (!files || !Array.isArray(files) || files.length === 0) return [];

  const innerFiles = files[0];
  const innerFileTypes = fileTypes?.[0] ?? []

  if (!Array.isArray(innerFiles)) return [];

  return innerFiles.map((fileBytes: any, index: number) => ({
    fileName: innerFileTypes[index] ?? "unknown",
    fileData: fileBytes ?? [],
  }));
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

    createdAt: convertDate(thread.createdAt),
    publishedAt: convertDate(thread.createdAt),

    industryTags: industryTags, 
    country: country,
    files: adaptBackendFiles(thread.file, thread.fileType), 
    

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
    createdAt: convertDate(comment.createdAt),
  };
}