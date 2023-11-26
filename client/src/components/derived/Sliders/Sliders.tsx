import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHue, setLightness, setSaturation } from '@/state/features/color/colorSlice';
import { getBackgroundColor } from './Slider.helper';
import { RootState } from '@/state/store';
import { ColorAttributes } from '../../Components.type';
import { Icons } from '@/components/base/Icon/Icon.type';
import SliderType from './Sliders.type';
import Icon from '../../base/Icon/Icon';
import Slider from '../../base/Slider/Slider';
import Control from '../../base/Control/Control';
import './Sliders.scss';

const Sliders = () => {
	const dispatch = useDispatch();
	const color = useSelector((state: RootState) => state.color);
	const { hue, saturation, lightness } = color;

	const handleControlChange = useCallback(() => {}, []);

	const sliders = useMemo((): SliderType[] => {
		return [
			{
				key: ColorAttributes.hue,
				value: hue,
				max: 360,
				unit: '°',
				icon: Icons.palette,
				background: getBackgroundColor(color, ColorAttributes.hue),
				onChange: (value: number) => dispatch(setHue(value)),
			},
			{
				key: ColorAttributes.saturation,
				value: saturation,
				max: 100,
				unit: '%',
				icon: Icons.palette,
				background: getBackgroundColor(color, ColorAttributes.saturation),
				onChange: (value: number) => dispatch(setSaturation(value)),
			},
			{
				key: ColorAttributes.lightness,
				value: lightness,
				unit: '%',
				max: 100,
				icon: Icons.palette,
				background: getBackgroundColor(color, ColorAttributes.lightness),
				onChange: (value: number) => dispatch(setLightness(value)),
			},
			{
				key: ColorAttributes.timing,
				value: 0,
				unit: 's',
				max: 100,
				icon: Icons.palette,
				onChange: (value: number) => {},
			},
		];
	}, [color, dispatch, hue, lightness, saturation]);

	const renderSlider = useCallback(({ key, value, max, unit, background, icon, onChange }: SliderType) => {
		return (
			<div
				key={key}
				className='row'
			>
				<Icon name={icon} />
				<Slider
					value={value}
					max={max}
					onChange={onChange}
					background={background}
				/>
				<Control
					value={value}
					max={max}
					unit={unit}
					onChange={onChange}
				/>
			</div>
		);
	}, []);

	return <div className='sliders'>{sliders.map(renderSlider)}</div>;
};

export default Sliders;
