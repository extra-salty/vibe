'use client';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { Modules } from '@/misc/labels/labels';
import UIContainer from '@/components/derived/UIContainer/UIContainer';
import UIContainerProps from '@/components/derived/UIContainer/UIContainer.type';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import Attribute from '@/components/custom/Attribute/Attribute';
import FrameGrid from '@/components/custom/FrameComps/FrameGrid/FrameGrid';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import style from './page.module.scss';

const Effect = () => {
	const firstPanel: UIContainerProps[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
		},
		{
			label: Modules.effect,
			children: <EffectCreator />,
		},
	];

	return (
		<PanelGroup direction='horizontal' className={style.panelGroup}>
			<Panel defaultSize={50} minSize={30} className={style.column}>
				{firstPanel.map((moduleProps, i) => (
					<UIContainer key={i} {...moduleProps} />
				))}
			</Panel>
			<ResizeHandle />
			<Panel defaultSize={50} minSize={30} className={style.column}>
				<UIContainer label='Frame Grid'>
					<FrameGrid />
				</UIContainer>
			</Panel>
		</PanelGroup>
	);
};

export default Effect;
