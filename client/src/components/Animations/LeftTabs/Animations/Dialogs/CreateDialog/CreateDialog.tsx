import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppDispatch } from '@/state/store';
import {
	getAnimations,
	createStaticAnimation,
	getStaticAnimations,
} from '@/state/features/animationGroups/animationsThunk';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CreateDialogContent from './CreateDialogContent/CreateDialogContent';
import { StaticAnimationApi } from '@/app/api/staticAnimation/_service';
import { useUser } from '@/state/Providers/UserProvider/useUser';
// import { useApp } from '@/state/Providers/AppProvider/useApp';

const CreateDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const user = useUser();
	// const { collections } = useApp();

	const dispatch = useDispatch<AppDispatch>();
	const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleClose = () => setOpen(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name') as string;

		// const result = await collections.animations.insertOne({
		// 	name: 'lily of the valley',
		// 	sunlight: 'full',
		// 	color: 'white',
		// 	type: 'perennial',
		// 	_partition: 'Store 47',
		// });

		setIsLoading(false);

		// try {
		// 	if (formData.get('type') === 'static') {
		// 		await StaticAnimationApi.validateName(name);
		// 	} else {
		// 		await AnimationServiceInstance.validateAnimationName(name);
		// 	}
		// } catch {
		// 	setIsInvalidName(true);
		// } finally {
		// 	setIsLoading(false);
		// }

		// handleClose();

		// await dispatch(createStaticAnimation({ data: formData }));
		// await dispatch(getStaticAnimations());
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				component: 'form',
				sx: { width: '500px' },
				onSubmit: handleSubmit,
			}}
			onClose={handleClose}
		>
			<DialogTitle>Create animation</DialogTitle>
			<CreateDialogContent isInvalidName={isInvalidName} />
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton loading={isLoading} type='submit'>
					Create
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default CreateDialog;
