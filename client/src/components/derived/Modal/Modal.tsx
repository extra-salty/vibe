import { useCallback } from 'react';
import { Icons } from '@/components/base/Icon/Icon.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import ModalType from './Modal.type';
import ButtonType from '@/components/base/Button/Button.type';
import Button from '@/components/base/Button/Button';
import Icon from '@/components/base/Icon/Icon';
import './Modal.scss';

const Modal = ({
	header,
	description,
	actions,
	children,
	onModalClose,
	hidden,
	classes,
}: ModalType) => {
	const handleModalClose = useCallback(() => {
		onModalClose();
	}, [onModalClose]);

	const renderAction = useCallback(
		(props: ButtonType, i: number) => {
			const newOnClick = () => {
				props.onClick();
				handleModalClose();
			};
			return <Button key={i} {...props} onClick={newOnClick} />;
		},
		[handleModalClose],
	);

	if (hidden) return;
	return (
		<>
			<div className='overlay'></div>
			<div className={appendClasses(['modal', classes])}>
				<Icon
					name={Icons.close}
					width={10}
					height={10}
					enlarge
					classes={['close']}
					onClick={handleModalClose}
				/>
				{header && <div className='header'>{header}</div>}
				{description && <div className='description'>{description}</div>}
				{children && <div className='children'>{children}</div>}
				{actions && <div className='actions'>{actions.map(renderAction)}</div>}
			</div>
		</>
	);
};

export default Modal;
