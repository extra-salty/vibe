import useDeleteTableHeader from './useDeleteTableHeader';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';

const DeleteTable = ({
	data,
	selection,
	setSelection,
}: {
	data: GridValidRowModel[];
	selection: string[];
	setSelection: Dispatch<SetStateAction<string[]>>;
}) => {
	const header = useDeleteTableHeader();

	return (
		<DataGrid
			rows={data}
			columns={header}
			getRowId={(row) => row._id}
			//
			rowSelectionModel={selection}
			onRowSelectionModelChange={(newSelection) => {
				console.log('🚀 ~ newSelection:', newSelection);
				setSelection(newSelection.map((id) => id as string));
			}}
			columnVisibilityModel={{ _id: false, description: false }}
			//
			checkboxSelection
			hideFooter
			disableColumnMenu
			disableColumnFilter
			disableColumnSelector
		></DataGrid>
	);
};

export default DeleteTable;
