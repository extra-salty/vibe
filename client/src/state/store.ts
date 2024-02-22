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
import { effectCreatorSlice } from './features/effect/effectSlice';
import { animationsSlice } from './features/animationGroups/animationSlice';
import { staticAnimationsSlice } from './features/staticAnimations/staticAnimationsSlice';
import appReducer from './features/app/appSlice';
import storage from 'redux-persist/lib/storage';
import { playlistSlice } from './features/playlist/playlistSlice';

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
};

const rootReducer = combineReducers({
	[animationsSlice.name]: animationsSlice.reducer,
	[staticAnimationsSlice.name]: staticAnimationsSlice.reducer,
	[effectCreatorSlice.name]: effectCreatorSlice.reducer,
	[playlistSlice.name]: playlistSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	// migration
	reducer: persistedReducer,
	// reducer: persistReducer<RootState>(
	// 	persistConfig,
	// 	combineReducers({
	// 		// app: appReducer,
	// 		[effectCreatorSlice.name]: effectCreatorSlice.reducer,
	// 		animationCreator: animationCreatorSlice.reducer,
	// 	}),
	// ),
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
