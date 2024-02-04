'use client';
import useAnimationTableHeader from './useAnimationTableHeader';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationBaseT } from '@/types/animation.types';
import { DataGrid } from '@mui/x-data-grid';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { AddCircleOutline, ContentCopy, DeleteOutline } from '@mui/icons-material';
import styles from './AnimationTable.module.scss';
import { useDispatch } from 'react-redux';

const AnimationTable = ({ initialAnimations }: { initialAnimations: AnimationBaseT[] }) => {
	const dispatch = useDispatch();
	const [animations, setAnimations] = useState<AnimationBaseT[]>(initialAnimations);

	const header = useAnimationTableHeader();
	const grid = useStaticEffectTable();

	const handleGetAnimations = useCallback(async () => {
		const data = await AnimationsServiceInstance.getAnimations();

		setAnimations(data);
	}, [setAnimations]);

	const handleCreateAnimation = async () => {
		try {
			await AnimationServiceInstance.createAnimation();

			handleGetAnimations();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDuplicateAnimation = async () => {
		try {
			// await AnimationServiceInstance.duplicateAnimation(selectedAnimations[0]);

			// dispatch(removeSelectedAnimations(selectedAnimations));
			handleGetAnimations();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeleteEffects = async () => {
		try {
			// await AnimationsServiceInstance.deleteAnimations(selectedAnimations);

			// dispatch(removeSelectedAnimations(selectedAnimations));
			handleGetAnimations();
		} catch (e) {
			console.error(e);
		}
	};

	const actions: LoadingButtonProps[] = [
		{
			children: 'Create',
			startIcon: <AddCircleOutline />,
			loading: buttonLoadings.create,
			onClick: handleCreateAnimation,
		},
		{
			children: 'Delete',
			startIcon: <DeleteOutline />,
			loading: buttonLoadings.delete,
			onClick: handleDeleteEffects,
			// disabled: !selectedAnimations.length,
		},
		{
			children: 'Duplicate',
			startIcon: <ContentCopy />,
			loading: buttonLoadings.duplicate,
			onClick: handleDuplicateAnimation,
			// disabled: !(selectedAnimations.length === 1),
		},
	];

	const firstUpdate = useRef(true);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			handleGetAnimations();
		}
	}, [handleGetAnimations]);

	return (
		<div className={styles.table}>
			<div className={styles.buttons}>
				{actions.map((props, i) => (
					<LoadingButton
						key={i}
						size='small'
						color='primary'
						variant='contained'
						loadingPosition='start'
						{...props}
					/>
				))}
			</div>
			<div className={styles.dataGrid}>
				<DataGrid
					columns={header}
					rows={animations}
					getRowId={(row) => row._id}
					// slots={
					// noRowsOverlay: CustomNoRowsOverlay,
					// }
					//
					density='compact'
					disableColumnSelector
					hideFooterPagination
					columnVisibilityModel={{
						id: false,
					}}
					loading={false}
					//
					checkboxSelection
					disableRowSelectionOnClick
					// rowSelectionModel={selectedEffects}
					// onRowSelectionModelChange={(effects) =>
					// 	setSelectedEffects(effects.map((effect) => effect as string))
					// }
				/>
			</div>
		</div>
	);
};

export default memo(AnimationTable);
