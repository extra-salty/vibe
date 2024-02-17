import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import StaticEffectTable from './StaticEffectTable/StaticEffectTable';
import AnimationTable from './AnimationTable/AnimationTable';
import Animations from './Animations/Animations';

const TableTabs = () => {
	const [activeTab, setActiveTab] = useState<string>('animations2');

	const handleTabChange = (_: SyntheticEvent, newValue: string) => setActiveTab(newValue);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '800px' }}
		>
			<TabContext value={activeTab}>
				<TabList onChange={handleTabChange} aria-label='tables'>
					<Tab label='Animations2' value='animations2' />
					<Tab label='Animations' value='animations' />
					<Tab label='Static Effects' value='staticEffects' />
				</TabList>
				<TabPanel value='animations2'>
					<Animations />
				</TabPanel>
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
