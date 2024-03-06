type UIControlProps = {
	value: number;
	min?: number;
	max?: number;
	unit?: string;
	hasIncrements?: boolean;
	disabled?: boolean;
	hidden?: boolean;
	classes: any;
	onChange: (value: number) => void;
};

export default UIControlProps;
