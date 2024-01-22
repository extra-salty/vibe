'use client';
import useEffectTableData from './useEffectTableData';
import useEffectTableHeader from './useEffectTableHeader';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { removeSelectedEffects } from '@/state/features/animation/animationSlice';
import { EffectTableT } from '@/types/effect.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { SortDirection, UITableOptionsValueT } from '@/components/base/UITable/UITable.types';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { AddCircleOutline, ContentCopy, DeleteOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import UITable from '@/components/base/UITable/UITable';
import styles from './EffectTable.module.scss';

const EffectTable = ({ initialEffects }: { initialEffects: EffectTableT[] }) => {
	const dispatch = useDispatch();

	const [effects, setEffects] = useState<EffectTableT[]>(initialEffects);
	const [buttonLoadings, setButtonLoadings] = useState<
		Record<'create' | 'delete' | 'duplicate', boolean>
	>({
		create: false,
		delete: false,
		duplicate: false,
	});
	const [selectedOptions, setSelectedOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name',
		sortDirection: SortDirection.asc,
		filterOptionValue: 'name',
		filterValue: '',
	});

	const effectNames = effects.map((effect) => effect.name);
	const header = useEffectTableHeader({ effectNames });
	const selectedEffects = useSelectedEffects();
	const data = useEffectTableData({ effects, selectedEffects });

	const handleGetEffects = useCallback(async () => {
		const data = await EffectsServiceInstance.getEffects(selectedOptions);

		setEffects(data);
	}, [setEffects, selectedOptions]);

	const handleCreateEffect = async () => {
		setButtonLoadings((s) => {
			return { ...s, create: true };
		});

		try {
			await EffectServiceInstance.createEffect();

			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => {
				return { ...s, create: false };
			});
		}
	};

	const handleDuplicateEffect = async () => {
		setButtonLoadings((s) => {
			return { ...s, duplicate: true };
		});

		try {
			await EffectServiceInstance.duplicateEffect(selectedEffects[0]);

			// dispatch(removeSelectedEffects(selectedEffects));
			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => {
				return { ...s, duplicate: false };
			});
		}
	};

	const handleDeleteEffects = async () => {
		setButtonLoadings((s) => {
			return { ...s, delete: true };
		});

		try {
			await EffectsServiceInstance.deleteEffects(selectedEffects);

			dispatch(removeSelectedEffects(selectedEffects));
			handleGetEffects();
		} catch (e) {
			console.error(e);
		} finally {
			setButtonLoadings((s) => {
				return { ...s, delete: false };
			});
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
			disabled: !selectedEffects.length,
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
		<div>
			<div className={styles.header}>
				<div className={styles.text}>
					<Typography variant='h4'>Effects</Typography>
				</div>
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
			<div className={styles.table}>
				<UITable
					data={data}
					header={header}
					options={{
						selectedOptions,
						setSelectedOptions,
					}}
				/>
			</div>
		</div>
	);
};

export default EffectTable;
