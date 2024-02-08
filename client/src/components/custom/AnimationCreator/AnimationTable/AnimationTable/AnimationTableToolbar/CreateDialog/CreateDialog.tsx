import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { createAnimation, getAnimations } from '@/state/features/animation/animationApi';
import { AppDispatch } from '@/state/store';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const CreateDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleCreateEffect = async () => {
		handleClose();
		dispatch(createAnimation());
		dispatch(getAnimations());
	};

	const handleClose = () => setOpen(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const formData = new FormData(event.currentTarget);
		const formDataObj = Object.fromEntries(formData.entries());

		const names = await AnimationServiceInstance.validateAnimationName(formDataObj.name as string);
		console.log('🚀 ~ handleSubmit ~ names:', names);

		setIsLoading(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
			}}
		>
			<DialogTitle>Create an animation:</DialogTitle>
			<DialogContent dividers>
				<TextField
					autoFocus
					required
					fullWidth
					error={isInvalidName}
					helperText={isInvalidName ? 'Already exist. Choose a different name.' : null}
					margin='dense'
					id='name'
					name='name'
					label='Name'
					type='text'
					variant='standard'
				/>
				<TextField
					fullWidth
					margin='dense'
					id='description'
					name='description'
					label='Description'
					type='text'
					variant='standard'
				/>
			</DialogContent>
			{/* selectEffect to add */}
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton loading={isLoading} type='submit'>
					<span>Create</span>
				</LoadingButton>
				{/* <Button type='submit'>Create</Button> */}
			</DialogActions>
		</Dialog>
	);
};

export default CreateDialog;
