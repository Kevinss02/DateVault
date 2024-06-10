import {
  MemoryData,
  type MemoryDataResponse,
  type ResponseType,
} from '../types/types';
import api from './axiosApi';

export const getMems = async function (): Promise<
  ResponseType<MemoryDataResponse[]>
> {
  const response =
    await api.get<ResponseType<MemoryDataResponse[]>>('/memories');
  return response.data;
};

export const addMem = async function (
  memData: MemoryData,
): Promise<ResponseType<MemoryDataResponse>> {
  const response = await api.post<ResponseType<MemoryDataResponse>>(
    '/memories',
    memData,
  );
  return response.data;
};

export const editMem = async function (
  memData: MemoryData & { images?: any },
  id: string,
): Promise<ResponseType<MemoryDataResponse>> {
  const response = await api.put<ResponseType<MemoryDataResponse>>(
    `/memories/${id}`,
    memData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const deleteMem = async function (
  id: string,
): Promise<ResponseType<string>> {
  const response = await api.delete<ResponseType<string>>(`/memories/${id}`);
  return response.data;
};
