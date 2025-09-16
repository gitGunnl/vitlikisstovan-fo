// Basic episode shape used by the player
export type Episode = {
  id: string;
  title: string;
  audioUrl: string;      // absolute or relative (e.g., /podcasts/episode-01.mp3)
  imageUrl?: string;     // optional thumbnail
  publishedAt?: string;  // ISO string or plain label (optional)
  duration?: number;     // seconds (optional; will be read from audio metadata if omitted)
};