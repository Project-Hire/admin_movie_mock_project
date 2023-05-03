export const API_BASE_URL = 'http://127.0.0.1:8090';
import { fetchDataAuth } from '.';

export const getActorList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records?page=${startPage}&limit=${startLimit}`,
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

export const addActor = async (input: { name: string; avatar: string }) => {
  try {
    const { name, avatar } = input;

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/actors/records`,
      'POST',
      { name, avatar },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteActor = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      'DELETE'
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateActor = async (input: {
  id: string;
  name: string;
  avatar: string;
}) => {
  try {
    const { id, name, avatar } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      'PATCH',
      { name, avatar },
      {}
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getActorData = async (input: { id: string }) => {
  try {
    const { id } = input;

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' };
    }

    const response = await fetchDataAuth(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      'GET'
    );

    return response;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
