import { memo, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { Box, Button, Dialog } from '@mui/material';
import { AnimationBaseT } from '@/types/animation.types';
import CreateDialog from '@/components/custom/TableComps/CreateDialog/CreateDialog';
import DeleteDialog from '@/components/custom/TableComps/DeleteDialog/DeleteDialog';

const TableToolbarCustomActions = ({
	type,
	selectedRows,
}: {
	type: 'staticEffect' | 'animation';
	selectedRows: AnimationBaseT[] | any;
}) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<CreateDialog
				type={type}
				open={isCreateDialogOpen}
				setOpen={setIsCreateDialogOpen}
			/>
			<Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
				<DeleteDialog
					type={type}
					selectedRows={selectedRows}
					setOpen={setIsDeleteDialogOpen}
				/>
			</Dialog>
			<div>
				<Button
					size='large'
					startIcon={<Add />}
					onClick={() => setIsCreateDialogOpen(true)}
				>
					Create
				</Button>
				<Button
					size='large'
					startIcon={<Delete />}
					disabled={!selectedRows.length}
					onClick={() => setIsDeleteDialogOpen(true)}
				>
					Delete
				</Button>
			</div>
		</Box>
	);
};

export default memo(TableToolbarCustomActions);
