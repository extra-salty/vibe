import { useDispatch } from 'react-redux';
import {
	resetSelectedAnimations,
	setSelectedAnimations,
} from '@/state/features/animation/animationSlice';
import { AnimationTableDataT } from './useAnimationTableData';
import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';

const useAnimationTableHeader = ({
	animationNames,
}: {
	animationNames: string[];
}): UITableHeaderProps<AnimationTableDataT>[] => {
	const dispatch = useDispatch();

	return [
		{
			id: 'select',
			header: (
				<UICheckbox
					onChange={(isChecked) => {
						if (isChecked) {
							dispatch(setSelectedAnimations(animationNames));
						} else {
							dispatch(resetSelectedAnimations());
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

export default useAnimationTableHeader;
