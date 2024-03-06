import { AnimationT } from '@/types/animation.types';
import {
	Box,
	DialogContent,
	DialogContentText,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

const DuplicateDialogContent = ({
	row,
	isInvalidName,
}: {
	row: AnimationT;
	isInvalidName: boolean;
}) => {
	console.log('🚀 ~ row:', row.type);
	return (
		<DialogContent
			dividers
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
		>
			<DialogContentText>Selected animation to duplicate: {row.name}</DialogContentText>
			<Box sx={{ display: 'flex', gap: 5 }}>
				{/* <TextField
					sx={{ width: '150px' }}
					disabled
					value={'static'}
					// defaultValue={row.type}
					id='type'
					name='type'
					label='Type'
				/> */}
				<FormControl sx={{ width: '150px' }}>
					<InputLabel id='type-select-input'>Type</InputLabel>
					<Select
						readOnly
						required
						// disabled
						fullWidth
						defaultValue={'static'}
						labelId='type-select-input'
						id='type'
						name='type'
						label='Type'
						variant='outlined'
					>
						<MenuItem value={'group'}>Group</MenuItem>
						<MenuItem value={'static'}>Static</MenuItem>
					</Select>
				</FormControl>
				<TextField
					required
					fullWidth
					defaultValue={row.name}
					error={isInvalidName}
					helperText={isInvalidName ? 'Already exist. Choose a different name.' : ' '}
					id='name'
					name='name'
					label='Name'
					type='text'
					variant='outlined'
				/>
			</Box>
			<TextField
				fullWidth
				multiline
				rows={5}
				defaultValue={row.description || ' '}
				id='description'
				name='description'
				label='Description'
				type='text'
				variant='outlined'
			/>
		</DialogContent>
	);
};

export default DuplicateDialogContent;
