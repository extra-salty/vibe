import { ChangeEvent, useCallback } from 'react';
import { generateRandomElementId } from '@/misc/helpers/helpers';
import UISelectProps, { UISelectOptionProps, UISelectOptionGroupProps } from './UISelect.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import UILabel from '../UILabel/UILabel';
import './UISelect.scss';

const UISelect = ({
	options,
	optionGroups,
	value,
	disabledOptionsKeys,
	showEmptyOption,
	isRequired,
	isDisabled,
	label,
	id,
	onChange,
	classes,
	hidden,
}: UISelectProps) => {
	const renderOptions = useCallback(
		({ key, label }: UISelectOptionProps) => (
			<option disabled={disabledOptionsKeys?.includes(key)} value={key} key={key} hidden={hidden}>
				{label}
			</option>
		),
		[disabledOptionsKeys, hidden],
	);

	const elId = id || generateRandomElementId();

	if (hidden || (options && optionGroups)) return null;
	return (
		<div className={appendClasses(['uiSelect', classes])}>
			{label && <UILabel label={label} htmlFor={elId} />}
			<select
				id={elId}
				required={isRequired}
				disabled={isDisabled}
				value={value}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
			>
				{showEmptyOption && <option value='Select'></option>}
				{options?.map(renderOptions)}
				{optionGroups?.map(({ label, options }: UISelectOptionGroupProps, i) => (
					<optgroup key={i} label={label}>
						{options?.map(renderOptions)}
					</optgroup>
				))}
			</select>
		</div>
	);
};

export default UISelect;
