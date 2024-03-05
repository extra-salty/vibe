import { app } from '@/services/Realm/RealmClient';
import { Facebook, Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as Realm from 'realm-web';

const ExternalLoginProviders = () => {
	const handleGoogleLogin = async () => {
		const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URI;

		const credentials = Realm.Credentials.google({ redirectUrl });

		console.log('🚀 ~ handleGoogleLogin ~ credentials:', credentials);
		await app
			.logIn(credentials)
			.then((user) => {
				console.log(user);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Button variant='contained' startIcon={<Google />} onClick={handleGoogleLogin}>
				Google
			</Button>
			<Button variant='contained' startIcon={<Facebook />}>
				Facebook
			</Button>
		</>
	);
};

export default ExternalLoginProviders;
