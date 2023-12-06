import ComponentType from '@/components/Types';
import ButtonType from '@/components/base/Button/Button.type';

type ModalType = ComponentType & {
	actions?: ButtonType[];
};

export default ModalType;
