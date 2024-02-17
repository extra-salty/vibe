import { useAnimations } from '@/state/features/animation/animationSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import useAnimationsColumns from './useAnimationsColumns';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';
import { useDispatch } from 'react-redux';
import { animationActions } from '@/state/features/animation/animationSlice';

const Animations = ({}: {}) => {
	const dispatch = useDispatch();
	const animations = useAnimations();
	console.log('🚀 ~ Animations ~ animations:', animations.state);
	const columns = useAnimationsColumns();

	const table = useMaterialReactTable({
		columns,
		data: animations.data,
		getRowId: (row) => row._id,
		// initialState: { ...animations.state },
		state: animations.state,
		// onRowSelectionChange: dispatch(animationActions.setAnimationsRowSelection),

		// onRowSelectionChange: (rowSelection) => {
		// 	const asd = rowSelection(
		// 		dispatch(animationActions.setAnimationsRowSelection(rowSelection)),
		// 	);
		// 	console.log('🚀 ~ Animations ~ rowSelection:', rowSelection);
		// },
		// onSortingChange: setSorting,
		//
		enableRowNumbers: true,
		rowNumberDisplayMode: 'static',
		//
		muiTableContainerProps: { sx: { height: '700px' } },
		//
		enablePagination: false,
		//
		// state: {rowSelection}
		enableRowSelection: true,
		enableBatchRowSelection: true,
		//
		renderToolbarInternalActions: ({ table }) => (
			<TopToolbarInternalActions table={table} type='animation' isResetDisabled />
		),
		renderTopToolbarCustomActions: ({ table }) => (
			<TopToolbarCustomActions
				type='animation'
				selectedRows={table.getSelectedRowModel().rows.map((row) => row.original)}
			/>
		),
	});

	return <MaterialReactTable table={table} />;
};

export default Animations;
