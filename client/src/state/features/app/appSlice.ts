import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppT } from './appSlice.types';

const initialState: AppT = {
	isModalOpen: false,
};

export const App = createSlice({
	name: 'app',
	initialState,
	reducers: {},
});

export const {} = App.actions;

export default App.reducer;
