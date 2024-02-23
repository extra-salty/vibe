import { AnimationsTablePropsT } from '@/types/animation.types';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';

const useAnimationsComponentProps = (): AnimationsTablePropsT => {
	return {
		// Toolbar
		renderTopToolbarCustomActions: ({ table }) => (
			<TopToolbarCustomActions table={table} />
		),
		renderToolbarInternalActions: ({ table }) => (
			<TopToolbarInternalActions table={table} />
		),
		// Actions
		// enableRowActions: true,
		// positionActionsColumn: 'last',
		// renderRowActionMenuItems: ({ row, table }) => [
		// 	// <MenuItem key='edit' onClick={() => console.info('Edit')}>
		// 	// 	Edit
		// 	// </MenuItem>,
		// 	// <MenuItem key='delete' onClick={() => console.info('Delete')}>
		// 	// 	Delete
		// 	// </MenuItem>,
		// 	<MRT_ActionMenuItem //or just use a normal MUI MenuItem component
		// 		icon={<Edit />}
		// 		key='edit'
		// 		label='Edit'
		// 		onClick={() => console.info('Edit')}
		// 		table={table}
		// 	/>,
		// ],
		// enableEditing: true,
	};
};

export default useAnimationsComponentProps;
