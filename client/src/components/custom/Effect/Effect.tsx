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
import { Icons } from '@/components/base/UIIcon/UIIcon.type';
import { VercelServiceInstance } from '@/api/vercel/VercelService';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonType from '@/components/base/UIButton/UIButton.type';
import axios from 'axios';
import Modal from '../../derived/UIModal/UIModal';
import ModalType from '../../derived/UIModal/UIModal.type';
import style from './Effect.module.scss';

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

	const actions = useMemo((): UIButtonType[] => {
		return [
			{
				text: Actions.reset,
				icon: Icons.restart,
				onClick: () => setIsModalOpen(true),
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
	}, [actionsState.Reset]);

	const renderActions = useCallback((props: UIButtonType) => {
		return <UIButton key={props.text} {...props} />;
	}, []);

	const modalActions = useMemo((): Omit<ModalType, 'onModalClose'>[] => {
		return [
			{
				header: 'Effect',
				description: 'Are you sure you want to reset the matrix?',
				actions: [
					{
						text: ModalActions.cancel,
						onClick: () => {},
						onPress: () => {},
					},
					{
						text: ModalActions.accept,
						onClick: () => dispatch(resetLedMatrix()),
						onPress: () => {},
					},
				],
			},
			// {
			// 	text: ModalActions.accept,
			// 	// icon: Icons.restart,
			// 	onClick: () => setIsModalOpen(false),
			// 	onPress: () => {},
			// },
		];
	}, [dispatch]);

	const renderLedMatrix = useCallback(
		(ledColumn: ColorType[], x: number) => {
			return (
				<div key={x} className={style['led-column']}>
					{ledColumn.map(({ hue: h, saturation: s, lightness: l }, y) => {
						const backgroundColor = `hsl(${h} ${s}% ${l}%`;

						return (
							<UIButton
								classes={[style['led-button']]}
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
		<div className={style.effect}>
			<div className={style['led-matrix']}>{ledMatrix.map(renderLedMatrix)}</div>
			<div className={style.actions}>{actions.map(renderActions)}</div>

			{isModalOpen &&
				createPortal(
					<Modal {...modalActions[0]} onModalClose={() => setIsModalOpen(false)} />,
					document.body,
				)}
		</div>
	);
};

export default Effect;
