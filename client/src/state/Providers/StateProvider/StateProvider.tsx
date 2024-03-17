import { persistor, store } from '@/state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const StateProvider = ({ children }: { children: React.ReactNode }) => {
	// export const useAppStore: () => AppStore = useStore
	// const storeRef = useRef<AppStore>()
	// if (!storeRef.current) {
	//   // Create the store instance the first time this renders
	//   storeRef.current = makeStore()
	// storeRef.current.dispatch(initializeCount(count))
	// }

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default StateProvider;
