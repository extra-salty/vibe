import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { addSelectedAnimation } from '@/state/features/animation/animationSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { AnimationT } from '@/state/features/animation/animation.types';
import { AnimationTableDataT } from './animationTableSettings';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import AnimationTableDragButton from './AnimationTableDragButton/AnimationTableDragButton';
import Link from 'next/link';

const useAnimationTableData = ({
	animations,
}: {
	animations: AnimationT[];
}): AnimationTableDataT[] => {
	const dispatch = useDispatch();
	const selectedAnimations = useSelectedAnimations();

	return animations.map((animation, i) => {
		const { name, description, dateCreated, dateModified, effects } = animation;
		const isSelected = selectedAnimations.includes(name);

		return {
			select: (
				<UICheckbox isChecked={isSelected} onChange={() => dispatch(addSelectedAnimation(name))} />
			),
			numbering: ++i,
			name,
			description: description || '-',
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			edit: (
				<Link href={`/effect/${name}`}>
					<UIIcon name={Icons.edit} width={15} height={15} />
				</Link>
			),
			drag: <AnimationTableDragButton animationName={name} />,
		};
	});
};

export default useAnimationTableData;
