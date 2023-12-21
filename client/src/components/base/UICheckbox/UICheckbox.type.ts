import ComponentType from '@/components/UIComponent.type';

type UICheckboxType = ComponentType & {
	isChecked?: boolean;
	label?: string;
	description?: string;
	value?: string;
	isDisabled?: boolean;
	onChange?: (checked: boolean) => void;
};

export default UICheckboxType;
