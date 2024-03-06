import { AnimationsTablePropsT } from '@/types/animation.types';
import PlaylistCustomActions from '../Actions/CustomActions/PlaylistCustomActions';
import PlaylistInternalActions from '../Actions/InternalActions/PlaylistInternalActions';

const usePlaylistComponentProps = (): AnimationsTablePropsT => {
	return {
		// Toolbar
		renderTopToolbarCustomActions: ({ table }) => <PlaylistCustomActions table={table} />,
		renderToolbarInternalActions: ({ table }) => (
			<PlaylistInternalActions table={table} />
		),
		// Styling
		muiTablePaperProps: {
			sx: {
				height: '100%',
			},
		},
		muiTableContainerProps: ({ table }) => {
			const tabsHeight = 48;
			const topToolbarHeight = table.refs.topToolbarRef.current?.offsetHeight || 0;
			const bottomToolbarHeight = table.refs.bottomToolbarRef.current?.offsetHeight || 0;
			const overallHeight = tabsHeight + topToolbarHeight + bottomToolbarHeight;

			return {
				sx: {
					height: `calc(100% - ${overallHeight}px)`,
				},
			};
		},
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

export default usePlaylistComponentProps;
