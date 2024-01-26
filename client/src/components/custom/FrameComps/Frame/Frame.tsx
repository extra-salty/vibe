import { memo } from 'react';
import { ColorT } from '@/types/color.types';
import FrameCell from '../FrameCell/FrameCell';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import styles from './Frame.module.scss';

const Frame = ({
	frameIndex,
	frameData,
	isDisabled,
	showCoordinate,
}: {
	frameIndex: number;
	frameData: ColorT[][];
	isDisabled: boolean;
	showCoordinate?: boolean;
}) => {
	return (
		<div
			aria-disabled={isDisabled}
			className={appendClasses([styles.matrix, isDisabled && styles.disabled])}
		>
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
