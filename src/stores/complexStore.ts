import { create } from 'zustand';
import axios from 'axios';

// 단지 타입 정의
export interface Complex {
  id: number;
  name: string;
  region: string;
  location: string;
  totalUnit: number;
  parkingCapacity: number;
  buildingRange: string;
  imageUrls: string[];
}

interface ComplexState {
  complexes: Complex[];
  isLoading: boolean;
  error: string | null;
  currentComplex: Complex | null; // 단일 단지 정보
  fetchComplexes: () => Promise<void>; // 단지 목록 가져오기
  fetchComplexById: (id: number) => Promise<void>; // 단지 상세 정보 가져오기
  searchComplexes: (keyword: string) => Promise<void>; // 단지 검색
  registerComplex: (complexData: FormData) => Promise<boolean>; // 단지 등록
  updateComplex: (id: number, complexData: FormData) => Promise<boolean>; // 단지 정보 업데이트
  deleteComplex: (id: number) => Promise<boolean>; // 단지 삭제
  clearState: () => void; // 상태 초기화
}

export const useComplexStore = create<ComplexState>((set, get) => ({
  complexes: [],
  isLoading: false,
  error: null,
  currentComplex: null,

  fetchComplexes: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(
        'https://danjitalk.duckdns.org/api/apartment'
      );
      set({ complexes: response.data, isLoading: false });
    } catch (error) {
      console.error('단지 목록 조회 실패:', error);
      set({
        error:
          '단지 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
        isLoading: false,
        complexes: [], // 빈 배열로 설정하여 UI가 정상적으로 랜더링되도록 함
      });
    }
  },

  fetchComplexById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(
        `https://danjitalk.duckdns.org/api/apartment/${id}`
      );
      set({ currentComplex: response.data, isLoading: false });
    } catch (error) {
      console.error('단지 상세 정보 조회 실패:', error);
      set({ error: '단지 정보를 불러오는데 실패했습니다.', isLoading: false });
    }
  },

  searchComplexes: async (keyword: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(
        `https://danjitalk.duckdns.org/api/apartment/search?keyword=${encodeURIComponent(keyword)}`
      );
      set({ complexes: response.data, isLoading: false });
    } catch (error) {
      console.error('단지 검색 실패:', error);
      set({ error: '단지 검색에 실패했습니다.', isLoading: false });
    }
  },

  registerComplex: async (complexData: FormData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.post(
        'https://danjitalk.duckdns.org/api/apartment',
        complexData,
        {
          headers: {},
        }
      );

      const newComplex = response.data;

      set((state) => ({
        complexes: [newComplex, ...state.complexes],
        isLoading: false,
      }));

      return true;
    } catch (error) {
      console.error('단지 등록 실패:', error);

      if (axios.isAxiosError(error) && error.response) {
        console.error('오류 상태:', error.response.status);
        console.error('오류 데이터:', error.response.data);
      }

      set({ error: '단지 등록에 실패했습니다.', isLoading: false });
      return false;
    }
  },

  updateComplex: async (id: number, complexData: FormData) => {
    try {
      set({ isLoading: true, error: null });
      await axios.put(
        `https://danjitalk.duckdns.org/api/apartment/${id}`,
        complexData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      await get().fetchComplexes();
      if (get().currentComplex?.id === id) {
        await get().fetchComplexById(id);
      }
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('단지 정보 업데이트 실패:', error);
      set({ error: '단지 정보 업데이트에 실패했습니다.', isLoading: false });
      return false;
    }
  },

  deleteComplex: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`https://danjitalk.duckdns.org/api/apartment/${id}`);
      // 성공 후 목록 새로고침
      await get().fetchComplexes();
      set({ isLoading: false, currentComplex: null });
      return true;
    } catch (error) {
      console.error('단지 삭제 실패:', error);
      set({ error: '단지 삭제에 실패했습니다.', isLoading: false });
      return false;
    }
  },

  clearState: () => {
    set({ currentComplex: null, error: null });
  },
}));
