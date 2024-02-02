import { useDispatch } from 'react-redux';
import {
	resetSelectedAnimations,
	setSelectedAnimations,
} from '@/state/features/animation/animationSlice';
import { AnimationBaseT } from '@/types/animation.types';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { Bolt, Layers, Timelapse } from '@mui/icons-material';
import dayjs from 'dayjs';

const useAnimationTableHeader = (animations: AnimationBaseT[]): GridColDef[] => {
	return [
		// {
		// 	id: 'select',
		// 	header: (
		// 		<UICheckbox
		// 			onChange={(isChecked) => {
		// 				if (isChecked) {
		// 					dispatch(setSelectedAnimations(animationNames));
		// 				} else {
		// 					dispatch(resetSelectedAnimations());
		// 				}
		// 			}}
		// 		/>
		// 	),
		// },
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'index',
			headerName: '#',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 1,
			renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 140,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<Tooltip title={'description'}>
					<span>{params.value}</span>
				</Tooltip>
			),
		},
		// {
		// 	id: 'description',
		// 	header: 'Description',
		// },
		{
			field: 'frames',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			filterable: true,
			sortable: false,
			width: 70,
			description: 'asdasd',
			renderHeader: () => (
				<Tooltip title='Number of frames'>
					<Layers />
				</Tooltip>
			),
		},
		{
			field: 'duration',
			type: 'number',
			description: 'blablabla',
			align: 'left',
			headerAlign: 'left',
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
		},
		{
			field: 'power',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Power consumption'>
					<Bolt />
				</Tooltip>
			),
		},
		{
			field: 'dateModified',
			headerName: 'Date modified',
			type: 'dateTime',
			width: 140,
			valueFormatter: (params) => dayjs(params.value).format('YY/MM/DD HH:MM:ss'),
		},
		{
			field: 'dateCreated',
			headerName: 'Date created',
			type: 'dateTime',
			width: 140,
			valueFormatter: (params) => dayjs(params.value).format('YY/MM/DD HH:MM:ss'),
		},
		{
			field: 'drag',
			headerName: 'Drag',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 60,
		},
	];
};

export default useAnimationTableHeader;
