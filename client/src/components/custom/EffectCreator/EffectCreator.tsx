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
import FrameHistoryTable from '../FrameComps/FrameHistoryTable/FrameHistoryTable';
import styles from './EffectCreator.module.scss';

const EffectCreator = ({ initialEffect }: { initialEffect: EffectStateT }) => {
	const dispatch = useDispatch();
	dispatch(setEffect(initialEffect));

	return (
		<PanelGroup direction='horizontal' className={styles.effect}>
			<Panel defaultSize={10}>
				<div>Empty</div>
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={60} minSize={40} className={styles.row}>
				<Attribute />
				<FrameGrid />
			</Panel>
			{/* <ResizeHandle />
				<Panel defaultSize={30} minSize={20} className={styles.column}>
					<EffectPlayer />
					<EffectDetails />
					<FrameHistoryTable />
				</Panel> */}
		</PanelGroup>
	);
};

export default EffectCreator;
