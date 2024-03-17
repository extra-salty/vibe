// import { createContext } from 'react';
// import { App, getApp } from 'realm-web';
// import { useUser } from '../UserProvider/useUser';
// import { StaticAnimationT } from '@/types/animation.types';
// import { Collection, Document, MongoDBCollectionNamespace } from 'mongodb';

// export type RealmAppT = {
// 	app: App | null;
// 	collections: {
// 		// animations: Collection<StaticAnimationT>;
// 		animations: any;
// 	};
// };

// export const AppContext = createContext<RealmAppT>({
// 	app: null,
// 	collections: {
// 		animations: undefined,
// 	},
// });

// const AppProvider = async ({ children }: { children: React.ReactNode }) => {
// 	const { user } = useUser();

// 	if (!user) {
// 		return <>{children}</>;
// 	}

// 	const client = user.mongoClient(process.env.NEXT_PUBLIC_CLUSTER_NAME);

// 	const db = await client
// 		.db(process.env.NEXT_PUBLIC_DB_NAME)
// 		.collection(process.env.NEXT_PUBLIC_STATIC_ANIMATION_COLLECTION)
// 		.insertOne({
// 			name: 'lily of the valley',
// 			sunlight: 'full',
// 			color: 'white',
// 			_partition: 'Store 47',
// 		});
// 	console.log('🚀 ~ AppProvider ~ db:', db);

// 	// const asd: MongoDBCollectionNamespace = db?.collection<StaticAnimationT>(
// 	// 	process.env.NEXT_PUBLIC_STATIC_ANIMATION_COLLECTION,
// 	// );

// 	// const value: RealmAppT = {
// 	// 	app: null,
// 	// 	collections: {
// 	// 		animations: db?.collection<StaticAnimationT>(
// 	// 			process.env.NEXT_PUBLIC_STATIC_ANIMATION_COLLECTION,
// 	// 		),
// 	// 	},
// 	// };
// 	// }
// 	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppProvider;
