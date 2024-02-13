import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Bolt, Layers, Numbers, Timelapse } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import TableRowMenu from '@/components/custom/TableComps/TableRowMenu/TableRowMenu';
import dayjs from 'dayjs';
import StaticEffectTableDragButton from './StaticEffectTableDragButton/StaticEffectTableDragButton';

const useStaticEffectTableHeader = (): GridColDef[] => {
	return [
		{
			field: 'index',
			headerName: 'Index',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
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
			field: '_id',
			headerName: 'ID',
			filterable: false,
			width: 220,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 140,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<Tooltip title={params.row.description}>
					<span>{params.value}</span>
				</Tooltip>
			),
		},
		{
			field: 'description',
			headerName: 'Description',
			width: 200,
			sortable: false,
		},
		{
			field: 'framesLength',
			headerName: 'Frames',
			type: 'number',
			sortable: false,
			filterable: true,
			width: 70,
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
			sortable: false,
			width: 70,
			renderHeader: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
			valueFormatter: (params) => Number((params.value / 1000).toFixed(2)),
		},
		{
			field: 'power',
			headerName: 'Power consumption',
			type: 'number',
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
			align: 'center',
			headerAlign: 'center',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 60,
			renderCell: (params: GridRenderCellParams<any, string>) => (
				<StaticEffectTableDragButton effectName={params.row.name} />
				// <Tooltip title={params.row.description}>
				// 	<div>Asd</div>
				// </Tooltip>
			),
		},
		{
			field: 'menu',
			headerName: 'Menu',
			align: 'center',
			headerAlign: 'center',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			width: 60,
			// renderHeader: () => null,
			renderCell: (params) => (
				<TableRowMenu
					type='staticEffect'
					rowParams={{
						_id: params.row._id,
						name: params.row.name,
						description: params.row.description,
					}}
				/>
			),
		},
	];
};

export default useStaticEffectTableHeader;
