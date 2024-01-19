'use client';
import useAnimationTableData from './useAnimationTableData';
import useAnimationTableHeader from './useAnimationTableHeader';
import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { removeSelectedAnimations } from '@/state/features/animation/animationSlice';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { BaseAnimationT } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UITable from '@/components/base/UITable/UITable';

const AnimationTable = ({ initialAnimations }: { initialAnimations: BaseAnimationT[] }) => {
	const dispatch = useDispatch();
	const [animations, setAnimations] = useState<BaseAnimationT[]>(initialAnimations);

	const selectedAnimations = useSelectedAnimations();
	const animationData = useAnimationTableData({ animations });
	const { header, sortOptions, filterOptions } = useAnimationTableHeader();

	const [tableOptions, setTableOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name-asc',
		filterOptionValue: 'name',
		filterValue: '',
	});

	const handleGetAnimations = useCallback(async () => {
		const data = await AnimationsServiceInstance.getAnimations(tableOptions);

		setAnimations(data);
	}, [setAnimations, tableOptions]);

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
		<div>
			<div className='m-4 text-xl'>Animations</div>
			<UITable
				data={animationData}
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

export default memo(AnimationTable);
