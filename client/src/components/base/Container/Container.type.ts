import { ComponentType } from '../../Types';

type ContainerType = ComponentType & {
	label?: string;
	// isOpen?: boolean;
	children: React.ReactNode;
};

export default ContainerType;
