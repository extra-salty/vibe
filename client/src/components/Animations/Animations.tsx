'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { AnimationT, StaticAnimationT } from '@/types/animation.types';
import { animationsActions } from '@/state/features/animationGroups/animationSlice';
import { Panel, PanelGroup } from 'react-resizable-panels';
import LeftTabs from './LeftTabs/LeftTabs';
import RightTabs from './RightTabs/RightTabs';
import ResizeHandle from '@/components/misc/ResizeHandle/ResizeHandle';
import { StaticAnimationsApi } from '@/app/api/staticAnimations/_service';

const Animations = ({
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
			<Panel defaultSize={50} minSize={30}>
				<LeftTabs />
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={50} minSize={30}>
				<RightTabs />
			</Panel>
		</PanelGroup>
	);
};

export default Animations;
