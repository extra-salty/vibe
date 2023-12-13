import { memo, useCallback, useState } from 'react';
import { useFrameDuration, useFramesLength } from '@/state/features/effect/effectSelector';
import { setFrameDuration } from '@/state/features/effect/effectSlice';
import { useDispatch } from 'react-redux';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIControl from '@/components/base/UIControl/UIControl';
import style from './FrameActions.module.scss';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';

type FrameActionsProps = {
	index: number;
	actions: UIButtonProps[];
};

const FrameActions = ({ index, actions }: FrameActionsProps) => {
	const dispatch = useDispatch();
	// const [index, setIndex] = useState<number>(frameIndex);
	const framesLength = useFramesLength();
	const duration = useFrameDuration(index);

	const onChangeHandler = useCallback(
		(value: number) => {
			dispatch(setFrameDuration({ index, value }));
		},
		[dispatch, index],
	);

	const renderActionButton = (props: UIButtonProps) => {
		return <UIButton key={props.text} {...props} />;
	};

	return (
		<div>
			<div className='framePagination'>{`${index + 1}/${framesLength}`}</div>
			<div className={style.frameActionButtons}>{actions.map(renderActionButton)}</div>
			<div className={style.delay}>
				<UIIcon name={Icons.timelapse} />
				<UIControl value={duration} min={0} max={10000} onChange={onChangeHandler} unit='ms' />
			</div>
		</div>
	);
};

export default memo(FrameActions);
