import { useDispatch } from 'react-redux';
import { useStaticAnimationsState } from '@/state/features/staticAnimations/staticAnimationsSelector';
import { staticAnimationsActions } from '@/state/features/staticAnimations/staticAnimationsSlice';
import {
	StaticAnimationTablePropsT,
	StaticAnimationTableT,
} from '@/types/staticAnimation.types';
import { initialTableState } from '@/types/table.types';
import { isEqual } from 'lodash';
import TopToolbarInternalActions from '../TopToolbarActions/TopToolbarInternalActions/TopToolbarInternalActions';
import TopToolbarCustomActions from '../TopToolbarActions/TopToolbarCustomActions/TopToolbarCustomActions';

const useStaticAnimationsComponentProps = (): StaticAnimationTablePropsT => {
	const dispatch = useDispatch();
	const state = useStaticAnimationsState();

	const isResetDisabled = isEqual(state, initialTableState);

	return {
		// Toolbar
		renderToolbarInternalActions: ({ table }) => (
			<TopToolbarInternalActions<StaticAnimationTableT>
				table={table}
				isResetDisabled={isResetDisabled}
				onReset={() => dispatch(staticAnimationsActions.resetState())}
			/>
		),
		renderTopToolbarCustomActions: ({ table }) => {
			return (
				<TopToolbarCustomActions
					type='animation'
					selectedRows={table.getSelectedRowModel().rows.map((row) => row.original)}
				/>
			);
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

export default useStaticAnimationsComponentProps;
