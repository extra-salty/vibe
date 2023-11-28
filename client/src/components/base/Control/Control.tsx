import { ChangeEvent, useCallback } from 'react';
import { Icons } from '../Icon/Icon.type';
import Icon from '../Icon/Icon';
import ControlType from './Control.type';
import './Control.scss';

const Control = ({
	value,
	min = 100,
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
			onChange?.(newValue);
		},
		[onChange],
	);

	if (hidden) return;
	return (
		<div className='control'>
			<input type='number' min={min} max={max} value={value} onChange={onChangeHandler} />
			{unit && false && <span className='unit'>{unit}</span>}
			{hasIncrements && (
				<div className='increment'>
					<Icon
						name={Icons.expandMore}
						height={4}
						width={10}
						classes='reverse'
						onClick={() => onIncrementHandler(value, true)}
					/>
					<Icon
						name={Icons.expandMore}
						height={4}
						width={10}
						onClick={() => onIncrementHandler(value, false)}
					/>
				</div>
			)}
		</div>
	);
};

export default Control;
