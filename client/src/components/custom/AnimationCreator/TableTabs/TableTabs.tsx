import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import StaticEffectTable from '../EffectTable/StaticEffectTable';
import AnimationTable from '../AnimationTable/AnimationTable/AnimationTable';

const TableTabs = () => {
	const [activeTab, setActiveTab] = useState<string>('animations');

	const handleTabChange = (_: SyntheticEvent, newValue: string) => setActiveTab(newValue);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '700px' }}>
			<TabContext value={activeTab}>
				<TabList onChange={handleTabChange} aria-label='tables'>
					<Tab label='Animations' value='animations' />
					<Tab label='Static Effects' value='staticEffects' />
				</TabList>
				<TabPanel value='animations'>
					<AnimationTable />
				</TabPanel>
				<TabPanel value='staticEffects'>
					<StaticEffectTable />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default TableTabs;
