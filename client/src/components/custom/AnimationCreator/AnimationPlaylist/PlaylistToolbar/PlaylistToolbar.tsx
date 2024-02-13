import { useDispatch } from 'react-redux';
import { usePlaylist } from '@/state/features/animation/animationSelector';
import {
	CheckBox,
	CheckBoxOutlineBlank,
	ExpandLess,
	ExpandMore,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { animationActions } from '@/state/features/animation/animationSlice';

const PlaylistToolbar = ({}: {}) => {
	const dispatch = useDispatch();
	const playlist = usePlaylist();

	const handleExpand = () => {
		console.log('expand');
	};

	const handleSelect = () => {
		console.log('select');
	};

	return (
		<div>
			<Button
				disabled={!playlist.data.length}
				startIcon={playlist.expanded.length ? <ExpandMore /> : <ExpandLess />}
				onClick={handleExpand}
			>
				{playlist.expanded.length === 0 ? 'Expand all' : 'Collapse all'}
			</Button>
			<Button
				disabled={!playlist.data.length}
				startIcon={playlist.expanded.length ? <CheckBoxOutlineBlank /> : <CheckBox />}
				onClick={handleSelect}
			>
				{playlist.selection.length === 0 ? 'Select all' : 'Unselect all'}
			</Button>
			<Button onClick={() => dispatch(animationActions.resetPlaylist())}>Remove</Button>
		</div>
	);
};

export default PlaylistToolbar;
