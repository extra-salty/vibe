'use client';
import { useSearchParams } from 'next/navigation';
import { NewPasswordForm } from '@/components/User/NewPasswordForm/NewPasswordForm';
import { Typography } from '@mui/material';
import { Options, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

const Password = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token') || '';
	const tokenId = searchParams.get('tokenId') || '';

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
			<Typography
				variant='h4'
				alignSelf='center'
				alignContent={'center'}
				alignItems={'center'}
			>
				Create a new password
			</Typography>
			<Typography>To reset your password, enter your email below and submit.</Typography>
			<NewPasswordForm token={token} tokenId={tokenId} />
		</>
	);
};

export default Password;
