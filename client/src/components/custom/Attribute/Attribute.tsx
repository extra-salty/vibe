import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useSelectedColor } from '@/state/features/effect/effectSelector';
import { useBackgroundColor } from './useBackgroundColor';
import { setHue, setLightness, setSaturation } from '@/state/features/effect/effectSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { AttributeType, Attributes, Units } from './Attribute.type';
import AttributeSlider from '../AttributeSlider/AttributeSlider';
import style from './Attribute.module.scss';

const Attribute = () => {
	const dispatch = useDispatch();
	const color = useSelectedColor();
	const { hue, saturation, lightness } = color;

	const onChangeHandler = useCallback(
		(action: any) => {
			const fn = (value: number) => dispatch(action(value));
			return fn;
		},
		[dispatch],
	);

	const onChangeHandlerAsd = useCallback(
		(value: number) => {
			dispatch(setHue(value));
		},
		[dispatch],
	);

	const attributesSliders: AttributeType[] = [
		{
			label: Attributes.hue,
			value: hue,
			max: 360,
			unit: Units.degree,
			icon: Icons.palette,
			styles: { background: useBackgroundColor(color, Attributes.hue) },
			// onChange: (value: number) => dispatch(setHue(value)),
			// onChange: onChangeHandler(setHue),
			onChange: onChangeHandlerAsd,
		},
		{
			label: Attributes.saturation,
			value: saturation,
			max: 100,
			unit: Units.percentage,
			icon: Icons.gradient,
			styles: { background: useBackgroundColor(color, Attributes.saturation) },
			onChange: (value: number) => dispatch(setSaturation(value)),
		},
		{
			label: Attributes.lightness,
			value: lightness,
			unit: Units.percentage,
			max: 100,
			icon: Icons.brightness,
			styles: { background: useBackgroundColor(color, Attributes.lightness) },
			onChange: (value: number) => dispatch(setLightness(value)),
		},
	];

	return (
		<div className={style.attributes}>
			{attributesSliders.map((attributeProps, i) => {
				return <AttributeSlider key={i} {...attributeProps} />;
			})}
		</div>
	);
};

export default Attribute;
