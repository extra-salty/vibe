'use client';
import useEffectTableData from './useEffectTableData';
import useEffectTableHeader from './useEffectTableHeader';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { removeSelectedEffects } from '@/state/features/animation/animationSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { EffectTableT } from '@/types/effect.types';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { SortDirection, UITableOptionsValueT } from '@/components/base/UITable/UITable.types';
import UITable from '@/components/base/UITable/UITable';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import styles from './EffectTable.module.scss';

const EffectTable = ({ initialEffects }: { initialEffects: EffectTableT[] }) => {
	const dispatch = useDispatch();

	const [effects, setEffects] = useState<EffectTableT[]>(initialEffects);
	const [selectedOptions, setSelectedOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name',
		sortDirection: SortDirection.des,
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
			<div className={styles.header}>
				<div className={styles.text}>Effects</div>
				<div className={styles.buttons}>
					{actions.map((props, i) => (
						<UIButton key={i} {...props} />
					))}
				</div>
			</div>
			<div className={styles.table}>
				<UITable
					data={data}
					header={header}
					actions={actions}
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
