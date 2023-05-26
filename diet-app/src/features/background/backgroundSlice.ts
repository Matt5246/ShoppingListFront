import { createSlice } from "@reduxjs/toolkit";

interface BackgroundState {
    backgroundColor: string,
}

const initialState: BackgroundState = {
    backgroundColor: localStorage.getItem("Theme") ||'dark',
};
  
const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        toggleBackgroundColor: (state) => {
            state.backgroundColor = state.backgroundColor === 'light' ? 'dark' : 'light';
        },
    },
});
  
export const selectBackgroundColor = (state: { background: BackgroundState }) => state.background.backgroundColor;

export const { toggleBackgroundColor } = backgroundSlice.actions;

export default backgroundSlice.reducer;

