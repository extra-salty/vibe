import { configureStore } from '@reduxjs/toolkit';
import attributeReducer from './features/attribute/attributeSlice';
import effectReducer from './features/effect/effectSlice';

export const store = configureStore({
	reducer: {
		attribute: attributeReducer,
		effect: effectReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
