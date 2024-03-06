import { useAnimationsRowSelection } from '@/state/features/animationGroups/animationSelector';
import { useDispatch } from 'react-redux';
import { memo, useState } from 'react';
import { Add, Delete, Merge, PlaylistAdd } from '@mui/icons-material';
import { Box, Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import { AnimationsTableInstanceT } from '@/types/animation.types';
import CreateDialog from '../../Dialogs/CreateDialog/CreateDialog';
import DeleteDialog from '../../Dialogs/DeleteDialog/DeleteDialog';
import { getAnimationsDetail } from '@/state/features/playlist/playlistThunk';
import { AppDispatch } from '@/state/store';

const TableToolbarCustomActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
	const selectedRowIds = selectedRows.map((row) => row._id as string);
	const isSelectionEmpty = !Object.keys(useAnimationsRowSelection()).length;

	const handlePlaylistChange = () => {
		dispatch(getAnimationsDetail({ ids: selectedRowIds }));
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CreateDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			<Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
				<DeleteDialog selectedRows={selectedRows} setOpen={setIsDeleteDialogOpen} />
			</Dialog>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Tooltip title='Create'>
					<IconButton onClick={() => setIsCreateDialogOpen(true)}>
						<Add />
					</IconButton>
				</Tooltip>
				<Tooltip title='Delete'>
					<span>
						<IconButton
							disabled={isSelectionEmpty}
							onClick={() => setIsDeleteDialogOpen(true)}
						>
							<Delete />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title='Add to playlist'>
					<span>
						<IconButton disabled={isSelectionEmpty} onClick={handlePlaylistChange}>
							<PlaylistAdd />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title='Merge'>
					<span>
						<IconButton disabled={isSelectionEmpty} onClick={() => {}}>
							<Merge />
						</IconButton>
					</span>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default memo(TableToolbarCustomActions);
