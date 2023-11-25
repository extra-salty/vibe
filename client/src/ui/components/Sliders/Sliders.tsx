import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHue, setLightness, setSaturation } from '@/state/features/color/colorSlice';
import { RootState } from '@/state/store';
import { ColorAttributes } from '../Types';
import Icon, { Icons } from '../Icon/Icon';
import Slider from './Slider/Slider';
import Control from '../Control/Control';
import './Sliders.scss';

type SliderType = {
	key: ColorAttributes;
	max: number;
	value: number;
	icon: Icons;
	sliderOnChange: (value: string) => void;
	controlOnChange: (value: string) => void;
	hidden?: boolean;
	class?: string;
};

const Sliders = () => {
	const dispatch = useDispatch();
	const color = useSelector((state: RootState) => state.color);
	const { hue, saturation, lightness } = color;

	const handleControlChange = useCallback(() => {}, []);

	const handleHslUpdate = (hue: number) => {
		dispatch(setHue(hue));
	};

	const sliders = useMemo((): SliderType[] => {
		return [
			{
				key: ColorAttributes.hue,
				max: 360,
				value: hue,
				icon: Icons.palette,
				sliderOnChange: (value: string) => dispatch(setHue(Number(value))),
				controlOnChange: () => {},
			},
			{
				key: ColorAttributes.saturation,
				max: 100,
				value: saturation,
				icon: Icons.palette,
				sliderOnChange: (value: string) => dispatch(setSaturation(Number(value))),
				controlOnChange: () => {},
			},
			{
				key: ColorAttributes.lightness,
				max: 100,
				value: lightness,
				icon: Icons.palette,
				sliderOnChange: (value: string) => dispatch(setLightness(Number(value))),
				controlOnChange: () => {},
			},
		];
	}, [dispatch, hue, lightness, saturation]);

	const renderSlider = useCallback(({ key, max, value, icon, sliderOnChange, controlOnChange }: SliderType) => {
		return (
			<div
				key={key}
				className='row'
			>
				<Icon name={icon} />
				<Slider
					max={max}
					value={value}
					// colorAttribute={ColorAttributes.hue}
					onChange={sliderOnChange}
				/>
				<Control
					max={max}
					value={value}
					onChange={controlOnChange}
				/>
			</div>
		);
	}, []);

	return <div className='sliders'>{sliders.map(renderSlider)}</div>;
};

export default Sliders;
