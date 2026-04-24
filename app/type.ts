export type MovieSummary = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | string;
  original_language: string;
  genre_ids: number[];
  genres?: {
    id: number;
    name: string;
  }[];
  popularity: number;
  release_date: string; // ISO date string
  video: boolean;
  vote_average: number;
  vote_count: number;
};
