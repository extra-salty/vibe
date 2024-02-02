'use client';
import useEffectTableHeader from './useEffectTableHeader';
import { useDispatch } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { EffectTableT } from '@/types/effect.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { AddCircleOutline, ContentCopy, DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {
	setStaticEffectsInitialState,
	setStaticEffectsSelection,
} from '@/state/features/animation/animationSlice';
import { useStaticEffectTable } from '@/state/features/animation/animationSelector';
import { GridInitialStateT } from '@/types/animation.types';
import styles from './EffectTable.module.scss';

const EffectTable = ({ initialEffects }: { initialEffects: EffectTableT[] }) => {
	const dispatch = useDispatch();
	const [effects, setEffects] = useState<EffectTableT[]>(initialEffects);

	const header = useEffectTableHeader(effects);
	const grid = useStaticEffectTable();

	const [buttonLoadings, setButtonLoadings] = useState<
		Record<'create' | 'delete' | 'duplicate', boolean>
	>({
		create: false,
		delete: false,
		duplicate: false,
	});

	const handleGetEffects = useCallback(async () => {
		const data = await EffectsServiceInstance.getEffects();

		setEffects(data);
	}, [setEffects]);

	const handleCreateEffect = async () => {
		setButtonLoadings((s) => ({ ...s, create: true }));

		try {
			await EffectServiceInstance.createEffect();

			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => ({ ...s, create: false }));
		}
	};

	const handleDuplicateEffect = async () => {
		setButtonLoadings((s) => ({ ...s, duplicate: true }));

		try {
			// await EffectServiceInstance.duplicateEffect(selectedEffects[0]);

			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => ({ ...s, duplicate: false }));
		}
	};

	const handleDeleteEffects = async () => {
		setButtonLoadings((s) => ({ ...s, delete: true }));

		try {
			await EffectsServiceInstance.deleteEffects(grid.rowSelection);

			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => ({ ...s, delete: false }));
		}
	};

	const actions: LoadingButtonProps[] = [
		{
			children: 'Create',
			startIcon: <AddCircleOutline />,
			loading: buttonLoadings.create,
			onClick: handleCreateEffect,
		},
		{
			children: 'Delete',
			startIcon: <DeleteOutline />,
			loading: buttonLoadings.delete,
			disabled: !grid.rowSelection.length,
			onClick: handleDeleteEffects,
		},
		{
			children: 'Duplicate',
			startIcon: <ContentCopy />,
			loading: buttonLoadings.duplicate,
			disabled: !(grid.rowSelection.length === 1),
			onClick: handleDuplicateEffect,
		},
	];

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
			<DataGrid
				columns={header}
				rows={effects}
				//
				getRowId={(row) => row._id}
				density='compact'
				checkboxSelection
				disableColumnSelector
				// disableRowSelectionOnClick
				hideFooterPagination
				columnVisibilityModel={{
					id: false,
				}}
				//
				// rowSelectionModel={grid.rowSelection}
				initialState={grid.initialState}
				onStateChange={(state) => {
					setStaticEffectsSelection(state.rowSelection);

					const newState: GridInitialStateT = {
						sorting: { sortModel: state.sorting.sortModel },
						filter: { filterModel: state.filter.filterModel },
					};

					if (JSON.stringify(grid.initialState) != JSON.stringify(newState)) {
						dispatch(setStaticEffectsInitialState(newState));
					}
				}}
			/>
		</div>
	);
};

export default memo(EffectTable);

// const firstUpdate = useRef(true);
// useEffect(() => {
// 	if (firstUpdate.current) {
// 		firstUpdate.current = false;
// 	} else {
// 		handleGetEffects();
// 	}
// }, [handleGetEffects]);
