import { configureStore } from "@reduxjs/toolkit";
import backgroundReducer from "../features/background/backgroundSlice";
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

export interface RootState {
    background: {
        color: string;
    };
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
    reducer: {
        background: backgroundReducer,
    }
})