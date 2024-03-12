import { useEffect, useState } from 'react';
import { useUser } from '@/state/Providers/UserProvider/useUser';

const ExternalLoginProviders = () => {
	const { actions } = useUser();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		google.accounts.id.renderButton(document.getElementById('google') as HTMLElement, {
			theme: 'filled_black',
			width: 350,
		});
	}, [actions.login]);

	return (
		<>
			<div id='google' style={{ height: '44px' }}></div>
			{/* <LoadingButton variant='contained' startIcon={<Facebook />}>
				Facebook
			</LoadingButton> */}
		</>
	);
};

export default ExternalLoginProviders;
