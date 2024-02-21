import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppDispatch } from '@/state/store';
import {
	createAnimation,
	getAnimations,
} from '@/state/features/animations/animationsThunk';
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
import {
	createEffect,
	getEffects,
} from '@/state/features/staticEffects/staticEffectsThunk';
import { AnimationT } from '@/types/animation.types';

const CreateDialog = ({
	type,
	rowParams,
	open,
	setOpen,
}: {
	type: 'staticEffect' | 'animation';
	rowParams?: AnimationT;
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
				await dispatch(createAnimation({ duplicateId: rowParams?._id, data: formData }));
				await dispatch(getAnimations());
			} else {
				await dispatch(createEffect({ duplicateId: rowParams?._id, data: formData }));
				await dispatch(getEffects());
			}
		}

		setIsLoading(false);
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
			</DialogActions>
		</Dialog>
	);
};

export default CreateDialog;
