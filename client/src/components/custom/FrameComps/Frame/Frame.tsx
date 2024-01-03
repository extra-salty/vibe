import { memo } from 'react';
import { ColorT } from '@/state/features/effect/effectSlice.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import FrameCell from '../FrameCell/FrameCell';
import style from './Frame.module.scss';

type FrameProps = {
	frameData: ColorT[][];
	frameIndex: number;
	isDisabled?: boolean;
};

const Frame = ({ frameData, frameIndex, isDisabled }: FrameProps) => {
	const classNames = appendClasses([style.frame, isDisabled && 'disabled']);

	return (
		<div className={classNames}>
			{frameData.map((frameColumn, x) => {
				return (
					<div key={x} className={style.frameColumn}>
						{frameColumn.map((color, y) => {
							return (
								<FrameCell
									key={`${x}/${y}`}
									color={color}
									xIndex={x}
									yIndex={y}
									frameIndex={frameIndex}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default memo(Frame);
