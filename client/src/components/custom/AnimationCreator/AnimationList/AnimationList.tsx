import { usePlaylist } from '@/state/features/animations/animationSelector';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TreeView } from '@mui/x-tree-view';
import AnimationListItem from './AnimationListItem/AnimationListItem';
import styles from './AnimationList.module.scss';

const AnimationList = () => {
	const dispatch = useDispatch();

	const playlist = usePlaylist();
	const items = playlist.data.map((animation, i) => `${animation.name}/${i}`);

	const handleExpansion = (_: React.SyntheticEvent, nodeIds: string[]) =>
		dispatch(animationsActions.setPlaylistExpansion(nodeIds));

	const handleSelection = (_: React.SyntheticEvent, nodeIds: string[]) =>
		dispatch(animationsActions.setPlaylistSelection(nodeIds));

	return (
		<TreeView
			aria-label='animation playlist'
			defaultCollapseIcon={<ExpandMore />}
			defaultExpandIcon={<ExpandLess />}
			multiSelect
			selected={playlist.selected}
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
