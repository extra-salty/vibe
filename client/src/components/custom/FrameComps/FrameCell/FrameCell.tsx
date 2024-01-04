import { useDispatch } from 'react-redux';
import { memo, useCallback } from 'react';
import { addtoUndo, setFrameCellColor } from '@/state/features/effect/effectSlice';
import { ColorT } from '@/state/features/effect/effectSlice.types';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './FrameCell.module.scss';

type FrameCellProps = {
	color: ColorT;
	frameIndex: number;
	xIndex: number;
	yIndex: number;
	showCoordinate?: boolean;
};

const FrameCell = ({
	color: { hue: h, saturation: s, lightness: l },
	frameIndex,
	showCoordinate,
	xIndex: x,
	yIndex: y,
}: FrameCellProps) => {
	const dispatch = useDispatch();

	const onClickHandler = useCallback(() => {
		const payload = { coordinate: { x, y }, frameIndex };
		dispatch(addtoUndo(payload));
		dispatch(setFrameCellColor(payload));
	}, [dispatch, frameIndex, x, y]);

	return (
		<UIButton
			text={showCoordinate ? `${x}/${y}` : undefined}
			styles={{ backgroundColor: `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} ` }}
			classes={[style.frameCell]}
			onClick={onClickHandler}
			// onPress={() => {console.log('asd')}}
			onHover={onClickHandler}
			onPress={() => {}}
		/>
	);
};

export default memo(FrameCell);
