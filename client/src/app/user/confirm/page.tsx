'use client';
import { useApp } from '@/state/Providers/AppProvider/useApp';
import { Alert, Button, Fade } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { MongoDBRealmError, getApp } from 'realm-web';

const Confirm = () => {
	const app = useApp();
	const router = useRouter();

	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	console.log('🚀 ~ Confirm ~ token:', token);
	const tokenId = searchParams.get('tokenId');
	console.log('🚀 ~ Confirm ~ tokenId:', tokenId);

	const confirmUser = async () => {
		try {
			if (token && tokenId) {
				await app.emailPasswordAuth.confirmUser({ token, tokenId });
			}
		} catch (error) {
			console.log(error);
			const e = error as MongoDBRealmError;

			switch (e?.errorCode) {
				// case RealmErrorCodes.UserNotFound:
				// setErrorText(EmailErrors.NotFound);
				// break;
				default:
					console.log(e);
					break;
			}
		}
	};

	// confirmUser();

	return (
		<>
			<Button onClick={confirmUser}>Confirm</Button>
			<Fade in={true}>
				<Alert variant='outlined'>User account was succesfully created.</Alert>
			</Fade>
		</>
	);
};

export default Confirm;
