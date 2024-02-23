import { AnimationsTablePropsT } from '@/types/animation.types';
import PlaylistCustomActions from '../PlaylistToolbarActions/PlaylistCustomActions/PlaylistCustomActions';
import PlaylistInternalActions from '../PlaylistToolbarActions/PlaylistInternalActions/PlaylistInternalActions';

const usePlaylistComponentProps = (): AnimationsTablePropsT => {
	return {
		// Toolbar
		renderTopToolbarCustomActions: ({ table }) => <PlaylistCustomActions table={table} />,
		renderToolbarInternalActions: ({ table }) => (
			<PlaylistInternalActions table={table} />
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

export default usePlaylistComponentProps;
