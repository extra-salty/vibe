import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import StaticEffects from './StaticEffects/StaticEffects';
import Animations from './Animations/Animations';

export enum TableTabsT {
	animationGroups = 'animationGroups',
	staticAnimations = 'staticAnimationss',
	dynamicAnimations = 'dynamicAnimations',
}

const TableTabs = () => {
	const [activeTab, setActiveTab] = useState<TableTabsT>(TableTabsT.staticAnimations);

	const handleTabChange = (_: SyntheticEvent, newValue: string) =>
		setActiveTab(newValue as TableTabsT);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<TabContext value={activeTab}>
				<TabList onChange={handleTabChange} aria-label='tables'>
					<Tab label='Animation Groups' value={TableTabsT.animationGroups} />
					<Tab label='Dynamic Animations' value={TableTabsT.dynamicAnimations} />
					<Tab label='Static Animations' value={TableTabsT.staticAnimations} />
				</TabList>
				<TabPanel value={TableTabsT.animationGroups}></TabPanel>
				<TabPanel value={TableTabsT.dynamicAnimations}>
					<Animations />
				</TabPanel>
				<TabPanel value={TableTabsT.staticAnimations}>
					<StaticEffects />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default TableTabs;
