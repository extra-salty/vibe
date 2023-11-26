import { ColorAttributes } from '@/components/Components.type';
import { Icons } from '@/components/base/Icon/Icon.type';

type SliderType = {
	key: ColorAttributes;
	value: number;
	max: number;
	unit: string;
	icon: Icons;
	background?: string;
	hidden?: boolean;
	class?: string;
	onChange: (value: number) => void;
};

export default SliderType;
