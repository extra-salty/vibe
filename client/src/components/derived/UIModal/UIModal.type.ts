import ComponentType from '@/components/Types';
import UIButtonType from '@/components/base/UIButton/UIButton.type';
import React from 'react';

type ModalType = ComponentType & {
	header?: string;
	description?: string;
	children?: React.ReactNode;
	actions?: UIButtonType[];
	enlargeClickable?: boolean;
	onModalClose: () => void;
};

export default ModalType;
