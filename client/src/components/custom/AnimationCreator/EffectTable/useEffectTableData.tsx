import { useDispatch } from 'react-redux';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { addSelectedEffect } from '@/state/features/animation/animationSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { EffectTableT } from '@/types/effect.types';
import EffectTableDragButton from './EffectTableDragButton/EffectTableDragButton';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import UILink from '@/components/base/UILink/UILink';

export type EffectTableDataT = {
	select: React.ReactNode;
	numbering: number;
	name: React.ReactNode;
	description: React.ReactNode;
	frames: number;
	duration: number;
	dateCreated: string;
	dateModified: string;
	drag: React.ReactNode;
};

const useEffectTableData = ({
	effects,
	selectedEffects,
}: {
	effects: EffectTableT[];
	selectedEffects: string[];
}): EffectTableDataT[] => {
	const dispatch = useDispatch();

	return effects.map(
		({ name, description, dateCreated, dateModified, framesLength, duration }, i) => ({
			select: (
				<UICheckbox
					isChecked={selectedEffects.includes(name)}
					onChange={() => dispatch(addSelectedEffect(name))}
				/>
			),
			numbering: ++i,
			name: <UILink href={`/effect/${name}`}>{name}</UILink>,
			description: description || '-',
			frames: framesLength,
			duration: duration,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			drag: <EffectTableDragButton effectName={name} />,
		}),
	);
};

export default useEffectTableData;
