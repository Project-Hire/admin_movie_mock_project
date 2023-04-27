import { IActorListData } from './actor';
import { ICategoryListData } from './category';

export interface IMovieListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  description: string;
  actor: IActorListData[];
  poster: string;
  category: ICategoryListData[];
}
export interface IMovieListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: IMovieListData[];
}

export interface IMovieListDataResponseError {
  success: boolean;
  data: null;
  message: string;
}
