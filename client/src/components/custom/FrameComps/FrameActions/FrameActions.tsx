import { Dispatch, memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import {
	addFrame,
	applyRedo,
	applyUndo,
	deleteFrame,
	duplicateFrame,
	resetFrame,
	setFrameDuration,
} from '@/state/features/effect/effectSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import style from './FrameActions.module.scss';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';

type FrameActionsProps = {
	frame: StateFrameT;
	frameIndex: number;
	isDisabled: boolean;
	setIsDisabled: Dispatch<boolean>;
};

const FrameActions = ({ frame, frameIndex, isDisabled, setIsDisabled }: FrameActionsProps) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();

	const onChangeHandler = useCallback(
		(value: number) => dispatch(setFrameDuration({ frameIndex, value })),
		[dispatch, frameIndex],
	);

	const frameActionButtons = useMemo((): UIButtonProps[][] => {
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

	const renderActionButtons = (buttonRow: UIButtonProps[], i: number) => {
		return (
			<div className={style.row}>
				{buttonRow.map((props, j: number) => {
					return <UIButton key={`${i}/${j}`} {...props} hasBorder={false} />;
				})}
			</div>
		);
	};

	const handleFrameMove = () => {};

	return (
		<div className={style.frameActions}>
			<div className={appendClasses([style.row, style.pagination])}>
				<UIIcon name={Icons.stack} width={15} height={15} />
				<UIControl onChange={handleFrameMove} max={framesLength} value={frameIndex + 1} />
				<div>{`/ ${framesLength}`}</div>
			</div>
			<div className={style.actionButtons}>{frameActionButtons.map(renderActionButtons)}</div>
			<div className={style.row}>
				{/* <UIIcon name={Icons.timelapse} width={15} height={15} /> */}
				<UIControl
					value={frame.duration}
					min={0}
					max={10000}
					onChange={onChangeHandler}
					unit='ms'
				/>
			</div>
		</div>
	);
};

export default memo(FrameActions);
