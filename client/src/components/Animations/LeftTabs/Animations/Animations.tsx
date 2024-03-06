import useAnimationColumnsProps from './useAnimationsProps/useAnimationsColumnProps';
import useAnimationStateProps from './useAnimationsProps/useAnimationsStateProps';
import useAnimationsComponentProps from './useAnimationsProps/useAnimationsComponentProps';
import { useAnimationsData } from '@/state/features/animationGroups/animationSelector';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const Animations = () => {
	const data = useAnimationsData();
	const stateProps = useAnimationStateProps();
	const { columns, columnProps } = useAnimationColumnsProps();
	const componentProps = useAnimationsComponentProps();

	const table = useMaterialReactTable({
		data: data.static,
		columns,
		...columnProps,
		...stateProps,
		...componentProps,
		// Misc
		enablePagination: false,
		enableRowNumbers: true,
		rowNumberDisplayMode: 'static',
		// getRowId: (row) => row._id,
		// Dragging
		enableRowOrdering: true,
		enableRowDragging: true,
		muiRowDragHandleProps: ({ table }) => ({
			onDragEnd: (asd) => {
				const { draggingRow, hoveredRow } = table.getState();
				console.log('🚀 ~ Animations ~ hoveredRow:', hoveredRow);
				console.log('🚀 ~ Animations ~ draggingRow:', draggingRow);
			},
		}),
	});

	return <MaterialReactTable table={table} />;
};

export default Animations;
