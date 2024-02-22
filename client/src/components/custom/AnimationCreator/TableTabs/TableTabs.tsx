import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { AnimationTypesT } from '@/types/table.types';
import StaticAnimations from './StaticAnimations/StaticAnimations';
import AnimationGroups from './AnimationGroups/AnimationGroups';
import { StaticAnimationTableT } from '@/types/staticAnimation.types';
import { MRT_RowData } from 'material-react-table';

const TableTabs = () => {
	const [activeTab, setActiveTab] = useState<AnimationTypesT>(
		AnimationTypesT.staticAnimations,
	);

	const handleTabChange = (_: SyntheticEvent, newValue: string) =>
		setActiveTab(newValue as AnimationTypesT);

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
					<Tab label='Animation Groups' value={AnimationTypesT.animationGroups} />
					<Tab label='Dynamic Animations' value={AnimationTypesT.dynamicAnimations} />
					<Tab label='Static Animations' value={AnimationTypesT.staticAnimations} />
				</TabList>
				<TabPanel value={AnimationTypesT.animationGroups}>
					<AnimationGroups />
				</TabPanel>
				<TabPanel value={AnimationTypesT.dynamicAnimations}>
					<div>Dynamic Animations</div>
				</TabPanel>
				<TabPanel value={AnimationTypesT.staticAnimations}>
					<StaticAnimations<StaticAnimationTableT> />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default TableTabs;
