export interface SearchQuery {
  genre: string;
  artist: string;
}

export interface Album {
  name: string;
  url: string;
  image: string;
}

export interface Artist {
  id: string;
  name: string;
  url: string;
}

export interface SearchResult {
  id: string;
  name: string;
  url: string;
  preview_url: string | null;
  album: Album;
  artists: Artist[];
}
