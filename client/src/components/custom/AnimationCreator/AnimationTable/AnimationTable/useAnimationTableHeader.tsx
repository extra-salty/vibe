import { AnimationTableDataT } from './useAnimationTableData';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { UISelectOptionProps } from '@/components/base/UISelect/UISelect.type';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';

const useAnimationTableHeader = () => {
	const header: UITableHeaderProps<AnimationTableDataT>[] = [
		{
			key: 'select',
			header: <UICheckbox onChange={() => {}} />,
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
			header: <UIIcon name={Icons.stack} width={15} height={15} />,
		},
		{
			key: 'duration',
			header: <UIIcon name={Icons.timelapse} width={15} height={15} />,
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
			key: 'drag',
			header: 'Drag',
		},
	];

	const sortOptions: UISelectOptionProps[] = [
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

	const filterOptions: UISelectOptionProps[] = [
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

	return {
		header,
		sortOptions,
		filterOptions,
	};
};

export default useAnimationTableHeader;
