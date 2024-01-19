'use client';
import { useActiveEffect } from '@/state/features/effect/effectSelector';
import { useDispatch } from 'react-redux';
import { StateEffectT } from '@/state/features/effect/effectSlice.types';
import { setEffect } from '@/state/features/effect/effectSlice';
import EffectDetails from './EffectDetails/EffectDetails';
import EffectPlayer from './EffectPlayer/EffectPlayer';
import FrameGrid from './FrameGrid/FrameGrid';

const EffectCreator = ({ initialEffect }: { initialEffect: StateEffectT }) => {
	const dispatch = useDispatch();
	dispatch(setEffect(initialEffect));

	console.log('setInitial');
	// const effect = useActiveEffect();

	return (
		<div className='flex gap-10'>
			<div className='flex flex-col gap-2'>
				{/* <EffectPlayer frames={effect.frames} /> */}
				<EffectDetails />
			</div>
			<div>{/* <FrameGrid frames={effect.frames} /> */}</div>
		</div>
	);
};

export default EffectCreator;
