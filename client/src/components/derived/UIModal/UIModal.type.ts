import ComponentType from '@/components/Types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import React from 'react';

type ModalType = ComponentType & {
	header?: string;
	description?: string;
	children?: React.ReactNode;
	actions?: UIButtonProps[];
	enlargeClickable?: boolean;
	onModalClose: () => void;
};

export default ModalType;
