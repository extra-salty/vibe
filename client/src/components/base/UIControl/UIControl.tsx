import { ChangeEvent, memo } from 'react';
import { Icons } from '../UIIcon/UIIcon.types';
import UIIcon from '../UIIcon/UIIcon';
import UIControlProps from './UIControl.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import './UIControl.scss';

const UIControl = ({
	value,
	min = 0,
	max = 100,
	hasIncrements,
	unit,
	disabled = false,
	onChange,
	hidden,
	classes,
}: UIControlProps) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const limitedValue = limitValue(Number(e.target.value));
		onChange?.(limitedValue);
	};

	const onIncrementHandler = (value: number, increase: 'increase' | 'decrease') => {
		const newValue = increase === 'increase' ? value + 1 : value - 1;
		const limitedValue = limitValue(newValue);
		onChange?.(limitedValue);
	};

	const limitValue = (value: number) => Math.max(min, Math.min(max, value));

	const classNames = appendClasses(['uiControl', classes]);

	if (hidden) return null;
	return (
		<div className={classNames}>
			<input
				type='number'
				min={min}
				max={max}
				value={value}
				disabled={disabled}
				onChange={onChangeHandler}
			/>
			{unit && <span className='unit'>{unit}</span>}
			{hasIncrements && (
				<div className='increment'>
					<UIIcon
						name={Icons.triangle}
						height={4}
						width={10}
						// enlarge
						onClick={() => onIncrementHandler(value, 'increase')}
						classes={['enlarge']}
					/>
					<UIIcon
						name={Icons.triangle}
						height={4}
						width={10}
						// enlarge
						classes={['enlarge', 'reverse']}
						onClick={() => onIncrementHandler(value, 'decrease')}
					/>
				</div>
			)}
		</div>
	);
};

export default memo(UIControl);
