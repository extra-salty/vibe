import { useUser } from '@/state/Providers/UserProvider/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Box, Button, Drawer, TextField, Typography } from '@mui/material';
import AccountDeletionDialog from './AccountDeleteDialog/AccountDeleteDialog';
import Image from 'next/image';

const AccountDrawer = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const user = useUser();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	return (
		<>
			<AccountDeletionDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
			<Drawer
				anchor='right'
				open={open}
				onClose={() => setOpen(false)}
				PaperProps={{
					sx: {
						width: '350px',
						padding: '50px',
						height: 'calc(100% - 100px)',
					},
				}}
				sx={{
					zIndex: '2000 !important',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						flexGrow: '1',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '25px',
							alignItems: 'center',
						}}
					>
						<Typography variant='h4' sx={{ marginBottom: '25px' }}>
							User Profile
						</Typography>
						<Avatar
							alt={user?.profile.name}
							// src={data?.user?.image as string | undefined}
							sx={{ width: 128, height: 128, fontSize: '32px' }}
							slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
						/>
						<TextField
							fullWidth
							value={user?.profile.name}
							id='name'
							label='Name'
							InputProps={{
								readOnly: true,
							}}
						/>
						<TextField
							fullWidth
							value={user?.profile.email}
							id='email'
							label='Email Address'
							InputProps={{
								readOnly: true,
							}}
						/>
					</Box>
					<Button
						variant='outlined'
						color='warning'
						onClick={() => setIsDialogOpen(true)}
					>
						DELETE PROFILE
					</Button>
				</Box>
			</Drawer>
		</>
	);
};

export default AccountDrawer;
