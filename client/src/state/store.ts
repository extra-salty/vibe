import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	WebStorage,
	persistReducer,
	persistStore,
} from 'redux-persist';
import { appSlice } from './features/app/appSlice';
// import { effectCreatorSlice } from './features/effect/effectSlice';
import { animationsSlice } from './features/animationGroups/animationSlice';
import { playlistSlice } from './features/playlist/playlistSlice';
import { colorSlice } from './features/color/colorSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// import storage from 'redux-persist/lib/storage';

const createPersistStorage = (): WebStorage => {
	const isServer = typeof window === 'undefined';

	// Returns noop (dummy) storage.
	if (isServer) {
		return {
			getItem() {
				return Promise.resolve(null);
			},
			setItem() {
				return Promise.resolve();
			},
			removeItem() {
				return Promise.resolve();
			},
		};
	}

	return createWebStorage('local');
};

const persistConfig = {
	key: 'root',
	storage: createPersistStorage(),
	// blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
};

const rootReducer = combineReducers({
	[appSlice.name]: appSlice.reducer,
	[animationsSlice.name]: animationsSlice.reducer,
	// [effectCreatorSlice.name]: effectCreatorSlice.reducer,
	[playlistSlice.name]: playlistSlice.reducer,
	[colorSlice.name]: colorSlice.reducer,
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
