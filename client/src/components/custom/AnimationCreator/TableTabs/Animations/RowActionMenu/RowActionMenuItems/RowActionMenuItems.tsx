import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { Dispatch, SetStateAction } from 'react';
import { getAnimationsDetail } from '@/state/features/playlist/playlistThunk';
import {
	ContentCopyOutlined,
	DeleteOutlined,
	Edit,
	PlaylistAdd,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';
import { AnimationT, AnimationTypesT } from '@/types/animation.types';
import { staticAnimationActions } from '@/state/features/effect/effectSlice';

const RowActionMenuItems = ({
	row,
	setIsCreateDialogOpen,
	setIsDeleteDialogOpen,
}: {
	row: AnimationT;
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const actions: {
		label: string;
		icon: React.ReactElement<SvgIconProps>;
		hidden?: boolean;
		onClick: () => void;
	}[] = [
		{
			label: 'Add to playlist',
			icon: <PlaylistAdd />,
			onClick: () => dispatch(getAnimationsDetail({ ids: [row._id] })),
		},
		{
			label: 'Duplicate',
			icon: <ContentCopyOutlined />,
			onClick: () => setIsCreateDialogOpen(true),
		},
		{
			label: 'Delete',
			icon: <DeleteOutlined />,
			onClick: () => setIsDeleteDialogOpen(true),
		},
		{
			label: 'Edit',
			icon: <Edit />,
			hidden: row.type !== AnimationTypesT.static,
			onClick: () => dispatch(staticAnimationActions.setEffect(row)),
		},
	];

	return (
		<>
			{actions.map(
				({ icon, label, hidden, onClick }, i) => (
					// hidden ? (
					<MenuItem key={i} onClick={onClick}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText>{label}</ListItemText>
					</MenuItem>
				),
				// ) : null,
			)}
		</>
	);
};

export default RowActionMenuItems;
