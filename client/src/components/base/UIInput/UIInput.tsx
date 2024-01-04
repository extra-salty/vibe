import { ChangeEvent, memo } from 'react';
import { generateRandomElementId } from '@/misc/helpers/helpers';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UIInputProps from './UIInput.type';
import UILabel from '../UILabel/UILabel';
import './UIInput.scss';

const UIInput = ({
	type = 'text',
	value,
	readonly,
	disabled,
	placeholder = '',
	minLength,
	maxLength,
	label,
	id,
	onChange,
	classes,
	hidden,
}: UIInputProps) => {
	const classNames = appendClasses(['uiInput', classes]);

	const elId = id || generateRandomElementId();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	if (hidden) return null;
	return (
		<div className={classNames}>
			{label && <UILabel label={label} htmlFor={elId} />}
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readonly}
				minLength={minLength}
				maxLength={maxLength}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default memo(UIInput);
