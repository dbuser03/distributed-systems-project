// src/adapters/storyAdapter.ts

import { Principal } from "@dfinity/principal";
import { Story, ISICSectionKey, CountryCode } from "../types";

export interface BackendThread {
  id: string; 
  author: Principal;
  title: string;
  abstract: string;
  body: string;
  tags: string[];
  file: [] | [any]; 
  fileType: [] | [string];
  comments: [] | [any]; 
  likes: bigint; 
  dislikes: bigint; 
  createdAt: bigint; 
}

/**
 * Convert a BackendThread to a Story
 */
export function adaptThreadToStory(thread: BackendThread): Story {
  // 1. Logica di separazione dei tag
  // Filtriamo i tag grezzi ricevuti dal backend
  const rawTags = thread.tags || [];

  // Se è lungo 1 carattere (es. "A"), è un tag industria
  const industryTags = rawTags.filter((t) => t.length === 1) as ISICSectionKey[];

  // Se è lungo 2 caratteri (es. "US"), è un paese. Ne prendiamo uno, o default a "CH"
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

    // 2. Usiamo le variabili calcolate sopra
    industryTags: industryTags, 
    country: country,

    status: "VERIFIED",
  };
}