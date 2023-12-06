import { useCallback } from 'react';
import ModalType from './Modal.type';
import ButtonType from '@/components/base/Button/Button.type';
import Button from '@/components/base/Button/Button';
import './Modal.scss';

const Modal = ({ hidden, actions }: ModalType) => {
	const renderAction = useCallback(({ onClick, onPress }: ButtonType) => {
		return <Button onClick={onClick} onPress={onPress} />;
	}, []);

	if (hidden) return;
	return (
		<>
			<div className='overlay'></div>
			<div className='modal'>
				<div className='header'>Asdasdasd</div>
				<div className='content'>ASdasd</div>
				{/* <div className='actions'>{actions.map(renderAction)}</div> */}
			</div>
		</>
	);
};

export default Modal;
