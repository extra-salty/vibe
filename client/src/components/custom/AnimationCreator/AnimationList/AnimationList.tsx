import { usePlaylist } from '@/state/features/animation/animationSelector';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import {
	setAnimationPlaylistExpansion,
	setAnimationPlaylistSelection,
} from '@/state/features/animation/animationSlice';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ChevronRightOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { TreeView } from '@mui/x-tree-view';
import AnimationListItem from './AnimationListItem/AnimationListItem';
import styles from './AnimationList.module.scss';

const AnimationList = () => {
	const dispatch = useDispatch();

	const playlist = usePlaylist();
	const items = playlist.data.map((animation, i) => `${animation.name}/${i}`);

	const handleExpansion = (_: React.SyntheticEvent, nodeIds: string[]) => {
		console.log('expand', nodeIds);
		dispatch(setAnimationPlaylistExpansion(nodeIds));
	};

	const handleSelection = (_: React.SyntheticEvent, nodeIds: string[]) => {
		console.log('select', nodeIds);
		setAnimationPlaylistSelection(nodeIds);
	};

	return (
		<TreeView
			aria-label='animation playlist'
			defaultCollapseIcon={<ExpandMoreOutlined />}
			defaultExpandIcon={<ChevronRightOutlined />}
			multiSelect
			selected={playlist.selection}
			expanded={playlist.expanded}
			onNodeToggle={handleExpansion}
			onNodeSelect={handleSelection}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{playlist.data.map((_, i) => {
					return <AnimationListItem key={i} index={i} />;
				})}
			</SortableContext>
		</TreeView>
	);
};

export default memo(AnimationList);
