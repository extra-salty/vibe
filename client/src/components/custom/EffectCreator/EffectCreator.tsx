'use client';
import { useDispatch } from 'react-redux';
import { setEffect } from '@/state/features/effect/effectSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { EffectStateT } from '@/types/effect.types';
import EffectDetails from './EffectDetails/EffectDetails';
import EffectPlayer from './EffectPlayer/EffectPlayer';
import FrameGrid from './FrameGrid/FrameGrid';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import Attribute from '../Attribute/Attribute';
import styles from './EffectCreator.module.scss';
import FrameHistoryTable from '../FrameComps/FrameHistoryTable/FrameHistoryTable';

const EffectCreator = ({ initialEffect }: { initialEffect: EffectStateT }) => {
	const dispatch = useDispatch();
	dispatch(setEffect(initialEffect));

	return (
		<div className='flex gap-10'>
			<PanelGroup direction='horizontal'>
				<Panel defaultSize={50}>
					<Attribute />
				</Panel>
				<ResizeHandle />
				<Panel defaultSize={50} minSize={40} className={styles.grid}>
					<FrameGrid />
				</Panel>
			</PanelGroup>
			<div className='flex flex-col gap-2'>
				<EffectPlayer />
				<EffectDetails />
				<FrameHistoryTable />
			</div>
		</div>
	);
};

export default EffectCreator;
