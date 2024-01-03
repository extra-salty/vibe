import ComponentType from '@/components/UIComponent.type';

type UICheckboxProps = ComponentType & {
	isChecked?: boolean;
	label?: string;
	value?: string;
	id?: string;
	description?: string;
	isDisabled?: boolean;
	onChange?: (checked: boolean) => void;
};

export default UICheckboxProps;
