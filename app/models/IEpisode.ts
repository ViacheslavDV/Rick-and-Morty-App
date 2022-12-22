export interface IEpisode {
  air_date: string;
  characters: string[];
  created: string;
  id: number;
  name: string;
  url: string;
}

export interface IEpisodeAPI {
  info: Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface Result {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  url: string;
  characters: string[];
}
