'use client';
import { useDispatch } from 'react-redux';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { StaticAnimationT } from '@/types/animation.types';
import EffectDetails from './EffectDetails/EffectDetails';
import EffectPlayer from './EffectPlayer/EffectPlayer';
import FrameGrid from './FrameGrid/FrameGrid';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import Attribute from '../Attribute/Attribute';
import FrameHistoryTable from '../FrameComps/FrameHistoryTable/FrameHistoryTable';
import styles from './EffectCreator.module.scss';

const EffectCreator = () => {
	const dispatch = useDispatch();
	// dispatch(setEffect(initialEffect));

	return (
		<PanelGroup direction='horizontal' className={styles.effect}>
			<Panel defaultSize={75} minSize={40} className={styles.row}>
				{/* <FrameGrid /> */}
			</Panel>
			{/* <ResizeHandle /> */}
			{/* <Panel minSize={10} defaultSize={25} maxSize={40} className={styles.column}>
				<EffectPlayer />
				<EffectDetails />
				<FrameHistoryTable />
			</Panel> */}
		</PanelGroup>
	);
};

export default EffectCreator;
