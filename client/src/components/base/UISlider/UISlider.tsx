import { ChangeEvent, useCallback } from 'react';
import UISliderType from './UISlider.type';
import './UISlider.scss';
import { useDebounce } from '@/helpers/hooks/useDebounce/useDebounce';
import appendClasses from '@/helpers/appendClasses/appendClasses';

const UISlider = ({
	value,
	min = 0,
	max = 100,
	delay = 0,
	onChange,
	hidden,
	classes,
	styles,
}: UISliderType) => {
	// const onChangeHandler = useCallback(
	// 	({ target }: ChangeEvent<HTMLInputElement>) => {
	// 		onChange?.(Number(target.value));
	// 	},
	// 	[onChange],
	// );

	const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		onChange?.(Number(target.value));
	};

	// const debounce = useDebounce(({ target }: ChangeEvent<HTMLInputElement>) => {
	// 	onChange?.(Number(target.value));
	// 	console.log(target);
	// }, 100);

	const classNames = appendClasses(['ui-slider', classes]);

	if (hidden) return null;
	return (
		<input
			className={classNames}
			type='range'
			min={min}
			max={max}
			value={value}
			style={styles}
			onChange={onChangeHandler}
		></input>
	);
};

export default UISlider;
