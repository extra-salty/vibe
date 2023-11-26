import { ChangeEvent, useCallback } from 'react';
import SliderType from './Slider.type';
import './Slider.scss';

const Slider = ({
	value,
	min = 0,
	max = 100,
	background,
	delay = 0,
	onChange,
	hidden,
	classes,
}: SliderType) => {
	// getHueBackgroundColor(color);

	const onChangeHandler = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => {
			const delayedInput = setTimeout(() => onChange?.(Number(target.value)), 10);
			// onChange?.(Number(target.value));
			return () => clearTimeout(delayedInput);
		},
		[onChange],
	);

	if (hidden) return;
	return (
		<input
			className='slider'
			type='range'
			min={min}
			max={max}
			value={value}
			style={{
				background: background,
			}}
			onChange={onChangeHandler}
		></input>
	);
};

export default Slider;
