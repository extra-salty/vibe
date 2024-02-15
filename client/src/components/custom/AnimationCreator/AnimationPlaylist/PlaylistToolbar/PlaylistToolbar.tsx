import { useState } from 'react';
import { Clear } from '@mui/icons-material';
import { Button } from '@mui/material';
import RemoveDialog from './RemoveDialog/RemoveDialog';

const PlaylistToolbar = ({}: {}) => {
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState<boolean>(false);

	return (
		<>
			<RemoveDialog open={isRemoveDialogOpen} setOpen={setIsRemoveDialogOpen} />
			<div>
				<Button startIcon={<Clear />} onClick={() => setIsRemoveDialogOpen(true)}>
					Remove
				</Button>
			</div>
		</>
	);
};

export default PlaylistToolbar;
