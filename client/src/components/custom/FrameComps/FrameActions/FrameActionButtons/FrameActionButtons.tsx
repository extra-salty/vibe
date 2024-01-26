import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { useFramesLength } from '@/state/features/effect/effectSelector';
import {
	addFrame,
	addToHistory,
	applyRedo,
	applyUndo,
	deleteFrame,
	duplicateFrame,
	resetFrame,
} from '@/state/features/effect/effectSlice';
import {
	AddOutlined,
	ContentCopyOutlined,
	DeleteOutlined,
	RedoOutlined,
	RestartAltOutlined,
	UndoOutlined,
} from '@mui/icons-material';
import { FrameHistoryTypes, FrameStateT } from '@/types/effect.types';
import { IconButton, IconButtonProps } from '@mui/material';
import styles from './FrameActionButtons.module.scss';

const FrameActionButtons = ({
	frameIndex,
	frame,
	isDisabled,
}: {
	frame: FrameStateT;
	frameIndex: number;
	isDisabled: boolean;
}) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();

	const actionButtons = useMemo((): IconButtonProps[] => {
		return [
			{
				children: <UndoOutlined />,
				disabled: !frame.undo.length,
				'aria-label': 'undo',
				onClick: () => dispatch(applyUndo(frameIndex)),
			},
			{
				children: <RedoOutlined />,
				disabled: !frame.redo.length,
				'aria-label': 'redo',
				onClick: () => dispatch(applyRedo(frameIndex)),
			},
			{
				children: <AddOutlined />,
				'aria-label': 'add',
				onClick: () => {
					dispatch(
						addToHistory({
							frameIndex,
							type: FrameHistoryTypes.added,
						}),
					);
					dispatch(addFrame(frameIndex));
				},
			},
			{
				children: <ContentCopyOutlined />,
				'aria-label': 'duplicate',
				onClick: () => {
					dispatch(
						addToHistory({
							frameIndex,
							type: FrameHistoryTypes.added,
						}),
					);
					dispatch(duplicateFrame(frameIndex));
				},
			},
			{
				children: <DeleteOutlined />,
				disabled: framesLength === 1,
				'aria-label': 'delete',
				onClick: () => {
					dispatch(
						addToHistory({
							frameIndex,
							type: FrameHistoryTypes.deleted,
						}),
					);
					dispatch(deleteFrame(frameIndex));
				},
			},
			{
				children: <RestartAltOutlined />,
				'aria-label': 'reset',
				onClick: () => dispatch(resetFrame(frameIndex)),
			},
		];
	}, [dispatch, frame.redo.length, frame.undo.length, frameIndex, framesLength]);

	return (
		<div className={styles.grid}>
			{actionButtons.map((props, i) => {
				return <IconButton disabled={isDisabled} key={i} {...props}></IconButton>;
			})}
		</div>
	);
};

export default FrameActionButtons;
