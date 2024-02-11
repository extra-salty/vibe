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
import { EffectServiceInstance } from '@/app/api/effect/_service';

const CreateDialog = ({
	type,
	rowParams,
	open,
	setOpen,
}: {
	type: 'staticEffect' | 'animation';
	rowParams?: AnimationCreateT;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const typeText = type === 'animation' ? 'animation' : 'static effect';

	const handleClose = () => setOpen(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		let nameValidation = null;
		const formData = new FormData(event.currentTarget);

		if (type === 'animation') {
			nameValidation = await AnimationServiceInstance.validateAnimationName(
				formData.get('name') as string,
			);
		} else {
			nameValidation = await EffectServiceInstance.validateEffectName(
				formData.get('name') as string,
			);
		}

		if (nameValidation.exist) {
			setIsInvalidName(true);
		} else {
			handleClose();

			if (type === 'animation') {
				dispatch(createAnimation({ duplicateId: rowParams?._id, data: formData }));
				dispatch(getAnimations());
			} else {
				dispatch(createAnimation({ duplicateId: rowParams?._id, data: formData }));
				dispatch(getAnimations());
			}
		}

		setIsLoading(false);
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
			<DialogTitle>Create {typeText}</DialogTitle>
			<DialogContent
				dividers
				sx={rowParams && { display: 'flex', flexDirection: 'column', gap: '20px' }}
			>
				{rowParams && (
					<DialogContentText>
						Selected {typeText} to duplicate: {rowParams.name}
					</DialogContentText>
				)}
				<TextField
					required
					fullWidth
					defaultValue={rowParams?.name}
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
					defaultValue={rowParams?.description || ''}
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
