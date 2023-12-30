import { ChangeEvent, useCallback } from 'react';
import { useDebounce } from '@/misc/hooks/useDebounce/useDebounce';
import UISliderType from './UISlider.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UISlider.scss';

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

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(Number(e.target.value));
	};

	// const debounce = useDebounce(({ target }: ChangeEvent<HTMLInputElement>) => {
	// 	onChange?.(Number(target.value));
	// 	console.log(target);
	// }, 100);

	const classNames = appendClasses(['uiSlider', classes]);

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
