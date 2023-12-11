import ComponentType from '@/components/Types';

type UICheckboxType = ComponentType & {
	label?: string;
	description?: string;
	value: string;
	isDisabled?: boolean;
	isChecked?: boolean;
	onChange?: (checked: boolean) => void;
};

export default UICheckboxType;
