import { useDispatch } from 'react-redux';
import { getAnimation } from '@/state/features/animations/animationsThunk';
import { AppDispatch } from '@/state/store';
import { memo, useState } from 'react';
import { ContentCopyOutlined, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material';
import { Dialog, IconButton, Menu } from '@mui/material';
import UIMenuItem, { MenuItemProps } from '@/components/base/UIMenuItem/UIMenuItem';
import CreateDialog from '../CreateDialog/CreateDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { AnimationBaseT } from '@/types/animation.types';

const RowActionMenuItems = ({
	type,
	row,
}: {
	type: 'staticEffect' | 'animation';
	row: AnimationBaseT;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const actions: MenuItemProps[] = [
		{
			icon: <Edit />,
			label: 'Select',
			onClick: () => dispatch(getAnimation({ id: row._id })),
		},
		{
			icon: <ContentCopyOutlined />,
			label: 'Duplicate',
			onClick: () => setIsCreateDialogOpen(true),
		},
		{
			icon: <DeleteOutlined />,
			label: 'Delete',
			onClick: () => setIsDeleteDialogOpen(true),
		},
	];

	return (
		<>
			<CreateDialog
				type={type}
				rowParams={row}
				open={isCreateDialogOpen}
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
					{actions.map((actionProps, i) => (
						<UIMenuItem key={i} {...actionProps} onClose={handleClose} />
					))}
				</Menu>
			</div>
		</>
	);
};

export default memo(RowActionMenuItems);