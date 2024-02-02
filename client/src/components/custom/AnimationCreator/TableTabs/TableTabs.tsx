import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { AnimationBaseT } from '@/types/animation.types';
import { EffectTableT } from '@/types/effect.types';
import AnimationTable from '../AnimationTable/AnimationTable/AnimationTable';
import EffectTable from '../EffectTable/EffectTable';
import { useStaticEffectTable } from '@/state/features/animation/animationSelector';

const TableTabs = ({
	animations,
	effects,
}: {
	animations: AnimationBaseT[];
	effects: EffectTableT[];
}) => {
	const [activeTab, setActiveTab] = useState<string>('animations');

	const handleTabChange = (_: SyntheticEvent, newValue: string) => setActiveTab(newValue);

	return (
		<div>
			<TabContext value={activeTab}>
				<TabList onChange={handleTabChange} aria-label='tables'>
					<Tab label='Animations' value='animations' />
					<Tab label='Static Effects' value='staticEffects' />
				</TabList>
				<TabPanel value='animations'>
					<AnimationTable initialAnimations={animations} />
				</TabPanel>
				<TabPanel value='staticEffects'>
					<EffectTable initialEffects={effects} />
					{/* initialState={effectTableState} */}
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default TableTabs;
