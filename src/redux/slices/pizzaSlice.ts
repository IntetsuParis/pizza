import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
type FetchPizzasArgs = Record<string, string>
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://6515c9d209e3260018c924b1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as Pizza[];
});
export enum Status {
  LOADING= 'loading',
  SUCCESS= 'success',
  ERROR= 'error',
}
interface PizzasSliceState {
  items:Pizza[] ;
  status: Status
}
type  Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}
const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});
export const selectPizzaData = (state:RootState) => state.pizza
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
