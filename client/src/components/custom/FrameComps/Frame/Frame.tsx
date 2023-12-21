import { memo } from 'react';
import FrameCell from '../FrameCell/FrameCell';
import { ColorT } from '@/state/features/effect/effectSlice.types';
import style from './Frame.module.scss';

type FrameProps = {
	frameData: ColorT[][];
	frameIndex: number;
};

const Frame = ({ frameData, frameIndex }: FrameProps) => {
	return (
		<div className={style.frame}>
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
