import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import Animations from './Animations/Animations';
import StaticEffects from './StaticEffects/StaticEffectst';

const TableTabs = () => {
	const [activeTab, setActiveTab] = useState<string>('animations');

	const handleTabChange = (_: SyntheticEvent, newValue: string) => setActiveTab(newValue);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: '800px',
			}}
		>
			<TabContext value={activeTab}>
				<TabList onChange={handleTabChange} aria-label='tables'>
					<Tab label='Animations' value='animations' />
					<Tab label='Static Effects' value='staticEffects' />
				</TabList>
				<TabPanel value='animations'>
					<Animations />
				</TabPanel>
				<TabPanel value='staticEffects'>
					<StaticEffects />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default TableTabs;
