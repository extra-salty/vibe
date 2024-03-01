'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { AnimationT, StaticAnimationT } from '@/types/animation.types';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
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
		<PanelGroup direction='horizontal'>
			<Panel defaultSize={50} minSize={20}>
				<AnimationTabs />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={50} minSize={20}>
				<RightTabs />
			</Panel>
		</PanelGroup>
	);
};

export default AnimationCreator;
