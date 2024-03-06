import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { Dispatch, SetStateAction } from 'react';
import { getAnimationsDetail } from '@/state/features/playlist/playlistThunk';
import { CreateNewFolder, Edit, PlaylistRemove } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import { AnimationRowT, AnimationTypesT } from '@/types/animation.types';
import { playlistActions } from '@/state/features/playlist/playlistSlice';
import { PlaylistIndex } from '@/types/playlist.types';

const PlaylistRowActionItems = ({ row }: { row: AnimationRowT }) => {
	const dispatch = useDispatch<AppDispatch>();

	const parentIndexes = row
		.getParentRow()
		?.id.split('.')
		.map((id) => Number(id));
	// childIndex: row.index,

	const indexes = parentIndexes ? [...parentIndexes, row.index] : [row.index];

	const actions: {
		label: string;
		icon: React.ReactElement<SvgIconProps>;
		hidden?: boolean;
		onClick: () => void;
	}[] = [
		{
			label: 'Edit',
			icon: <Edit />,
			onClick: () => {},
			// dispatch(staticAnimationActions.setEffect())
		},
		{
			label: 'Remove',
			icon: <PlaylistRemove />,
			onClick: () => {
				// dispatch(
				// 	playlistActions.removeAnimation(index),
				// );
			},
		},
		{
			label: 'Add group',
			icon: <CreateNewFolder />,
			hidden: row.original.type === AnimationTypesT.static,
			onClick: () => {
				console.log(indexes);
				dispatch(playlistActions.addGroup(indexes));
			},
		},
		{
			label: 'Add static',
			icon: <CreateNewFolder />,
			onClick: () => dispatch(playlistActions.addStatic(indexes)),
		},
	];

	return (
		<>
			{actions.map(({ icon, label, hidden, onClick }, i) =>
				!hidden ? (
					<MenuItem key={i} onClick={onClick}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText>{label}</ListItemText>
					</MenuItem>
				) : null,
			)}
		</>
	);
};

export default PlaylistRowActionItems;
