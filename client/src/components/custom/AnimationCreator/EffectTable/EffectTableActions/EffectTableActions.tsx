import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { removeSelectedEffects } from '@/state/features/animation/animationSlice';
import { EffectServiceInstance } from '@/app/api/effect/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { UITableOptionsValueT } from '@/components/base/UITableOptions/UITableOptions';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';

const EffectTableActions = ({
	tableOptions,
	setEffects,
}: {
	tableOptions: UITableOptionsValueT;
	setEffects: React.Dispatch<React.SetStateAction<BaseEffectT[]>>;
}) => {
	const dispatch = useDispatch();
	const selectedEffects = useSelectedEffects();

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

	const actionButtons: UIButtonProps[] = [
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
		{
			text: 'Select All ',
			onClick: () => {},
			disabled: true,
		},
	];

	useEffect(() => {
		handleGetEffects();
	}, [handleGetEffects]);

	return (
		<div>
			{actionButtons.map((props, i) => (
				<UIButton key={i} {...props} />
			))}
		</div>
	);
};

export default EffectTableActions;
