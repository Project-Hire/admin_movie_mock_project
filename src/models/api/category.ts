export interface ICategoryListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: ICategoryListData[];
}
export interface ICategoryListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
}
