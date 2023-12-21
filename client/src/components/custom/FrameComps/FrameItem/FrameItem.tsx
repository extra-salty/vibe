import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import { RootState } from '@/state/store';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import {
	addFrame,
	deleteFrame,
	duplicateFrame,
	resetFrame,
	applyUndo,
	applyRedo,
} from '@/state/features/effect/effectSlice';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import FrameActions from '../FrameActions/FrameActions';
import Frame from '../Frame/Frame';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import style from './FrameItem.module.scss';

type FrameItemProps = {
	frame: StateFrameT;
	frameIndex: number;
};

const FrameItem = ({ frame, frameIndex }: FrameItemProps) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();
	const undoLength = useSelector(
		(state: RootState) => state.effectCreator.effect.frames[frameIndex].undo.length,
	);
	const redoLength = useSelector(
		(state: RootState) => state.effectCreator.effect.frames[frameIndex].redo.length,
	);

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const frameActions = useMemo((): UIButtonProps[] => {
		return [
			{
				icon: Icons.restart,
				onClick: () => dispatch(resetFrame({ frameIndex })),
				disabled: isDisabled,
			},
			{
				icon: Icons.add,
				onClick: () => dispatch(addFrame()),
			},
			{
				icon: Icons.duplicate,
				onClick: () => dispatch(duplicateFrame({ frameIndex })),
			},
			{
				icon: Icons.delete,
				onClick: () => dispatch(deleteFrame({ frameIndex })),
				disabled: isDisabled || framesLength === 1,
			},
			{
				icon: Icons.undo,
				onClick: () => dispatch(applyUndo({ frameIndex: frameIndex })),
				disabled: !undoLength,
			},
			{
				icon: Icons.redo,
				onClick: () => dispatch(applyRedo({ frameIndex: frameIndex })),
				disabled: !redoLength,
			},
		];
	}, [dispatch, frameIndex, framesLength, isDisabled, redoLength, undoLength]);

	return (
		<div className={style.frameItem}>
			<FrameActions frameIndex={frameIndex} actions={frameActions} />
			<Frame frameIndex={frameIndex} frameData={frame.data} />
		</div>
	);
};

export default memo(FrameItem);
