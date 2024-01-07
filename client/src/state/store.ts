import { configureStore } from '@reduxjs/toolkit';
import effectCreatorReducer from './features/effect/effectSlice';
import animationCreatorReducer from './features/animation/animationSlice';
import appReducer from './features/app/appSlice';

export const store = configureStore({
	reducer: {
		app: appReducer,
		effectCreator: effectCreatorReducer,
		animationCreator: animationCreatorReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
