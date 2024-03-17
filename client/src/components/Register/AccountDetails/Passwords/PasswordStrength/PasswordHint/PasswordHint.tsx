import { Box, Divider, Typography } from '@mui/material';
import { ZxcvbnResult } from '@zxcvbn-ts/core';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

type TranslationsT = Record<
	string,
	{
		[key: string]: string | undefined;
	}
>;

const PasswordHint = ({
	password,
	result,
}: {
	password: string;
	result: ZxcvbnResult;
}) => {
	const translations: TranslationsT = zxcvbnEnPackage.translations;
	const warning = result?.feedback.warning;
	const suggestions: string[] = result?.feedback.suggestions;

	return (
		<>
			{!!password && (
				<>
					<Divider sx={{ fontSize: '12px' }}>Suggestions and warnings</Divider>
					{suggestions && suggestions.length && (
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
							{suggestions.map((suggestion) => (
								<Typography variant='caption' key={suggestion}>
									{translations.suggestions[result.feedback.suggestions[0]]}
								</Typography>
							))}
							{warning && (
								<Typography variant='caption'>
									{translations.warnings[warning]}
								</Typography>
							)}
						</Box>
					)}
				</>
			)}
		</>
	);
};

export default PasswordHint;
