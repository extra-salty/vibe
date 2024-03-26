import { useUser } from '../UserProvider/useUser';
import { createContext } from 'react';
import { AnimationT } from '@/types/animation.types';
// import * as RealmWeb from 'realm-web';

type DocumentT = Realm.Services.MongoDB.Document;
type CollectionT<T extends DocumentT> = Realm.Services.MongoDB.MongoDBCollection<T>;

type DataT = {
	animations: CollectionT<AnimationT | any>;
};

export const DataContext = createContext<DataT | null>(null);

const DataProvider = async ({ children }: { children: React.ReactNode }) => {
	const user = useUser();
	// console.log('🚀 ~ DataProvider ~ user:', user);

	const client = user.mongoClient(process.env.NEXT_PUBLIC_CLUSTER_NAME);
	const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);

	const value: DataT = {
		animations: db.collection(process.env.NEXT_PUBLIC_DB_STATIC_ANIMATION_COLLECTION),
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
