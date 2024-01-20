'use client';
import useAnimationTableData from './useAnimationTableData';
import useAnimationTableHeader from './useAnimationTableHeader';
import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { removeSelectedAnimations } from '@/state/features/animation/animationSlice';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AnimationBaseT } from '@/types/animation.types';
import { SortDirection, UITableOptionsValueT } from '@/components/base/UITable/UITable.types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UITable from '@/components/base/UITable/UITable';
import UIButton from '@/components/base/UIButton/UIButton';
import styles from './AnimationTable.module.scss';

const AnimationTable = ({ initialAnimations }: { initialAnimations: AnimationBaseT[] }) => {
	const dispatch = useDispatch();

	const [animations, setAnimations] = useState<AnimationBaseT[]>(initialAnimations);
	const [selectedOptions, setSelectedOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name',
		sortDirection: SortDirection.des,
		filterOptionValue: 'name',
		filterValue: '',
	});

	const animationNames = animations.map((animation) => animation.name);
	const header = useAnimationTableHeader({ animationNames });
	const selectedAnimations = useSelectedAnimations();
	const data = useAnimationTableData({ animations, selectedAnimations });

	const handleGetAnimations = useCallback(async () => {
		const data = await AnimationsServiceInstance.getAnimations(selectedOptions);

		setAnimations(data);
	}, [setAnimations, selectedOptions]);

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
			await AnimationServiceInstance.duplicateAnimation(selectedAnimations[0]);

			// dispatch(removeSelectedAnimations(selectedAnimations));
			handleGetAnimations();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeleteEffects = async () => {
		try {
			await AnimationsServiceInstance.deleteAnimations(selectedAnimations);

			dispatch(removeSelectedAnimations(selectedAnimations));
			handleGetAnimations();
		} catch (e) {
			console.error(e);
		}
	};

	const actions: UIButtonProps[] = [
		{
			text: 'Create',
			icon: Icons.add,
			onClick: handleCreateAnimation,
		},
		{
			text: 'Delete',
			icon: Icons.delete,
			onClick: handleDeleteEffects,
			disabled: !selectedAnimations.length,
		},
		{
			text: 'Duplicate',
			icon: Icons.duplicate,
			onClick: handleDuplicateAnimation,
			disabled: !(selectedAnimations.length === 1),
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
		<div className={styles.animationTable}>
			<div className={styles.header}>
				<div className={styles.text}>Animations</div>
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

export default memo(AnimationTable);
