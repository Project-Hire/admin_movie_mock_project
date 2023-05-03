import {
  ICategoryListDataResponse,
  ICreateCategoryDataResponse
} from 'src/models/api/category.interface';
import { fetchDataAuth } from '.';

export const API_BASE_URL = 'http://127.0.0.1:8090';

export const getCategoryList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records?page=${startPage}&limit=${startLimit}`,
      {
        method: 'GET'
      }
    );

    const rawResponse = (await response.json()) as ICategoryListDataResponse;

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const addCategory = async (input: { name: string }) => {
  try {
    const { name } = input;

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/categories/records`,
      'POST',
      { name },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteCategory = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      'DELETE'
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateCategory = async (input: { id: string; name: string }) => {
  try {
    const { id, name } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      'PATCH',
      { name },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getCategoryData = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      'GET'
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
