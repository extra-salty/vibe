'use client';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { Modules } from '@/misc/labels/labels';
import UIContainer, { UIContainerProps } from '@/components/derived/UIContainer/UIContainer';
import EffectCreator from '@/components/custom/EffectCreator/EffectCreator';
import Attribute from '@/components/custom/Attribute/Attribute';
import FrameGrid from '@/components/custom/FrameComps/FrameGrid/FrameGrid';
import ResizeHandle from '@/components/derived/ResizeHandle/ResizeHandle';
import style from './page.module.scss';
import { BaseEffectT, HistoriesT } from '@/state/features/effect/effectSlice.types';
import { useDispatch } from 'react-redux';
import { setActiveEffect } from '@/state/features/effect/effectSlice';
import { Suspense, useCallback, useEffect } from 'react';
import { VibeServiceInstance } from '@/services/vibe/vibeService';

const Effect = ({ params: { name } }: { params: { name: string } }) => {
	const dispatch = useDispatch();

	const getStaticEffectData = useCallback(async () => {
		const effect: BaseEffectT = await VibeServiceInstance.getEffect(name);

		const historyProps: HistoriesT = {
			undo: [],
			redo: [],
		};

		const frames = effect.frames.map((frame) => {
			return { ...frame, ...historyProps };
		});

		dispatch(setActiveEffect({ effect: { ...effect, frames } }));
	}, [dispatch, name]);

	const firstPanel: UIContainerProps[] = [
		{
			label: Modules.attributes,
			children: <Attribute />,
		},
		// {
		// 	label: Modules.effect,
		// 	children: <EffectCreator />,
		// },
	];

	getStaticEffectData();

	// useEffect(() => {
	// 	getStaticEffectData();
	// }, [getStaticEffectData]);

	return (
		<>
			<PanelGroup direction='horizontal' className={style.panelGroup}>
				<Panel defaultSize={30} minSize={30} className={style.column}>
					{firstPanel.map((moduleProps, i) => (
						<UIContainer key={i} {...moduleProps} />
					))}
				</Panel>
				<ResizeHandle />
				<Panel defaultSize={70} minSize={30} className={style.column}>
					<UIContainer label='Frame Grid'>
						{/* <Suspense></Suspense> */}
						<FrameGrid />
					</UIContainer>
				</Panel>
			</PanelGroup>
		</>
	);
};

export default Effect;
