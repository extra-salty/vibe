import { ChangeEvent, useCallback } from 'react';
import { Icons } from '../Icon/Icon.type';
import Icon from '../Icon/Icon';
import ControlType from './Control.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './Control.scss';

const Control = ({
	value,
	min = 0,
	max = 100,
	hasIncrements = true,
	unit,
	onChange,
	hidden,
	classes,
}: ControlType) => {
	const onChangeHandler = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => {
			onChange?.(Number(target.value));
		},
		[onChange],
	);

	const onIncrementHandler = useCallback(
		(value: number, increase: boolean) => {
			const newValue = increase ? value + 1 : value - 1;
			const limitedValue = Math.max(min, Math.min(max, Number(newValue)));
			onChange?.(limitedValue);
		},
		[max, min, onChange],
	);

	if (hidden) return;
	return (
		<div className={appendClasses(['control', classes])}>
			<input type='number' min={min} max={max} value={value} onChange={onChangeHandler} />
			{unit && <span className='unit'>{unit}</span>}
			{hasIncrements && (
				<div className='increment'>
					<Icon
						name={Icons.triangle}
						height={4}
						width={10}
						onClick={() => onIncrementHandler(value, true)}
						classes={['increase']}
					/>
					<Icon
						name={Icons.triangle}
						height={4}
						width={10}
						classes={['decrease', 'reverse']}
						onClick={() => onIncrementHandler(value, false)}
					/>
				</div>
			)}
		</div>
	);
};

export default Control;
