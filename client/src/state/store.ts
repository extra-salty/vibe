import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import effectCreatorReducer from './features/effect/effectSlice';
import animationCreatorReducer from './features/animation/animationSlice';
import appReducer from './features/app/appSlice';
import storage from 'redux-persist/lib/storage';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
// };

const rootReducer = combineReducers({
	app: appReducer,
	effectCreator: effectCreatorReducer,
	animationCreator: animationCreatorReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		app: appReducer,
		effectCreator: effectCreatorReducer,
		animationCreator: animationCreatorReducer,
	},
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().prepend(
	// 		createStateSyncMiddleware({ blacklist: ['persist/PERSIST', 'persist/REHYDRATE'] }),
	// 	),
});

// initMessageListener(store);

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
