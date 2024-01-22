import { useDispatch } from 'react-redux';
import { addSelectedEffect } from '@/state/features/animation/animationSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { EffectTableT } from '@/types/effect.types';
import { Checkbox } from '@mui/material';
import EffectTableDragButton from './EffectTableDragButton/EffectTableDragButton';
import UILink from '@/components/base/UILink/UILink';
import { useRouter } from 'next/router';

export type EffectTableDataT = {
	select: React.ReactNode;
	numbering: number;
	name: React.ReactNode;
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

	const handleEffectRoute = (effectName: string) => {
		// router.push(`/effect/${effectName}`);
	};

	return effects.map(
		({ name, description, dateCreated, dateModified, framesLength, duration }, i) => ({
			select: (
				<Checkbox
					checked={selectedEffects.includes(name)}
					onChange={() => dispatch(addSelectedEffect(name))}
				/>
			),
			numbering: ++i,
			name: <UILink href={`/effect/${name}`}>{name}</UILink>,
			frames: framesLength,
			duration: duration,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			drag: <EffectTableDragButton effectName={name} />,
		}),
	);
};

export default useEffectTableData;
