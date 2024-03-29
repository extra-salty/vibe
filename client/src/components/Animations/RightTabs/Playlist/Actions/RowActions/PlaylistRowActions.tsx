import { memo, useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Dialog, IconButton, Menu } from '@mui/material';
import PlaylistRowActionItems from './PlaylistRowActionItems/PlaylistRowActionItems';
import { AnimationRowT } from '@/types/animation.types';

const PlaylistRowActions = ({ row }: { row: AnimationRowT }) => {
	const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
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
					<PlaylistRowActionItems
						row={row}
						// setIsCreateDialogOpen={setIsDuplicateDialogOpen}
						// setIsDeleteDialogOpen={setIsDeleteDialogOpen}
					/>
				</Menu>
			</div>
		</>
	);
};

export default memo(PlaylistRowActions);
