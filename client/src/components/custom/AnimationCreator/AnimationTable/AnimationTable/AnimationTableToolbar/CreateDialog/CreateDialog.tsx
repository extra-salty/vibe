import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppDispatch } from '@/state/store';
import { createAnimation, getAnimations } from '@/state/features/animation/animationApi';
import { AnimationCreateT } from '@/types/animation.types';
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
	animation,
	open,
	setOpen,
}: {
	animation?: AnimationCreateT;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleClose = () => setOpen(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);

		const name = await AnimationServiceInstance.validateAnimationName(
			formData.get('name') as string,
		);

		if (name.exist) {
			setIsInvalidName(true);
			setIsLoading(false);
		} else {
			handleClose();
			dispatch(createAnimation({ duplicateId: animation?._id, data: formData }));
			dispatch(getAnimations());
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
				sx: { width: '500px' },
			}}
		>
			<DialogTitle>Create animation</DialogTitle>
			<DialogContent
				dividers
				sx={animation && { display: 'flex', flexDirection: 'column', gap: '20px' }}
			>
				{animation && (
					<DialogContentText>Selected animation to duplicate: {animation.name}</DialogContentText>
				)}
				<TextField
					autoFocus
					required
					fullWidth
					defaultValue={animation?.name}
					error={isInvalidName}
					helperText={isInvalidName ? 'Already exist. Choose a different name.' : ' '}
					// margin='dense'
					id='name'
					name='name'
					label='Name'
					type='text'
					variant='outlined'
				/>
				<TextField
					fullWidth
					multiline
					rows={5}
					maxRows={10}
					defaultValue={animation?.description || ''}
					// margin='dense'
					id='description'
					name='description'
					label='Description'
					type='text'
					variant='outlined'
				/>
			</DialogContent>
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
