import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { FrameStateT } from '@/types/animation.types';
import styles from './FrameCellHistory.module.scss';

const FrameCellHistory = ({
	frame,
	frameIndex,
	isDisabled,
}: {
	frame: FrameStateT;
	frameIndex: number;
	isDisabled: boolean;
}) => {
	const dispatch = useDispatch();

	const buttons: IconButtonProps[] = [
		{
			children: <UndoOutlined />,
			disabled: !frame.undo.length,
			'aria-label': 'Undo',
			onClick: () => {},
			// dispatch(applyUndo(frameIndex))
		},
		{
			children: <RedoOutlined />,
			disabled: !frame.redo.length,
			'aria-label': 'Redo',
			onClick: () => {},
			// dispatch(applyRedo(frameIndex))
		},
	];

	return (
		<div className={styles.wrapper}>
			{buttons.map((props, i) => {
				return (
					<Tooltip key={i} title={props['aria-label']}>
						<span>
							<IconButton disabled={isDisabled} {...props}></IconButton>
						</span>
					</Tooltip>
				);
			})}
		</div>
	);
};

export default FrameCellHistory;
