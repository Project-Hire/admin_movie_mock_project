import { fetchDataAuth } from '.';

export const API_BASE_URL = 'http://127.0.0.1:8090';

export const getMovieList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records?page=${startPage}&limit=${startLimit}`,
      {
        method: 'GET'
      }
    );

    const rawResponse = await response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const addMovie = async (input: {
  name: string;
  description: string;
  actor_id: string;
  poster: string;
  category_id: string;
}) => {
  try {
    const { name, description, actor_id, poster, category_id } = input;

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' };
    }

    if (!actor_id) {
      return {
        success: false,
        data: null,
        message: 'Please enter your Id actor'
      };
    }

    if (!category_id) {
      return {
        success: false,
        data: null,
        message: 'Please enter your Id Category'
      };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records`,
      'POST',
      { name, description, actor_id, poster, category_id },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteMovie = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      'DELETE',
      { id },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateMovie = async (input: {
  id: string;
  name: string;
  description: string;
  actor_id: string;
  poster: string;
  category_id: string;
}) => {
  try {
    const { id, name, description, actor_id, poster, category_id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      'PATCH',
      { id, name, description, actor_id, poster, category_id },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getMovieData = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      'GET',
      { id },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
