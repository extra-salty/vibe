import { UITableHeaderProps } from '@/components/base/UITable/UITable.types';
import { EffectListDataT } from './EffectList/useEffectListData';
import { BaseAnimationT } from '@/app/api/animation/_types';

const useAnimationHeader = ({
	animation,
	index,
}: {
	animation: BaseAnimationT;
	index: number;
}): UITableHeaderProps<EffectListDataT>[] => {
	return [
		{
			key: 'numbering',
			header: ++index,
			classes: 'w-4',
		},
		{
			key: 'name',
			header: animation.name,
			classes: 'w-36',
		},
		{
			key: 'description',
			header: animation.description,
			classes: 'w-4',
		},
		{
			key: 'frames',
			header: 'frames',
			classes: 'w-4',
		},
		{
			key: 'duration',
			header: 'Duration',
			classes: 'w-4',
		},
		{
			key: 'repeat',
			header: 'Repeat',
			classes: 'w-4',
		},
		{
			key: 'edit',
			header: 'Edit',
			classes: 'w-8',
		},
	];
};

export default useAnimationHeader;
