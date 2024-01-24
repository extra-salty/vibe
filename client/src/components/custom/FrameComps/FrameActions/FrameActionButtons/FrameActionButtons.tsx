import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import {
	addFrame,
	applyRedo,
	applyUndo,
	deleteFrame,
	duplicateFrame,
	resetFrame,
} from '@/state/features/effect/effectSlice';
import { FrameStateT } from '@/types/effect.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import styles from './FrameActionButtons.module.scss';

const FrameActionButtons = ({
	frame,
	frameIndex,
	isDisabled,
}: {
	frame: FrameStateT;
	frameIndex: number;
	isDisabled: boolean;
}) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();

	const actionButtons = useMemo((): UIButtonProps[][] => {
		return [
			[
				{
					icon: Icons.undo,
					onClick: () => dispatch(applyUndo({ frameIndex: frameIndex })),
					disabled: !frame.undo.length,
				},
				{
					icon: Icons.redo,
					onClick: () => dispatch(applyRedo({ frameIndex: frameIndex })),
					disabled: !frame.redo.length,
				},
			],
			[
				{
					icon: Icons.add,
					onClick: () => dispatch(addFrame()),
				},
				{
					icon: Icons.duplicate,
					onClick: () => dispatch(duplicateFrame({ frameIndex })),
				},
			],
			[
				{
					icon: Icons.delete,
					onClick: () => dispatch(deleteFrame({ frameIndex })),
					disabled: isDisabled || framesLength === 1,
				},
				{
					icon: Icons.restart,
					onClick: () => dispatch(resetFrame({ frameIndex })),
					disabled: isDisabled,
				},
			],
		];
	}, [dispatch, frame.redo.length, frame.undo.length, frameIndex, framesLength, isDisabled]);

	return (
		<div className={styles.column}>
			{actionButtons.map((buttonRow, i) => {
				return (
					<div key={i} className={styles.row}>
						{buttonRow.map((props, j: number) => {
							return <UIButton key={`${i}/${j}`} {...props} hasBorder={false} />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default FrameActionButtons;
