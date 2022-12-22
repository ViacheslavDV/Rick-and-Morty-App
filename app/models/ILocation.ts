export interface ILocation {
  created: string;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
}

export interface ILocationAPI {
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
  created: string;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url?: string;
}
