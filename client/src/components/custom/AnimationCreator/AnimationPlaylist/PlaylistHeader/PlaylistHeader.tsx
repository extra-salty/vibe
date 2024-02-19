import { usePlaylist } from '@/state/features/animations/animationSelector';
import { animationsActions } from '@/state/features/animations/animationSlice';
import { ChevronRight, ExpandLess, ExpandMore, Numbers } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';

const PlaylistHeader = ({}: {}) => {
	const dispatch = useDispatch();
	const playlist = usePlaylist();

	const dataLength = playlist.data.length;
	const selectedLength = playlist.selected.length;
	const expandedLength = playlist.expanded.length;

	const isAllExpanded = playlist.expanded.length === dataLength;
	const isAllSelected = selectedLength === dataLength;

	const handleSelect = () => {
		const selectedNodes = isAllSelected
			? []
			: playlist.data.map((animation, i) => `${animation.name}/${i}`);
		dispatch(animationsActions.setPlaylistSelection(selectedNodes));
	};

	const handleExpand = () => {
		const expandedNodes = isAllExpanded ? [] : playlist.data.map((_, i) => String(i));

		dispatch(animationsActions.setPlaylistExpansion(expandedNodes));
	};

	return (
		<div>
			<Checkbox
				icon={<ExpandLess />}
				checked={isAllExpanded}
				checkedIcon={<ExpandMore />}
				indeterminate={!isAllExpanded && !!expandedLength}
				indeterminateIcon={<ChevronRight />}
				disabled={!dataLength}
				onChange={handleExpand}
			/>
			<Checkbox
				checked={isAllSelected}
				indeterminate={!isAllSelected && !!selectedLength}
				disabled={!dataLength}
				onChange={handleSelect}
			/>
			<Numbers />
		</div>
	);
};

export default PlaylistHeader;
