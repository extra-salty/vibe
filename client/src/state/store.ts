import { configureStore } from '@reduxjs/toolkit';
import effectCreatorReducer from './features/effect/effectSlice';

export const store = configureStore({
	reducer: {
		effectCreator: effectCreatorReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
