import { AxiosError } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  addMem,
  deleteImg,
  deleteMem,
  editMem,
  getMems,
} from '../api/memRequest';
import { MemoryData, type MemoryDataResponse } from '../types/types';

export type MemState = {
  mems: MemoryDataResponse[] | null;
  memErrors: string[];
  loadedMems: boolean;
  loadMems: () => Promise<void>;
  createMem: (mem: MemoryData) => Promise<MemoryDataResponse | undefined>;
  editMem: (mem: MemoryData & { images?: any }, id: string) => Promise<void>;
  deleteMem: (id: string) => Promise<void>;
  deleteImg: (img: string) => Promise<void>;
};

export const useMemStore = createWithEqualityFn<MemState>(
  (set) => ({
    mems: null,
    memErrors: [],
    loadedMems: false,
    loadMems: async function (): Promise<void> {
      try {
        const res = await getMems();

        if (res.output.length === 0) {
          set({ mems: res.output, loadedMems: false });
        } else {
          set({ mems: res.output, loadedMems: true });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state: MemState) => ({
            memErrors: [...state.memErrors, errorParsed?.error],
          }));
        }
      }
    },

    createMem: async function (
      mem: MemoryData,
    ): Promise<MemoryDataResponse | undefined> {
      try {
        const res = await addMem(mem);
        set((state) => ({
          mems:
            state.mems != null && state.mems.length > 0
              ? [...state.mems, res.output]
              : [res.output],
          loadedMems: true,
        }));
        return res.output;
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state: MemState) => ({
            memErrors: [...state.memErrors, errorParsed?.error],
          }));

          return undefined;
        }
      }
      return undefined;
    },

    editMem: async function (
      mem: MemoryData & { images?: any },
      id: string,
    ): Promise<void> {
      try {
        const res = await editMem(mem, id);

        if (res != null) {
          const resGet = await getMems();
          set({ mems: resGet.output, loadedMems: true });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state) => ({
            memErrors: [...state.memErrors, errorParsed?.error],
          }));
        }
      }
    },

    deleteMem: async function (id: string): Promise<void> {
      try {
        const res = await deleteMem(id);

        if (res != null) {
          const resGet = await getMems();
          set({ mems: resGet.output, loadedMems: true });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state) => ({
            memErrors: [...state.memErrors, errorParsed?.error],
          }));
        }
      }
    },
    deleteImg: async function (img: string): Promise<void> {
      try {
        await deleteImg(img);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state) => ({
            memErrors: [...state.memErrors, errorParsed?.error],
          }));
        }
      }
    },
  }),
  shallow,
);
