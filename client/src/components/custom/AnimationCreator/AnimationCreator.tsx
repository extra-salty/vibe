'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { AnimationT } from '@/types/animation.types';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import Playlist from './Playlist/Playlist';
import FramePlayer from '../FrameComps/FramePlayer/FramePlayer';
import Animations from './TableTabs/Animations/Animations';
import styles from './AnimationCreator.module.scss';

const AnimationCreator = ({ animations }: { animations: AnimationT[] }) => {
	const dispatch = useDispatch<AppDispatch>();

	dispatch(animationsActions.setData(animations));

	return (
		<PanelGroup direction='horizontal' className={styles.animationCreator}>
			<Panel defaultSize={40} minSize={20} className={styles.row}>
				<Animations />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={40} minSize={20} className={styles.row}>
				<Playlist />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={20} minSize={10} className={styles.row}>
				{/* <FramePlayer /> */}
			</Panel>
		</PanelGroup>
	);
};

export default AnimationCreator;
