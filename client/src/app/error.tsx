'use client';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Window from '@/components/Window/Window';
import { useEffect } from 'react';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	const handleReset = () => reset();

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	);
};

export default Error;
