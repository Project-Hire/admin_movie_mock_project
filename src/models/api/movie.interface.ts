import { IActorListData } from './actor.interface';
import { ICategoryListData } from './category.interface';

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

export interface ICreateMovieDataResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  name: string;
  description: string;
  actor: IActorListData[];
  poster: string;
  category: ICategoryListData[];
}

export interface IEditMovieDataResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  name: string;
  description: string;
  actor: IActorListData[];
  poster: string;
  category: ICategoryListData[];
}

export interface IMovieListDataResponseError {
  success: boolean;
  data: null;
  message: string;
}
