import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NewsItem = {
  id: string;
  title: string;
  content: string;
};

const initialState: NewsItem[] = JSON.parse(
  localStorage.getItem("news") || "[]"
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.push(action.payload);
      localStorage.setItem("news", JSON.stringify(state));
    },
    updateNews: (state, action: PayloadAction<NewsItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
      localStorage.setItem("news", JSON.stringify(state));
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("news", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addNews, updateNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;
