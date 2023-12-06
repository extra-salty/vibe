import {
	Actions,
	ModalActions,
	setLedColorActionType,
} from '@/state/features/effect/effectSlice.type';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { resetLedMatrix, setLedColor } from '@/state/features/effect/effectSlice';
import { RootState } from '@/state/store';
import { ColorType } from '@/state/features/attributes/attributeSlice.type';
import { Icons } from '@/components/base/Icon/Icon.type';
import { VercelServiceInstance } from '@/api/vercel/VercelService';
import Button from '@/components/base/Button/Button';
import ButtonType from '@/components/base/Button/Button.type';
import axios from 'axios';
import Modal from '../Modal/Modal';
import './Effect.scss';

const Effect = () => {
	// console.log('effect');
	const dispatch = useDispatch();
	// const {
	// 	effect: { ledMatrix, actionsState },
	// 	attributes: { color },
	// } = useSelector((state: RootState) => state);
	const { ledMatrix, actionsState } = useSelector((state: RootState) => state.effect);
	const { color } = useSelector((state: RootState) => state.attributes);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const onClickHandler = useCallback(
		(args: setLedColorActionType) => {
			dispatch(setLedColor(args));
		},
		[dispatch],
	);

	const onPressHandler = useCallback(() => {}, []);

	const actions = useMemo((): ButtonType[] => {
		return [
			{
				text: Actions.reset,
				icon: Icons.restart,
				onClick: () => dispatch(resetLedMatrix()),
				onPress: () => {},
				disabled: actionsState.Reset,
			},
			{
				text: Actions.lock,
				activeText: Actions.unlock,
				icon: Icons.lock,
				activeIcon: Icons.unlock,
				onClick: () => {},
				onPress: () => {},
			},
		];
	}, [actionsState.Reset, dispatch]);

	const renderActions = useCallback((props: ButtonType) => {
		return <Button key={props.text} {...props} />;
	}, []);

	const modalActions = useMemo((): ButtonType[] => {
		return [
			{
				text: ModalActions.cancel,
				icon: Icons.restart,
				onClick: () => setIsModalOpen(false),
				onPress: () => {},
			},
		];
	}, []);

	const renderLedMatrix = useCallback(
		(ledColumn: ColorType[], x: number) => {
			return (
				<div key={x} className='led-column'>
					{ledColumn.map(({ hue: h, saturation: s, lightness: l }, y) => {
						const backgroundColor = `hsl(${h} ${s}% ${l}%`;

						return (
							<Button
								classes={['led-button']}
								key={`${x}/${y}`}
								// text={`${x}/${y}`}
								style={{ backgroundColor }}
								delay={500}
								onClick={() => onClickHandler({ coordinate: { x, y }, color })}
								onPress={onPressHandler}
								onHover={() => onClickHandler({ coordinate: { x, y }, color })}
							/>
						);
					})}
				</div>
			);
		},
		[color, onClickHandler, onPressHandler],
	);

	const axiosInstance = axios.create();
	const handleTestRequest = useCallback(async () => {
		console.log('test');

		// axiosInstance
		// 	.get('https://swapi.dev/api/people/1')
		// 	.then(function (response) {
		// 		// handle success
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		// handle error
		// 		console.log(error);
		// 	});

		const example = await VercelServiceInstance.getExample();
		console.log('🚀 ~ file: Effect.tsx:69 ~ handleTestRequest ~ requests:', example);
	}, []);

	return (
		<div className='effect'>
			<div className='led-matrix'>{ledMatrix.map(renderLedMatrix)}</div>
			<div className='actions'>{actions.map(renderActions)}</div>
			{/* <Button text='test' onClick={() => handleTestRequest()} onPress={() => handleTestRequest()} /> */}
			<Button text='modal' onClick={() => setIsModalOpen((s) => !s)} onPress={() => {}} />

			{isModalOpen && createPortal(<Modal actions={modalActions} />, document.body)}
		</div>
	);
};

export default Effect;
