import React, { useCallback } from 'react';
import UISelectType, { UISelectOption, UISelectOptionGroup } from './UISelect.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';

const UISelect = ({
	options,
	optionGroups,
	value,
	disabledOptionsKeys,
	showEmptyOption,
	isRequired,
	isDisabled,
	onChange,
	classes,
	hidden,
}: UISelectType) => {
	const classNames = appendClasses(['uiSelect', classes]);

	const renderOptions = useCallback(
		({ key, label }: UISelectOption) => (
			<option disabled={disabledOptionsKeys?.includes(key)} value={key} key={key} hidden={hidden}>
				{label}
			</option>
		),
		[disabledOptionsKeys, hidden],
	);

	if (hidden) return null;
	return (
		<select
			className={classNames}
			required={isRequired}
			disabled={isDisabled}
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
		>
			{showEmptyOption && <option value=''></option>}
			{options?.map(renderOptions)}
			{optionGroups?.map(({ label, options }: UISelectOptionGroup, i: number) => (
				<optgroup key={i} label={label}>
					{options?.map(renderOptions)}
				</optgroup>
			))}
		</select>
	);
};

export default UISelect;
