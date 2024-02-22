import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { memo, useState } from 'react';
import { ContentCopyOutlined, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material';
import {
	Dialog,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	SvgIconProps,
} from '@mui/material';
import CreateDialog from '../CreateDialog/CreateDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { StaticAnimationTableT } from '@/types/staticAnimation.types';
import { getStaticAnimation } from '@/state/features/playlist/playlistThunk';

const RowActionMenu = ({
	type,
	row,
}: {
	type: 'staticEffect' | 'animation';
	row: StaticAnimationTableT;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	const actions: {
		label: string;
		icon: React.ReactElement<SvgIconProps>;
		onClick: () => void;
	}[] = [
		{
			label: 'Select',
			icon: <Edit />,
			onClick: () => dispatch(getStaticAnimation({ id: row._id })),
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
			<CreateDialog
				type={type}
				open={isCreateDialogOpen}
				rowParams={row}
				setOpen={setIsCreateDialogOpen}
			/>
			<Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
				<DeleteDialog type={type} setOpen={setIsDeleteDialogOpen} selectedRows={[row]} />
			</Dialog>
			<div>
				<IconButton
					id='frame-menu-button'
					aria-haspopup='true'
					aria-controls={isOpen ? 'frame-menu' : undefined}
					aria-expanded={isOpen ? 'true' : undefined}
					onClick={handleOpen}
				>
					<MoreVert />
				</IconButton>
				<Menu
					id='frame-menu'
					open={isOpen}
					anchorEl={anchorEl}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'frame-menu-button',
					}}
				>
					{actions.map(({ icon, label, onClick }, i) => (
						<MenuItem key={i} onClick={onClick}>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText>{label}</ListItemText>
						</MenuItem>
					))}
				</Menu>
			</div>
		</>
	);
};

export default memo(RowActionMenu);
