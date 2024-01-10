import { useDispatch } from 'react-redux';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { setSelectedEffect } from '@/state/features/animation/animationSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { EffectTableDataT } from './effectTableSettings';
import EffectTableDragButton from '../EffectTableDragButton/EffectTableDragButton';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import Link from 'next/link';

const useEffectTableData = ({ effects }: { effects: BaseEffectT[] }): EffectTableDataT[] => {
	const dispatch = useDispatch();
	const selectedEffects = useSelectedEffects();

	return effects.map((effect, i) => {
		const { name, description, dateCreated, dateModified, frames } = effect;
		const isSelected = selectedEffects.includes(name);

		return {
			select: (
				<UICheckbox isChecked={isSelected} onChange={() => dispatch(setSelectedEffect(name))} />
			),
			numbering: ++i,
			name,
			description: description || '-',
			frames: frames.length,
			duration: frames.reduce((duration, frame) => duration + frame.duration, 0) / 1000,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			edit: (
				<Link href={`/effect/${name}`}>
					<UIIcon name={Icons.edit} width={15} height={15} />
				</Link>
			),
			drag: <EffectTableDragButton effectName={name} />,
		};
	});
};

export default useEffectTableData;
