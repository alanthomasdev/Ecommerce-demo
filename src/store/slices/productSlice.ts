import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string;
  sortBy: string;
  minPrice: number;
  maxPrice: number;
  currentPage: number;
  itemsPerPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: '',
  sortBy: '',
  minPrice: 0,
  maxPrice: 0,
  currentPage: 1,
  itemsPerPage: 8,
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      productSlice.caseReducers.filterProducts(state);
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      productSlice.caseReducers.sortProducts(state);
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
      productSlice.caseReducers.filterProducts(state);
    },
    filterProducts(state) {
      const filtered = state.products.filter(p =>
        (!state.selectedCategory || p.category === state.selectedCategory) &&
        p.price >= state.minPrice &&
        p.price <= state.maxPrice
      );
      state.filteredProducts = filtered;
      productSlice.caseReducers.sortProducts(state);
    },
    sortProducts(state) {
      const sorted = [...state.filteredProducts];
      switch (state.sortBy) {
        case 'priceLowHigh':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighLow':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'titleAZ':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'titleZA':
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      state.filteredProducts = sorted;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        // Calculate initial price range from loaded products
        if (action.payload.length > 0) {
          const prices = action.payload.map((p:any) => p.price);
          state.minPrice = Math.floor(Math.min(...prices));
          state.maxPrice = Math.ceil(Math.max(...prices));
        }
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  setCategory,
  setSortBy,
  setPage,
  setPriceRange,
  filterProducts,
  sortProducts,
} = productSlice.actions;

export default productSlice.reducer;