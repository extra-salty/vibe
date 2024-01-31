'use client';
import { useDispatch } from 'react-redux';
import { useSelectedColor } from '@/state/features/effect/effectSelector';
import { setHue, setLightness, setSaturation } from '@/state/features/effect/effectSlice';
import { Attributes, Units } from './Attribute.type';
import { Container, SliderProps, Tooltip } from '@mui/material';
import { Box } from '@mui/material';
import { Brightness6Outlined, GradientOutlined, PaletteOutlined } from '@mui/icons-material';
import { ReactElement } from 'react';
import ColorSlider from './ColorSlider';
import styles from './Attribute.module.scss';
import NumberInput from '@/components/base/NumberInput/NumberInput';

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
				onChange: (event: Event, value: number | number[]) => dispatch(setHue(Number(value))),
			},
			id: Attributes.hue,
			icon: <PaletteOutlined />,
			unit: Units.degree,
		},
		{
			slider: {
				value: saturation,
				max: 100,
				onChange: (event: Event, value: number | number[]) =>
					dispatch(setSaturation(Number(value))),
			},
			id: Attributes.saturation,
			icon: <GradientOutlined />,
			unit: Units.percentage,
		},
		{
			slider: {
				value: lightness,
				max: 100,
				onChange: (event: Event, value: number | number[]) => dispatch(setLightness(Number(value))),
			},
			id: Attributes.lightness,
			icon: <Brightness6Outlined />,
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
