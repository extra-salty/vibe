import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './features/color/colorSlice';
import ledMatrixReducer from './features/led-matrix/ledMatrixSlice';

export const store = configureStore({
	reducer: {
		color: colorReducer,
		ledMatrix: ledMatrixReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
