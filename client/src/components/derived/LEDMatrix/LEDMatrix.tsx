import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import LEDMatrixType from './LEDMatrix.type';
import Button from '@/components/base/Button/Button';
import Icon from '@/components/base/Icon/Icon';
import './LEDMatrix.scss';

const LEDMatrix = ({}: LEDMatrixType) => {
	const dispatch = useDispatch();
	const ledMatrix = useSelector((state: RootState) => state.ledMatrix.current);
	const color = useSelector((state: RootState) => state.color);

	const onClickHandler = useCallback(() => {}, []);
	const onPressHandler = useCallback(() => {}, []);

	return (
		<>
			{/* <div className='controls'>
				<Icon name='selectAll' />
				<Icon name='reset' />
				<Icon name='save' />
				<Icon name='next' />
				<Icon name='prev' />
			</div> */}
			<div className='led-matrix'>
				{ledMatrix.map((ledColumn, x) => {
					return (
						<div
							key={x}
							className='column'
						>
							{ledColumn.map((color, y) => {
								return (
									<Button
										key={`${x}/${y}`}
										// text={`${x}/${y}`}
										color={color}
										classes='led'
										delay={500}
										onClick={onClickHandler}
										onPress={onPressHandler}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default LEDMatrix;

//
