import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import mongoClientPromise from '@/services/MongoDB/mongoClient';

type ConnectionStatus = {
	isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
	try {
		await mongoClientPromise;

		return {
			props: { isConnected: true },
		};
	} catch (e) {
		console.error(e);

		return {
			props: { isConnected: false },
		};
	}
};

export default function Connected({
	isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <div>{isConnected}</div>;
}

// export default Connected;
