import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLedColor } from '@/state/features/effect/effectSlice';
import { setLedColorActionType } from '@/state/features/effect/effectSlice.type';
import { RootState } from '@/state/store';
import { ColorType } from '@/state/features/attribute/attributeSlice.type';
import { ActionType, Actions } from './Effect.type';
import { Icons } from '@/components/base/Icon/Icon.type';
import Icon from '@/components/base/Icon/Icon';
import Button from '@/components/base/Button/Button';
import './Effect.scss';
import axios from 'axios';
import { VercelServiceInstance } from '@/api/vercel/VercelService';

const Effect = () => {
	const dispatch = useDispatch();
	const ledMatrix = useSelector((state: RootState) => state.effect.current);
	const selectedColor = useSelector((state: RootState) => state.attribute);

	const onClickHandler = useCallback(
		(args: setLedColorActionType) => {
			dispatch(setLedColor(args));
		},
		[dispatch],
	);

	const onPressHandler = useCallback(() => {}, []);

	const actions = useMemo((): ActionType[] => {
		return [
			{
				name: Actions.reset,
				icon: Icons.restart,
				onClick: () => {},
			},
			{
				name: Actions.save,
				icon: Icons.save,
				onClick: () => {},
			},
			{
				name: Actions.add,
				icon: Icons.add,
				onClick: () => {},
			},
		];
	}, []);

	const renderActions = useCallback(({ name, icon, onClick }: ActionType) => {
		return <Icon key={name} name={icon} onClick={onClick} />;
	}, []);

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

	const renderLedMatrix = useCallback(
		(ledColumn: ColorType[], x: number) => {
			return (
				<div key={x} className='column'>
					{ledColumn.map((color, y) => {
						return (
							<Button
								classes='led'
								key={`${x}/${y}`}
								text={`${x}/${y}`}
								color={color}
								delay={500}
								onClick={() => onClickHandler({ coordinate: { x, y }, selectedColor })}
								onPress={onPressHandler}
								onHover={() => onClickHandler({ coordinate: { x, y }, selectedColor })}
							/>
						);
					})}
				</div>
			);
		},
		[onClickHandler, onPressHandler, selectedColor],
	);

	return (
		<div className='effect'>
			<div className='led-matrix'>{ledMatrix.map(renderLedMatrix)}</div>
			<div className='actions'>{actions.map(renderActions)}</div>
			<Button text='test' onClick={() => handleTestRequest()} onPress={() => handleTestRequest()} />
		</div>
	);
};

export default Effect;
