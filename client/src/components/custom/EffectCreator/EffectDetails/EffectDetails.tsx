import { useDispatch } from 'react-redux';
import { setEffectDescription, setEffectName } from '@/state/features/effect/effectSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { StateEffectT } from '@/state/features/effect/effectSlice.types';
import UILabel, { UILabelProps } from '@/components/base/UILabel/UILabel';
import UIInput from '@/components/base/UIInput/UIInput';
import UIInputProps from '@/components/base/UIInput/UIInput.type';
import { useActiveEffect } from '@/state/features/effect/effectSelector';

const EffectDetails = ({ effecta }: { effecta?: StateEffectT }) => {
	const dispatch = useDispatch();
	const effect = useActiveEffect();

	const components: { input: UIInputProps; label: UILabelProps }[] = [
		{
			input: {
				value: effect.name,
				onChange: (value) => dispatch(setEffectName(value)),
				id: 'effectName',
				placeholder: 'Enter effect name',
			},
			label: { label: 'Name', htmlFor: 'effectName' },
		},
		{
			input: {
				value: effect.description,
				onChange: (value) => dispatch(setEffectDescription(value)),
				id: 'effectDesc',
				placeholder: 'Enter effect description',
			},
			label: { label: 'Description', htmlFor: 'effectDesc' },
		},
		{
			input: {
				value: convertDate(effect.dateCreated),
				id: 'dateCreated',
				disabled: true,
			},
			label: { label: 'Date Created', htmlFor: 'dateCreated' },
		},
		{
			input: {
				value: convertDate(effect.dateModified),
				id: 'dateModified',
				disabled: true,
			},
			label: { label: 'Date Modified', htmlFor: 'dateModified' },
		},
	];

	return (
		<div className='flex flex-col gap-2'>
			{components.map((comps, i) => (
				<div key={i} className='flex gap-1'>
					<UILabel {...comps.label} classes={['w-40']} />
					<UIInput {...comps.input} classes={['w-full']} />
				</div>
			))}
		</div>
	);
};

export default EffectDetails;
