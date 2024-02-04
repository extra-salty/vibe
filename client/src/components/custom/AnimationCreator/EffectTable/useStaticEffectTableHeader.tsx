import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Bolt, Layers, Numbers, Timelapse } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import UILink from '@/components/base/UILink/UILink';
import StaticEffectActions from './StaticEffectActions/StaticEffectActions';

const useStaticEffectTableHeader = (): GridColDef[] => {
	return [
		{
			field: 'id',
			headerName: 'ID',
			filterable: false,
		},
		{
			field: 'index',
			headerName: 'Index',
			sortable: false,
			filterable: false,
			hideable: false,
			disableColumnMenu: true,
			width: 1,
			renderHeader: () => (
				<Tooltip title='Index'>
					<Numbers />
				</Tooltip>
			),
			renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 140,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<UILink href={`effect/${params.value}`}>
					<Tooltip title={'description'}>
						<span>{params.value}</span>
					</Tooltip>
				</UILink>
			),
		},
		{
			field: 'frames',
			headerName: 'Frames',
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
			headerName: 'Duration',
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
			headerName: 'Power consumption',
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
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 1,
			renderHeader: () => null,
			renderCell: () => <StaticEffectActions />,
		},
	];
};

export default useStaticEffectTableHeader;
