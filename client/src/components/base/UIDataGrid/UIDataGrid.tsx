import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

type UIDataGridProps = {
	rows: any;
	columns: any;
	initialState: any;
};

const UIDataGrid = ({ rows, columns, initialState }: UIDataGridProps) => {
	return (
		<DataGrid
			rows={rows}
			columns={columns}
			initialState={initialState}
			// pageSizeOptions={[5]}
			checkboxSelection
			disableRowSelectionOnClick
		/>
	);
};

export default UIDataGrid;
