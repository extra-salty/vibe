import { memo } from 'react';
import { useFrame } from '@/state/features/effect/effectSelector';
import FrameCell from './FrameCell/FrameCell';
import style from './Frame.module.scss';

const Frame = ({ index }: { index: number }) => {
	const frame = useFrame(index);

	// disabled

	return (
		<div className={style.frame}>
			{frame.data.map((frameColumn, x) => {
				return (
					<div key={x} className={style.frameColumn}>
						{frameColumn.map((color, y) => {
							return (
								<FrameCell
									key={`${x}/${y}`}
									color={color}
									xIndex={x}
									yIndex={y}
									frameIndex={index}
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
