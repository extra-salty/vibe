import { ChangeEvent, useCallback } from 'react';
import SliderType from './Slider.type';
import './Slider.scss';
import { useDebounce } from '@/helpers/hooks/useDebounce/useDebounce';
import { useDispatch } from 'react-redux';
import { setHue } from '@/state/features/attributes/attributeSlice';

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
	const onChangeHandler = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => {
			onChange?.(Number(target.value));
		},
		[onChange],
	);

	// const debounce = useDebounce(({ target }: ChangeEvent<HTMLInputElement>) => {
	// 	onChange?.(Number(target.value));
	// 	console.log(target);
	// }, 100);

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
