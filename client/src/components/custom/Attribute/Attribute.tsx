'use client';
import { useDispatch } from 'react-redux';
import { useSelectedColor } from '@/state/features/effect/effectSelector';
import { setHue, setLightness, setSaturation } from '@/state/features/effect/effectSlice';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { Attributes, Units } from './Attribute.type';
import { SliderProps } from '@mui/material';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import ColorSlider from './ColorSlider';
import { Unstable_NumberInput as NumberInput } from '@mui/base';
import styles from './Attribute.module.scss';

const Attribute = () => {
	const dispatch = useDispatch();
	const color = useSelectedColor();
	const { hue, saturation, lightness } = color;

	const attributes: { slider: SliderProps; icon: Icons; id: Attributes }[] = [
		{
			slider: {
				value: hue,
				max: 360,
				onChange: (event: Event, value: number | number[]) => dispatch(setHue(Number(value))),
			},
			id: Attributes.hue,
			icon: Icons.palette,
			// unit: Units.degree,
		},
		{
			slider: {
				value: saturation,
				max: 100,
				onChange: (event: Event, value: number | number[]) =>
					dispatch(setSaturation(Number(value))),
			},
			id: Attributes.saturation,
			icon: Icons.gradient,
			// unit: Units.percentage,
		},
		{
			slider: {
				value: lightness,
				max: 100,
				onChange: (event: Event, value: number | number[]) => dispatch(setLightness(Number(value))),
			},
			id: Attributes.lightness,
			icon: Icons.brightness,
			// unit: Units.percentage,
		},
	];

	return (
		<div className={styles.color}>
			{attributes.map(({ slider, icon, id }) => {
				return (
					<div key={slider.id} className={styles.slider}>
						<UIIcon name={icon} />
						<ColorSlider sliderProps={slider} color={color} id={id} />
						{/* <NumberInput /> */}
					</div>
				);
			})}
		</div>
	);
};

export default Attribute;
