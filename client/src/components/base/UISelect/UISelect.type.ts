import UIComponentProps from '@/components/UIComponent.type';

type UISelectProps = UIComponentProps & {
	options?: UISelectOptionProps[];
	optionGroups?: UISelectOptionGroupProps[];
	value?: UISelectOptionProps['key'];
	disabledOptionsKeys?: string[];
	showEmptyOption?: boolean;
	isRequired?: boolean;
	isDisabled?: boolean;
	label?: string;
	id?: string;
	onChange: (value: UISelectOptionProps['key']) => void;
};

export default UISelectProps;

export type UISelectOptionProps = {
	key: string;
	label: string;
};

export type UISelectOptionGroupProps = {
	label: string;
	options: UISelectOptionProps[];
};
