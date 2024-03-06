import { useSelectedColor } from '@/state/features/color/colorSelector';
import { useDispatch } from 'react-redux';
import { Attributes, Units } from './Attribute.type';
import { SliderProps, Tooltip } from '@mui/material';
import { Brightness6, Gradient, Palette } from '@mui/icons-material';
import { ReactElement } from 'react';
import { colorActions } from '@/state/features/color/colorSlice';
import ColorSlider from './ColorSlider';
import NumberInput from '@/components/misc/NumberInput/NumberInput';
import styles from './Attribute.module.scss';

const Attribute = () => {
	const dispatch = useDispatch();
	const color = useSelectedColor();
	const { hue, saturation, lightness } = color;

	const attributes: {
		slider: SliderProps;
		icon: ReactElement<any, any>;
		id: Attributes;
		unit: string;
	}[] = [
		{
			slider: {
				value: hue,
				max: 360,
				onChange: (event: Event, value: number | number[]) =>
					dispatch(colorActions.setHue(Number(value))),
			},
			id: Attributes.hue,
			icon: <Palette />,
			unit: Units.degree,
		},
		{
			slider: {
				value: saturation,
				max: 100,
				onChange: (event: Event, value: number | number[]) =>
					dispatch(colorActions.setSaturation(Number(value))),
			},
			id: Attributes.saturation,
			icon: <Gradient />,
			unit: Units.percentage,
		},
		{
			slider: {
				value: lightness,
				max: 100,
				onChange: (event: Event, value: number | number[]) =>
					dispatch(colorActions.setLightness(Number(value))),
			},
			id: Attributes.lightness,
			icon: <Brightness6 />,
			unit: Units.percentage,
		},
	];

	return (
		<div className={styles.color}>
			{attributes.map(({ slider, icon, id, unit }, i) => {
				return (
					<div key={i} className={styles.slider}>
						<Tooltip title={id[0].toUpperCase() + id.substring(1)} arrow>
							{icon}
						</Tooltip>
						<ColorSlider sliderProps={slider} color={color} id={id} />
						{slider.value}
						{unit}
					</div>
				);
			})}
		</div>
	);
};

export default Attribute;
