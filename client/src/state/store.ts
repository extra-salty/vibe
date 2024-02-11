import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';
import appReducer from './features/app/appSlice';
import storage from 'redux-persist/lib/storage';
import { effectCreatorSlice } from './features/effect/effectSlice';
import { animationCreatorSlice } from './features/animation/animationSlice';

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
};

export const store = configureStore({
	// migration
	reducer: persistReducer(
		persistConfig,
		combineReducers({
			// app: appReducer,
			[effectCreatorSlice.name]: effectCreatorSlice.reducer,
			[animationCreatorSlice.name]: animationCreatorSlice.reducer,
		}),
	),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// initMessageListener(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
