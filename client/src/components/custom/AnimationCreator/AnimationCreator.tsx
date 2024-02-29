'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { AnimationT, StaticAnimationT } from '@/types/animation.types';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import Playlist from './Playlist/Playlist';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import Animations from './TableTabs/Animations/Animations';
import styles from './AnimationCreator.module.scss';
import AnimationTabs from './TableTabs/AnimationTabs';
import RightTabs from './RightTabs/RightTabs';

const AnimationCreator = ({
	staticAnimations,
	animations,
}: {
	staticAnimations: StaticAnimationT[];
	animations: AnimationT[];
}) => {
	const dispatch = useDispatch<AppDispatch>();

	dispatch(animationsActions.setStaticData(staticAnimations));

	return (
		<PanelGroup direction='horizontal' className={styles.animationCreator}>
			<Panel defaultSize={20} minSize={20} className={styles.row}>
				<AnimationTabs />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={60} minSize={20} className={styles.row}>
				<RightTabs />
			</Panel>
			{/* <ResizeHandle />
			<Panel defaultSize={20} minSize={10} className={styles.row}>
				<FramePlayer />
			</Panel> */}
		</PanelGroup>
	);
};

export default AnimationCreator;
