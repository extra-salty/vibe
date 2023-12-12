import { useDispatch } from 'react-redux';
import { FrameT, setLedColorActionT } from '@/state/features/effect/effectSlice.type';
import { ColorType } from '@/state/features/attributes/attributeSlice.type';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './Frame.module.scss';
import { memo, useCallback } from 'react';
import { setLedColor } from '@/state/features/effect/effectSlice';

type Frame = {
	frame: FrameT;
	frameIndex: number;
	color?: ColorType;
};

const Frame = ({ frame, frameIndex }: Frame) => {
	const dispatch = useDispatch();

	const onClickHandler = useCallback(
		(args: setLedColorActionT) => {
			dispatch(setLedColor(args));
		},
		[dispatch],
	);

	return (
		<div className={style.frame}>
			{frame.map((ledColumn, x) => {
				return (
					<div key={x} className={style['ledColumn']}>
						{ledColumn.map(({ hue: h, saturation: s, lightness: l }, y) => {
							return (
								<UIButton
									classes={[style['ledButton']]}
									key={`${x}/${y}`}
									// text={`${x}/${y}`}
									styles={{ backgroundColor: `hsl(${h} ${s}% ${l}%` }}
									// delay={500}
									onClick={() =>
										onClickHandler({
											coordinate: { x, y },
											frameIndex,
										})
									}
									// onHover={onClickHandler({ coordinate: { x, y }, color, frameIndex })}
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
