import { ChangeEvent, memo } from 'react';
import { Icons } from '../UIIcon/UIIcon.type';
import UIIcon from '../UIIcon/UIIcon';
import UIControlType from './UIControl.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './UIControl.scss';

const UIControl = ({
	value,
	min = 0,
	max = 100,
	hasIncrements,
	unit,
	onChange,
	hidden,
	classes,
}: UIControlType) => {
	const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		onChange?.(Number(target.value));
	};

	const onIncrementHandler = (value: number, increase: 'increase' | 'decrease') => {
		const newValue = increase === 'increase' ? value + 1 : value - 1;
		const limitedValue = Math.max(min, Math.min(max, Number(newValue)));
		onChange?.(limitedValue);
	};

	const classNames = appendClasses(['ui-control', classes]);

	if (hidden) return null;
	return (
		<div className={classNames}>
			<input type='number' min={min} max={max} value={value} onChange={onChangeHandler} />
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
