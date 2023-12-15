import { useCallback } from 'react';
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import appendClasses from '@/misc/hooks/appendClasses/appendClasses';
import ModalType from './UIModal.type';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UIButton from '@/components/base/UIButton/UIButton';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import './UIModal.scss';

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
		(props: UIButtonProps, i: number) => {
			const newOnClick = () => {
				props.onClick();
				handleModalClose();
			};
			return <UIButton key={i} {...props} onClick={newOnClick} />;
		},
		[handleModalClose],
	);

	if (hidden) return null;
	return (
		<>
			<div className='overlay'></div>
			<div className={appendClasses(['modal', classes])}>
				<UIIcon
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
