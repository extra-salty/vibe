import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppT, ThemeModeT } from './appSlice.types';

const initialState: AppT = {
	themeMode: 'dark',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setThemeMode: (state, action: PayloadAction<ThemeModeT>) => {
			state.themeMode = action.payload;
		},
	},
});

export const AppActions = appSlice.actions;
