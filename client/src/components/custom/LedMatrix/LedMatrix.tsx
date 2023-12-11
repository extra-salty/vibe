import { useDispatch, useSelector } from 'react-redux';
import { setLedColorActionType } from '@/state/features/effect/effectSlice.type';
import { setLedColor } from '@/state/features/effect/effectSlice';
import { ColorType } from '@/state/features/attributes/attributeSlice.type';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './LedMatrix.module.scss';
import { RootState } from '@/state/store';

type LedMatrixProps = {
	// frame: ColorType[][];
	// color: ColorType;
};

const LedMatrix = ({}: LedMatrixProps) => {
	const dispatch = useDispatch();

	const onClickHandler = (args: setLedColorActionType) => {
		dispatch(setLedColor(args));
	};

	const { color } = useSelector((state: RootState) => state.attributes);
	const {
		effect: { frames, activeFrame },
	} = useSelector((state: RootState) => state.effectCreator);

	// const newFrame = frames[activeFrame];

	// const color = {
	// 	hue: 100,
	// 	saturation: 100,
	// 	lightness: 100,
	// };

	return (
		<div className={style.ledMatrix}>
			{frames[activeFrame].map((ledColumn: ColorType[], x: number) => {
				return (
					<div key={x} className={style['ledColumn']}>
						{ledColumn.map(({ hue: h, saturation: s, lightness: l }: ColorType, y: number) => {
							const backgroundColor = `hsl(${h} ${s}% ${l}%`;

							return (
								<UIButton
									classes={[style['ledButton']]}
									key={`${x}/${y}`}
									text={`${x}/${y}`}
									style={{ backgroundColor }}
									delay={500}
									onClick={() => onClickHandler({ coordinate: { x, y }, color })}
									onPress={() => onClickHandler({ coordinate: { x, y }, color })}
									onHover={() => onClickHandler({ coordinate: { x, y }, color })}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default LedMatrix;
