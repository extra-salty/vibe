import { configureStore } from '@reduxjs/toolkit';
import attributeReducer from './features/attributes/attributeSlice';
import effectReducer from './features/effect/effectSlice';

export const store = configureStore({
	reducer: {
		attributes: attributeReducer,
		effect: effectReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
