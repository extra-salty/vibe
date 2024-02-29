import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { AnimationTypesT } from '@/types/animation.types';
import Animations from './Animations/Animations';
import EffectCreator from '../../EffectCreator/EffectCreator';

const AnimationTabs = () => {
	const [activeTab, setActiveTab] = useState<AnimationTypesT>(AnimationTypesT.group);

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
					<Tab label='Animation Groups' value={AnimationTypesT.group} />
					<Tab label='Dynamic Animations' value={AnimationTypesT.static} />
				</TabList>
				<TabPanel value={AnimationTypesT.group}>
					<Animations />
				</TabPanel>
				<TabPanel value={AnimationTypesT.static}>
					<EffectCreator />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default AnimationTabs;
