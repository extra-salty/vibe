'use client';
import { useApp } from '@/state/Providers/AppProvider/useApp';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm.types';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MongoDBRealmError, getApp } from 'realm-web';

const ConfirmResult2 = () => {
	const app = getApp(process.env.NEXT_PUBLIC_APP_ID);
	const searchParams = useSearchParams();

	const token = searchParams.get('token') || '';
	const tokenId = searchParams.get('tokenId') || '';
	const [errorMessage, setErrorMessage] = useState<RealmErrorMessages | null>(null);

	console.log('comp');

	const handleConfirm = async () => {
		console.log('async');

		try {
			await app.emailPasswordAuth.confirmUser({ token, tokenId });
		} catch (error) {
			const e = error as MongoDBRealmError;

			switch (e?.errorCode) {
				case RealmErrorCodes.BadRequest:
					return RealmErrorMessages.InvalidToken;
				case RealmErrorCodes.UserpassTokenInvalid:
					return RealmErrorMessages.ExpiredToken;
				default:
					return RealmErrorMessages.WentWrong;
			}
		}
	};

	const error = handleConfirm();

	return (
		<>
			{/* {errorMessage ? ( */}
			<Alert variant='outlined' severity='error'>
				<AlertTitle>Confirmation failed</AlertTitle>
				{String(handleConfirm())}
			</Alert>
			{/* ) : (
				<Alert variant='outlined' severity='success'>
					<AlertTitle>Confirmation is succesfull</AlertTitle>
					Go back and log in into your user account.
				</Alert>
			)} */}
		</>
	);
};

export default ConfirmResult2;
