import { memo } from 'react';
import { ColorT } from '@/state/features/effect/effectSlice.types';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import FrameCell from '../FrameCell/FrameCell';
import style from './Frame.module.scss';

type FrameProps = {
	frameData: ColorT[][];
	frameIndex: number;
	isDisabled?: boolean;
	showCoordinate?: boolean;
};

const Frame = ({ frameData, frameIndex, isDisabled, showCoordinate }: FrameProps) => {
	return (
		<div className={appendClasses([style.frame, isDisabled && 'disabled'])}>
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
									showCoordinate={showCoordinate}
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
