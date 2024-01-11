import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { removeSelectedAnimations } from '@/state/features/animation/animationSlice';
import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { UITableOptionsValueT } from '@/components/base/UITableOptions/UITableOptions';
import { AnimationT } from '@/state/features/animation/animation.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';

const AnimationTableActions = ({
	tableOptions,
	setAnimations,
}: {
	tableOptions: UITableOptionsValueT;
	setAnimations: React.Dispatch<React.SetStateAction<AnimationT[]>>;
}) => {
	const dispatch = useDispatch();
	const selectedAnimations = useSelectedAnimations();

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

	const actionButtons: UIButtonProps[] = [
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
		{
			text: 'Select All ',
			onClick: () => {},
			disabled: true,
		},
	];

	useEffect(() => {
		handleGetAnimations();
	}, [handleGetAnimations]);

	return (
		<div>
			{actionButtons.map((props, i) => (
				<UIButton key={i} {...props} />
			))}
		</div>
	);
};

export default AnimationTableActions;
