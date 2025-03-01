// Article Types
export interface Paragraph {
  english: string;
  chinese?: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface ComplexSentence {
  english: string;
  chinese: string;
  analysis: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: Paragraph[];
  author: string;
  authorTitle?: string;
  category: string;
  status: 'published' | 'draft';
  publishedAt: string;
  coverImage: string;
  imageCaption?: string;
  readingTime?: number;
  keyTerms: KeyTerm[];
  complexSentences: ComplexSentence[];
}

// API Types
export interface ApiSettings {
  apiKey: string;
  apiEndpoint: string;
  model: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  role: 'admin';
  createdAt: string;
}