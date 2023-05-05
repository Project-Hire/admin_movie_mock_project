import { create } from 'zustand';

export interface IDataLoginInfo {
  data: {
    avatar: number;
    created: string;
    email: string;
    id: string;
    updated: string;
  };
  token: string;
}

export interface IDataLoginStatus {
  data: IDataLoginInfo;
  updateLoginData: (state: IDataLoginInfo) => void;
  resetLoginData: (state: IDataLoginInfo) => void;
}

const initialValues: IDataLoginInfo = {
  data: {
    avatar: 0,
    created: '',
    email: '',
    id: '',
    updated: ''
  },
  token: ''
};

const updateData = (set) => (updatedInfo: IDataLoginInfo) =>
  set(() => {
    return { data: updatedInfo };
  });

const resetData = (set) => () =>
  set(() => {
    return { data: initialValues };
  });

export const useDataLoginInfo = create<IDataLoginStatus>((set) => ({
  data: initialValues,
  updateLoginData: updateData(set),
  resetLoginData: resetData(set)
}));
