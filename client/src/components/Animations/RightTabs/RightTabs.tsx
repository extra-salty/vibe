import { SyntheticEvent, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import Playlist from './Playlist/Playlist';
import Color from './Color/Color';

export enum Tabs {
	playlist = 'playlist',
	color = 'color',
}

const RightTabs = () => {
	const [activeTab, setActiveTab] = useState<Tabs>(Tabs.playlist);

	const handleTabChange = (_: SyntheticEvent, newValue: string) =>
		setActiveTab(newValue as Tabs);

	return (
		<TabContext value={activeTab}>
			<TabList onChange={handleTabChange} aria-label='tables'>
				<Tab label='Playlist' value={Tabs.playlist} />
				<Tab label='Color' value={Tabs.color} />
			</TabList>
			<TabPanel value={Tabs.playlist}>
				<Playlist />
			</TabPanel>
			<TabPanel value={Tabs.color}>
				<Color />
			</TabPanel>
		</TabContext>
	);
};

export default RightTabs;
