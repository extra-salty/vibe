'use client';
import useEffectTableHeader from './useEffectTableHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EffectTableT } from '@/types/effect.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { AddCircleOutline, ContentCopy, DeleteOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styles from './EffectTable.module.scss';

const EffectTable = ({ initialEffects }: { initialEffects: EffectTableT[] }) => {
	const [effects, setEffects] = useState<EffectTableT[]>(initialEffects);
	const [selectedEffects, setSelectedEffects] = useState<string[]>([]);

	const [buttonLoadings, setButtonLoadings] = useState<
		Record<'create' | 'delete' | 'duplicate', boolean>
	>({
		create: false,
		delete: false,
		duplicate: false,
	});

	const header = useEffectTableHeader(effects);

	const handleGetEffects = useCallback(async () => {
		const data = await EffectsServiceInstance.getEffects();

		setEffects(data);
	}, [setEffects]);

	const handleCreateEffect = async () => {
		setButtonLoadings((s) => ({ ...s, create: true }));

		try {
			await EffectsServiceInstance.createEffect();

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
			console.log('🚀 ~ handleDeleteEffects ~ selectedEffects:', selectedEffects);
			await EffectsServiceInstance.deleteEffects(selectedEffects);

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
			disabled: selectedEffects.length > 0,
			onClick: handleDeleteEffects,
		},
		{
			children: 'Duplicate',
			startIcon: <ContentCopy />,
			loading: buttonLoadings.duplicate,
			disabled: !(selectedEffects.length === 1),
			onClick: handleDuplicateEffect,
		},
	];

	const firstUpdate = useRef(true);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			handleGetEffects();
		}
	}, [handleGetEffects]);

	return (
		<div className={styles.table}>
			<div className={styles.header}>
				<Typography variant='h4'>Effects</Typography>
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
			</div>
			<DataGrid
				columns={header}
				rows={effects}
				//
				density='compact'
				disableColumnSelector
				hideFooterPagination
				columnVisibilityModel={{
					id: false,
				}}
				//
				checkboxSelection
				disableRowSelectionOnClick
				onRowSelectionModelChange={(effect) => setSelectedEffects(effect)}
			/>
		</div>
	);
};

export default EffectTable;
