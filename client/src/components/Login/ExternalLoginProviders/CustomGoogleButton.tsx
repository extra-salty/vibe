import { useApp } from '@/state/Providers/AppProvider/useApp';
import { useRoutes } from '@/state/Providers/Routes/useRoutes/useRoutes';
import { Google } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import {
	CredentialResponse,
	TokenResponse,
	useGoogleLogin,
	useGoogleOneTapLogin,
} from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Credentials } from 'realm-web';

const CustomGoogleButton = () => {
	const app = useApp();

	const goToHome = useRoutes('home');

	return (
		<LoadingButton size='large' variant='contained' onClick={() => {}} loading={false}>
			<Box sx={{ display: 'flex', gap: '5px' }}>
				<Google />
				Sign it with Google
			</Box>
		</LoadingButton>
	);
};

export default CustomGoogleButton;
