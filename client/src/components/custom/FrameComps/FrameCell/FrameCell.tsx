import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo } from 'react';
import { addtoUndo, setFrameCellColor } from '@/state/features/effect/effectSlice';
import { ColorT } from '@/types/color.types';
import styles from './FrameCell.module.scss';

const FrameCell = ({
	color: { hue: h, saturation: s, lightness: l },
	frameIndex,
	showCoordinate,
	xIndex: x,
	yIndex: y,
}: {
	color: ColorT;
	frameIndex: number;
	xIndex: number;
	yIndex: number;
	showCoordinate?: boolean;
}) => {
	const dispatch = useDispatch();

	const onClickHandler = useCallback(() => {
		const payload = { coordinate: { x, y }, frameIndex };
		dispatch(addtoUndo(payload));
		dispatch(setFrameCellColor(payload));
	}, [dispatch, frameIndex, x, y]);

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		e.buttons === 1 && onClickHandler();
	};

	return (
		<button
			className={styles.frameCell}
			// text={showCoordinate ? `${x}/${y}` : undefined}
			style={{ backgroundColor: `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} ` }}
			onClick={onClickHandler}
			onMouseOver={handleMouseOver}
			// onPress={() => {console.log('asd')}}
		></button>
	);
};

export default memo(FrameCell);
