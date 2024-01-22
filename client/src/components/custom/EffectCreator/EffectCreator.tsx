'use client';
import { useDispatch } from 'react-redux';
import { setEffect } from '@/state/features/effect/effectSlice';
import EffectDetails from './EffectDetails/EffectDetails';
import EffectPlayer from './EffectPlayer/EffectPlayer';
import FrameGrid from './FrameGrid/FrameGrid';
import { EffectStateT } from '@/types/effect.types';

const EffectCreator = ({ initialEffect }: { initialEffect: EffectStateT }) => {
	const dispatch = useDispatch();
	dispatch(setEffect(initialEffect));

	return (
		<div className='flex gap-10'>
			<div>
				<FrameGrid />{' '}
			</div>
			<div className='flex flex-col gap-2'>
				<EffectPlayer />
				<EffectDetails />
			</div>
		</div>
	);
};

export default EffectCreator;
