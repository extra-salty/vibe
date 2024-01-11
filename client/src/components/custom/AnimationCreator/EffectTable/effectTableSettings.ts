import { UISelectOptionProps } from '@/components/base/UISelect/UISelect.type';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';

export type EffectTableDataT = {
	select: React.ReactNode;
	numbering: number;
	name: React.ReactNode;
	description: React.ReactNode;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	edit: React.ReactNode;
	drag: React.ReactNode;
};

export const effectTableHeader: UITableHeaderProps<EffectTableDataT>[] = [
	{
		key: 'select',
		header: '',
	},
	{
		key: 'numbering',
		header: '#',
	},
	{
		key: 'name',
		header: 'Name',
	},
	{
		key: 'description',
		header: 'Description',
	},
	{
		key: 'frames',
		header: 'F',
	},
	{
		key: 'duration',
		header: 'D',
	},
	{
		key: 'dateCreated',
		header: 'Date created',
	},
	{
		key: 'dateModified',
		header: 'Date modified',
	},
	{
		key: 'edit',
		header: 'Edit',
	},
	{
		key: 'drag',
		header: 'Drag',
	},
];

export const effectTableSortOptions: UISelectOptionProps[] = [
	{
		key: 'name-asc',
		label: 'Name ▴',
	},
	{
		key: 'name-des',
		label: 'Name ▾',
	},
	{
		key: 'description-asc',
		label: 'Description ▴',
	},
	{
		key: 'description-des',
		label: 'Description ▾',
	},
	{
		key: 'dateCreated-asc',
		label: 'Date created ▴',
	},
	{
		key: 'dateCreated-des',
		label: 'Date created ▾',
	},
	{
		key: 'dateModified-asc',
		label: 'Date modified ▴',
	},
	{
		key: 'dateModified-des',
		label: 'Date modified ▾',
	},
];

export const effectTableFilterOptions: UISelectOptionProps[] = [
	{
		key: 'name',
		label: 'Name',
	},
	{
		key: 'description',
		label: 'Description',
	},
	{
		key: 'dateCreated',
		label: 'Date Created',
	},
	{
		key: 'dateModified',
		label: 'Date modified',
	},
];
