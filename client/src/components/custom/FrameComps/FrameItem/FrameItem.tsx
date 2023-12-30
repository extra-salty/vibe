import { memo, useState } from 'react';
import { StateFrameT } from '@/state/features/effect/effectSlice.types';
import FrameActions from '../FrameActions/FrameActions';
import Frame from '../Frame/Frame';
import style from './FrameItem.module.scss';

type FrameItemProps = {
	frame: StateFrameT;
	frameIndex: number;
};

const FrameItem = ({ frame, frameIndex }: FrameItemProps) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	return (
		<div className={style.frameItem}>
			<FrameActions
				frame={frame}
				frameIndex={frameIndex}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
			/>
			<Frame frameIndex={frameIndex} frameData={frame.data} isDisabled={isDisabled} />
		</div>
	);
};

export default memo(FrameItem);
