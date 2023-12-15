import { memo, useCallback } from 'react';
import { useFrameDuration, useFramesLength } from '@/state/features/effect/effectSelector';
import { setFrameDuration } from '@/state/features/effect/effectSlice';
import { useDispatch } from 'react-redux';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIControl from '@/components/base/UIControl/UIControl';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import style from './FrameActions.module.scss';

type FrameActionsProps = {
	frameIndex: number;
	actions: UIButtonProps[];
};

const FrameActions = ({ frameIndex, actions }: FrameActionsProps) => {
	const dispatch = useDispatch();
	const framesLength = useFramesLength();
	const duration = useFrameDuration(frameIndex);

	const onChangeHandler = useCallback(
		(value: number) => {
			dispatch(setFrameDuration({ frameIndex, value }));
		},
		[dispatch, frameIndex],
	);

	const renderActionButton = (props: UIButtonProps) => {
		return <UIButton key={props.text} {...props} />;
	};

	return (
		<div>
			<div className={style.framePagination}>{`${frameIndex + 1}/${framesLength}`}</div>
			<div className={style.frameActionButtons}>{actions.map(renderActionButton)}</div>
			<div className={style.delay}>
				<UIIcon name={Icons.timelapse} />
				<UIControl value={duration} min={0} max={10000} onChange={onChangeHandler} />
			</div>
			{/* <UICheckbox /> */}
		</div>
	);
};

export default memo(FrameActions);
