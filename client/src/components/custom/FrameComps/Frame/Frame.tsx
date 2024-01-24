import { memo } from 'react';
import { ColorT } from '@/types/color.types';
import FrameCell from '../FrameCell/FrameCell';
import styles from './Frame.module.scss';

const Frame = ({
	frameData,
	frameIndex,
	isDisabled,
	showCoordinate,
}: {
	frameData: ColorT[][];
	frameIndex: number;
	isDisabled?: boolean;
	showCoordinate?: boolean;
}) => {
	return (
		<div className={styles.matrix}>
			{frameData.map((frameColumn, x) => {
				return (
					<div key={x} className={styles.column}>
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
