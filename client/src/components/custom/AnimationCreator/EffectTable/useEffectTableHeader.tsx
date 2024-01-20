import { useDispatch } from 'react-redux';
import {
	resetSelectedEffects,
	setSelectedEffects,
} from '@/state/features/animation/animationSlice';
import { EffectTableDataT } from './useEffectTableData';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';

const useEffectTableHeader = ({
	effectNames,
}: {
	effectNames: string[];
}): UITableHeaderProps<EffectTableDataT>[] => {
	const dispatch = useDispatch();

	return [
		{
			id: 'select',
			header: (
				<UICheckbox
					onChange={(isChecked) => {
						if (isChecked) {
							dispatch(setSelectedEffects(effectNames));
						} else {
							dispatch(resetSelectedEffects());
						}
					}}
				/>
			),
		},
		{
			id: 'numbering',
			header: '#',
		},
		{
			id: 'name',
			header: 'Name',
			isSortable: true,
			// classes: 'asd',
		},
		{
			id: 'description',
			header: 'Description',
			isSortable: true,
		},
		{
			id: 'frames',
			header: <UIIcon name={Icons.stack} width={15} height={15} />,
		},
		{
			id: 'duration',
			header: <UIIcon name={Icons.timelapse} width={15} height={15} />,
		},
		{
			id: 'dateCreated',
			header: 'Date created',
			isSortable: true,
		},
		{
			id: 'dateModified',
			header: 'Date modified',
			isSortable: true,
		},
		{
			id: 'drag',
			header: 'Drag',
		},
	];
};

export default useEffectTableHeader;
