import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AppDispatch } from '@/state/store';
import { AnimationT } from '@/types/animation.types';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import {
	createAnimation,
	getAnimations,
} from '@/state/features/animationGroups/animationsThunk';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DuplicateDialogContent from './DuplicateDialogContent/DuplicateDialogContent';

const DuplicateDialog = ({
	row,
	open,
	setOpen,
}: {
	row: AnimationT;
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

		const nameValidation = await AnimationServiceInstance.validateAnimationName(
			formData.get('name') as string,
		);

		if (nameValidation.exist) {
			setIsInvalidName(true);
		} else {
			handleClose();

			await dispatch(createAnimation({ data: formData }));
			await dispatch(getAnimations());
		}

		setIsLoading(false);
	};

	useEffect(() => {
		setIsInvalidName(false);
	}, []);

	return (
		<Dialog
			open={open}
			PaperProps={{
				component: 'form',
				sx: { width: '500px' },
				onSubmit: handleSubmit,
			}}
		>
			<DialogTitle>Duplicate animation</DialogTitle>
			<DuplicateDialogContent row={row} isInvalidName={isInvalidName} />
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<LoadingButton loading={isLoading} type='submit'>
					<span>Create</span>
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default DuplicateDialog;
