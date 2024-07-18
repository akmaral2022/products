import { Products } from "@/types/products";
import axios from "axios";

const axiosStore = axios.create({
  baseURL: 'http://localhost:3002',
})


axiosStore.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config
})

export default axiosStore

export const fetchProducts = async (limit: number, page: number, query: string): Promise<{ data: Products[], total: number }> => {
  try {
    const response = await axiosStore.get('/products', {
      params: {
        _limit: limit,
        _page: page,
        q: query,
      },
    });
    const totalCountHeader = response.headers['x-total-count'];
    const total = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
    return {
      data: response.data,
      total,
    };
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return {
      data: [],
      total: 0,
    };
  }
};

export const fetchProductById = async (id: number): Promise<Products | null> => {
  try {
    const response = await axiosStore.get<Products>(`/products/${id}`);
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    const response = await axiosStore.delete(`/products/${id}`);
  } catch (error) {
    throw new Error('Не удалось удалить продукт');
  }
};