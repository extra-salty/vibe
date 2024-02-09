import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAnimationTableSelection } from '@/state/features/animation/animationSelector';
import { selectAnimation } from '@/state/features/animation/animationSlice';
import { IconButton, Menu } from '@mui/material';
import { ContentCopyOutlined, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import UIMenuItem, { MenuItemProps } from '@/components/base/UIMenuItem/UIMenuItem';
import DeleteDialog from '../AnimationTableToolbar/DeleteDialog/DeleteDialog';
import CreateDialog from '../AnimationTableToolbar/CreateDialog/CreateDialog';
import { AnimationCreateT } from '@/types/animation.types';

const AnimationTableActions = ({ animation }: { animation: AnimationCreateT }) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const effectActions: MenuItemProps[] = [
		{
			icon: <Edit />,
			label: 'Edit',
			onClick: () => {},
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
				animation={animation}
				open={isCreateDialogOpen}
				setOpen={setIsCreateDialogOpen}
			/>
			{/* <DeleteDialog selection={[id]} open={isDeleteDialogOpen} setOpen={setIsDeleteDialogOpen} /> */}
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
					{effectActions.map((actionProps, i) => (
						<UIMenuItem key={i} {...actionProps} onClose={handleClose} />
					))}
				</Menu>
			</div>
		</>
	);
};

export default memo(AnimationTableActions);
