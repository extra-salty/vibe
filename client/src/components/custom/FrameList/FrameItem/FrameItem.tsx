import { memo, useMemo, useState } from 'react';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { useDispatch } from 'react-redux';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import { Actions } from '@/state/features/effect/effectSlice.enum';
import {
	addFrame,
	deleteFrame,
	duplicateFrame,
	resetFrame,
} from '@/state/features/effect/effectSlice';
import FrameActions from './FrameActions/FrameActions';
import Frame from '../../Frame/Frame';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import style from './FrameItem.module.scss';

const FrameItem = ({ index }: { index: number }) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const frameActions = useMemo((): UIButtonProps[] => {
		return [
			{
				icon: Icons.restart,
				onClick: () => dispatch(resetFrame({ index })),
				disabled: isDisabled,
			},
			{
				icon: Icons.add,
				onClick: () => dispatch(addFrame()),
			},
			{
				icon: Icons.duplicate,
				onClick: () => dispatch(duplicateFrame({ index })),
			},
			{
				icon: Icons.delete,
				onClick: () => dispatch(deleteFrame({ index })),
				disabled: isDisabled || framesLength === 1,
			},
			{
				icon: Icons.lock,
				activeIcon: Icons.unlock,
				onClick: () => setIsDisabled((s) => !s),
			},
		];
	}, [dispatch, framesLength, index, isDisabled]);

	return (
		<div className={style.frameItem}>
			<FrameActions index={index} actions={frameActions} />
			<Frame index={index} />
		</div>
	);
};

export default memo(FrameItem);
