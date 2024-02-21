import { Tooltip } from '@mui/material';
import { Layers, Timelapse } from '@mui/icons-material';
import { MRT_ColumnDef } from 'material-react-table';
import { AnimationT } from '@/types/animation.types';
import dayjs from 'dayjs';

const useDeleteTableColumns = (): MRT_ColumnDef<AnimationT>[] => {
	return [
		{
			accessorKey: '_id',
			header: 'ID',
			// filterable: false,
			// width: 220,
		},
		{
			accessorKey: 'name',
			header: 'Name',
			size: 100,
			Cell: ({ row }) => (
				<Tooltip title={row.original.description}>
					<span>{row.original.name}</span>
				</Tooltip>
			),
		},
		{
			accessorKey: 'description',
			header: 'Description',
			// width: 200,
			// sortable: false,
		},
		{
			accessorKey: 'framesLength',
			header: 'Frames',
			// type: 'number',
			// sortable: false,
			// filterable: true,
			size: 30,
			Header: () => (
				<Tooltip title='Number of frames'>
					<Layers />
				</Tooltip>
			),
		},
		{
			accessorKey: 'duration',
			header: 'Duration',
			visibleInShowHideMenu: false,
			// sortable: false,
			size: 30,
			Header: () => (
				<Tooltip title='Duration'>
					<Timelapse />
				</Tooltip>
			),
			Cell: ({ cell }) => Number((cell.getValue<number>() / 1000).toFixed(2)),
		},
		{
			accessorKey: 'dateModified',
			header: 'Date modified',
			size: 120,
			Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('YY/MM/DD HH:MM:ss'),
		},
	];
};

export default useDeleteTableColumns;
