import { configureStore } from '@reduxjs/toolkit';
import effectCreatorReducer from './features/effect/effectSlice';
import appReducer from './features/app/appSlice';

export const store = configureStore({
	reducer: {
		app: appReducer,
		effectCreator: effectCreatorReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
