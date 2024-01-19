'use client';
import useEffectTableData from './useEffectTableData';
import useEffectTableHeader from './useEffectTableHeader';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { removeSelectedEffects } from '@/state/features/animation/animationSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';
import UITable from '@/components/base/UITable/UITable';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';

const EffectTable = ({ initialEffects }: { initialEffects: BaseEffectT[] }) => {
	const dispatch = useDispatch();
	const [effects, setEffects] = useState<BaseEffectT[]>(initialEffects);

	const selectedEffects = useSelectedEffects();
	// const selectedEffects: string[] = [];
	const effectsData = useEffectTableData({ effects });
	const { header, sortOptions, filterOptions } = useEffectTableHeader();

	const [tableOptions, setTableOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name-asc',
		filterOptionValue: 'name',
		filterValue: '',
	});

	const handleGetEffects = useCallback(async () => {
		const data = await EffectsServiceInstance.getEffects(tableOptions);

		setEffects(data);
	}, [setEffects, tableOptions]);

	const handleCreateEffect = async () => {
		try {
			await EffectServiceInstance.createEffect();

			handleGetEffects();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDuplicateEffect = async () => {
		try {
			await EffectServiceInstance.duplicateEffect(selectedEffects[0]);

			// dispatch(removeSelectedEffects(selectedEffects));
			handleGetEffects();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeleteEffects = async () => {
		try {
			await EffectsServiceInstance.deleteEffects(selectedEffects);

			dispatch(removeSelectedEffects(selectedEffects));
			handleGetEffects();
		} catch (e) {
			console.error(e);
		}
	};

	const actions: UIButtonProps[] = [
		{
			text: 'Create',
			icon: Icons.add,
			onClick: handleCreateEffect,
		},
		{
			text: 'Delete',
			icon: Icons.delete,
			onClick: handleDeleteEffects,
			disabled: !selectedEffects.length,
		},
		{
			text: 'Duplicate',
			icon: Icons.duplicate,
			onClick: handleDuplicateEffect,
			disabled: !(selectedEffects.length === 1),
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
			<div className='m-4 text-xl'>Effects</div>
			<UITable
				data={effectsData}
				header={header}
				actions={actions}
				options={{
					sortOptions,
					filterOptions,
					setOptions: setTableOptions,
				}}
			/>
		</div>
	);
};

export default EffectTable;
