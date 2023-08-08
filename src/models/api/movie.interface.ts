

export interface IMovieListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  description: string;
  actor: string;
  poster: string;
  category: string;
  video: string;
}
export interface IMovieListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: IMovieListData[];
}

export interface ICreateMovieDataResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  description: string;
  actor: string;
  poster: string;
  category: string;
  video: string;
}

export interface IEditMovieDataResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  name: string;
  updated: string;
  description: string;
  actor: string;
  poster: string;
  category: string;
  video: string;
}

export interface IMovieListDataResponseError {
  success: boolean;
  data: null;
  message: string;
}
