import useDeleteTableHeader from './useDeleteTableHeader';
import { AnimationBaseT } from '@/types/animation.types';
import {
	MRT_RowSelectionState,
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import { Dispatch, SetStateAction } from 'react';

const DeleteTable = ({
	data,
	rowSelection,
	setSelection,
}: {
	data: AnimationBaseT[];
	rowSelection: MRT_RowSelectionState;
	setSelection: Dispatch<SetStateAction<string[]>> | any;
}) => {
	const columns = useDeleteTableHeader();

	const table = useMaterialReactTable({
		columns,
		data,
		state: { columnVisibility: { _id: false, description: false }, rowSelection },
		onRowSelectionChange: setSelection,
		getRowId: (row) => row._id,
		//
		rowNumberDisplayMode: 'static',
		positionToolbarAlertBanner: 'bottom',
		enableTopToolbar: false,
		enableToolbarInternalActions: false,
		enablePagination: false,
		enableColumnActions: false,
		enableRowNumbers: true,
		enableRowSelection: true,
		enableBatchRowSelection: true,
	});

	return <MaterialReactTable table={table} />;
};

export default DeleteTable;
