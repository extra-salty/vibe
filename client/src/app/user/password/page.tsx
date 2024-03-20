'use client';
import { useSearchParams } from 'next/navigation';
import { NewPasswordForm } from '@/components/User/NewPasswordForm/NewPasswordForm';
import { Alert, Typography } from '@mui/material';
import { Options, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

const Password = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const tokenId = searchParams.get('tokenId');

	const options: Partial<Options> = {
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary,
		},
		useLevenshteinDistance: true,
		// graphs: zxcvbnCommonPackage.adjacencyGraphs,
	};

	zxcvbnOptions.setOptions(options);

	return (
		<>
			<Typography variant='h4'>Enter a new password</Typography>
			<Typography>To reset your password, enter your email below and submit.</Typography>
			{token && tokenId ? (
				<NewPasswordForm token={token} tokenId={tokenId} />
			) : (
				<Alert variant='outlined' severity='error'>
					Invalid link. Please, open the link again from your reset confirmation email.
				</Alert>
			)}
		</>
	);
};

export default Password;
