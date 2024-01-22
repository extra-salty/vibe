import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetSelectedEffects,
	setSelectedEffects,
} from '@/state/features/animation/animationSlice';
import { EffectTableDataT } from './useEffectTableData';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { Checkbox } from '@mui/material';
import UIIcon from '@/components/base/UIIcon/UIIcon';

const useEffectTableHeader = ({
	effectNames,
}: {
	effectNames: string[];
}): UITableHeaderProps<EffectTableDataT>[] => {
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return [
		{
			id: 'select',
			header: (
				<Checkbox
					checked={isChecked}
					onChange={({ target }) => {
						if (target.checked) {
							dispatch(setSelectedEffects(effectNames));
							setIsChecked(true);
						} else {
							dispatch(resetSelectedEffects());
							setIsChecked(false);
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
