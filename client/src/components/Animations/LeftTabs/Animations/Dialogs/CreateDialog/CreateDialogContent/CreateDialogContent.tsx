import {
	Box,
	DialogContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

const CreateDialogContent = ({ isInvalidName }: { isInvalidName: boolean }) => {
	return (
		<DialogContent dividers>
			<Box sx={{ display: 'flex', gap: 5 }}>
				<FormControl sx={{ width: '150px' }}>
					<InputLabel id='type-select-input'>Type</InputLabel>
					<Select
						required
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
				id='description'
				name='description'
				label='Description'
				type='text'
				variant='outlined'
			/>
		</DialogContent>
	);
};

export default CreateDialogContent;
