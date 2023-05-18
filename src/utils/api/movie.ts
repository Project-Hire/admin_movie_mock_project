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
    let name = input.name ?? '';

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records?page=${startPage}&limit=${startLimit}&${
        name !== '' ? `filter=%28name~%27${name}%27%29` : ''
      }`,
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
  actor: string;
  poster: string;
  category: string;
  trailer: string;
}) => {
  try {
    const { name, description, actor, poster, category, trailer } = input;

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' };
    }

    if (!actor) {
      return {
        success: false,
        data: null,
        message: 'Please enter actor'
      };
    }

    if (!category) {
      return {
        success: false,
        data: null,
        message: 'Please enter Category'
      };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records`,
      'POST',
      { name, description, actor, poster, category, trailer },
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
      'DELETE'
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
  actor: string;
  poster: string;
  category: string;
  video: string;
}) => {
  try {
    const { id, name, description, actor, poster, category, video } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      'PATCH',
      { name, description, actor, poster, category, video }
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
      'GET'
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
