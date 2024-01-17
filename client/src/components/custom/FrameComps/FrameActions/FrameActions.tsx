import { useSortable } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import { Dispatch, memo, useCallback } from 'react';
import { setFrameDuration } from '@/state/features/effect/effectSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import FrameActionButtons from './FrameActionButtons/FrameActionButtons';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import style from './FrameActions.module.scss';

type FrameActionsProps = {
	frame: StateFrameT;
	frameIndex: number;
	isDisabled: boolean;
	setIsDisabled: Dispatch<boolean>;
};

const FrameActions = ({ frame, frameIndex, isDisabled, setIsDisabled }: FrameActionsProps) => {
	const { isDragging, attributes, listeners, transform, transition } = useSortable({
		id: frameIndex,
	});

	const dispatch = useDispatch();

	const onChangeHandler = useCallback(
		(value: number) => dispatch(setFrameDuration({ frameIndex, value })),
		[dispatch, frameIndex],
	);

	return (
		<div className={style.frameActions}>
			<button {...listeners} {...attributes}>
				<UIIcon name={Icons.drag} width={20} height={20} />
			</button>
			<div className={appendClasses([style.row, style.pagination])}>
				<UIIcon name={Icons.stack} width={15} height={15} />
				<div>{frameIndex + 1}</div>
			</div>
			<FrameActionButtons frame={frame} frameIndex={frameIndex} isDisabled={isDisabled} />
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
