import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { Dispatch, SetStateAction } from 'react';
import { getAnimationsDetail } from '@/state/features/playlist/playlistThunk';
import { ContentCopyOutlined, DeleteOutlined, PlaylistAdd } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, SvgIconProps } from '@mui/material';

const RowActionMenuItems = ({
	id,
	setIsCreateDialogOpen,
	setIsDeleteDialogOpen,
}: {
	id: string;
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const actions: {
		label: string;
		icon: React.ReactElement<SvgIconProps>;
		onClick: () => void;
	}[] = [
		{
			label: 'Select',
			icon: <PlaylistAdd />,
			onClick: () => dispatch(getAnimationsDetail({ ids: [id] })),
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
	];

	return (
		<>
			{actions.map(({ icon, label, onClick }, i) => (
				<MenuItem key={i} onClick={onClick}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>
			))}
		</>
	);
};

export default RowActionMenuItems;
