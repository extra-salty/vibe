import UIComponentType from '@/components/Types';

type UISelectType = UIComponentType & {
	options: UISelectOption[];
	optionGroups?: UISelectOptionGroup[];
	value?: UISelectOption['key'];
	disabledOptionsKeys?: string[];
	showEmptyOption?: boolean;
	isRequired?: boolean;
	isDisabled?: boolean;
	onChange?: (value: UISelectOption['key']) => void;
};

export default UISelectType;

export type UISelectOption = {
	key: string;
	label: string;
};

export type UISelectOptionGroup = {
	label: string;
	options: UISelectOption[];
};
