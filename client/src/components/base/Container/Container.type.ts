import { ComponentType } from '../../Types';

type ContainerType = ComponentType & {
	key: string;
	label?: string;
	// isOpen?: boolean;
	children: React.ReactNode;
};

export default ContainerType;
