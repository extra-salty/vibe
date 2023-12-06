import ComponentType from '@/components/Types';
import ButtonType from '@/components/base/Button/Button.type';
import React from 'react';

type ModalType = ComponentType & {
	header?: string;
	description?: string;
	children?: React.ReactNode;
	actions?: ButtonType[];
	enlargeClickable?: boolean;
	onModalClose: () => void;
};

export default ModalType;
