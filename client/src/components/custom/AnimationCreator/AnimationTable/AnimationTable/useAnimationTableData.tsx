import { useDispatch } from 'react-redux';
import { useSelectedAnimations } from '@/state/features/animation/animationSelector';
import { addSelectedAnimation } from '@/state/features/animation/animationSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { BaseAnimationT } from '@/state/features/animation/animation.types';
import AnimationTableDragButton from './AnimationTableDragButton/AnimationTableDragButton';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';

export type AnimationTableDataT = {
	select: React.ReactNode;
	numbering: number;
	name: string;
	description: string;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	drag: React.ReactNode;
};

const useAnimationTableData = ({
	animations,
}: {
	animations: BaseAnimationT[];
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
			frames: 0,
			duration: 0,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			drag: <AnimationTableDragButton animationName={name} />,
		};
	});
};

export default useAnimationTableData;

// edit: (
//   <Link href={`/effect/${name}`}>
//     <UIIcon name={Icons.edit} width={15} height={15} />
//   </Link>
// ),
