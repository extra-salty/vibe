import { ChangeEvent, useCallback } from 'react';
import './Slider.scss';

type SliderType = {
	min?: number | string;
	max?: number | string;
	value: number | string;
	onChange: (value: string) => void;
};

const Slider = ({ min = 0, max = 100, value, onChange }: SliderType) => {
	// getHueBackgroundColor(color);

	const onChangeHandler = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => {
			onChange?.(target.value);
		},
		[onChange],
	);

	return (
		<input
			className='slider'
			type='range'
			min={min}
			max={max}
			value={value}
			style={
				{
					// background: getHueBackgroundColor(color),
				}
			}
			onChange={onChangeHandler}
		></input>
	);
};

export default Slider;
