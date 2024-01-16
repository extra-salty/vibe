import { memo } from 'react';
import { ColorT } from '@/state/features/effect/effectSlice.types';
import FrameCell from '../FrameCell/FrameCell';

type FrameProps = {
	frameData: ColorT[][];
	frameIndex: number;
	isDisabled?: boolean;
	showCoordinate?: boolean;
};

const Frame = ({ frameData, frameIndex, isDisabled, showCoordinate }: FrameProps) => {
	return (
		<div
			className={
				'flex p-2 border-solid flex-grow ' + (isDisabled ? 'pointer-events-none' : 'hidden')
			}
		>
			{frameData.map((frameColumn, x) => {
				return (
					<div key={x} className={'flex flex-col-reverse flex-grow'}>
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
