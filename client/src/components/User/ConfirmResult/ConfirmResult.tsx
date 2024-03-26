'use client';
import { useApp } from '@/misc/hooks/useApp/useApp';
import { useSearchParams } from 'next/navigation';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm.types';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { MongoDBRealmError } from 'realm-web';

const ConfirmResult = () => {
	const app = useApp();
	const searchParams = useSearchParams();

	const [errorMessage, setErrorMessage] = useState<RealmErrorMessages | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const token = searchParams.get('token') || '';
	const tokenId = searchParams.get('tokenId') || '';

	useEffect(() => {
		const handleConfirm = async () => {
			try {
				await app.emailPasswordAuth.confirmUser({ token, tokenId });
			} catch (error) {
				const e = error as MongoDBRealmError;

				switch (e?.errorCode) {
					case RealmErrorCodes.BadRequest:
						setErrorMessage(RealmErrorMessages.InvalidToken);
						break;
					case RealmErrorCodes.UserpassTokenInvalid:
						setErrorMessage(RealmErrorMessages.ExpiredToken);
						break;
					default:
						setErrorMessage(RealmErrorMessages.WentWrong);
						break;
				}
			}

			setLoading(false);
		};

		handleConfirm();
	}, [app.emailPasswordAuth, token, tokenId]);

	return (
		<>
			{loading ? (
				<Alert variant='outlined' severity='info' icon={<CircularProgress size={22} />}>
					<AlertTitle>Confirmation is pending</AlertTitle>
					Wait until the confirmation is finalized.
				</Alert>
			) : (
				<>
					{errorMessage ? (
						<Alert variant='outlined' severity='error'>
							<AlertTitle>Confirmation failed</AlertTitle>
							{String(errorMessage)}
						</Alert>
					) : (
						<Alert variant='outlined' severity='success'>
							<AlertTitle>Confirmation is succesfull</AlertTitle>
							Go back and log in into your user account.
						</Alert>
					)}
				</>
			)}
		</>
	);
};

export default ConfirmResult;
