import { useDispatch } from 'react-redux';
import { setEffectDescription, setEffectName } from '@/state/features/effect/effectSlice';
import { useActiveEffect } from '@/state/features/effect/effectSelector';
import { EffectStateT } from '@/types/effect.types';
import { TextField, TextFieldProps } from '@mui/material';
import { DateTimeField, DateTimeFieldProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import styles from './EffectDetails.module.scss';

const EffectDetails = ({ effecta }: { effecta?: EffectStateT }) => {
	const dispatch = useDispatch();
	const effect = useActiveEffect();

	const texts: TextFieldProps[] = [
		{
			id: 'name',
			label: 'Name',
			placeholder: 'Enter a name',
			value: effect.name,
			required: true,
			onChange: (event) => dispatch(setEffectName(event.target.value)),
		},
		{
			id: 'description',
			label: 'Description',
			placeholder: 'Enter a description',
			value: effect.description,
			multiline: true,
			maxRows: '5',
			onChange: (event) => dispatch(setEffectDescription(event.target.value)),
		},
	];

	// DateTimeFieldProps;
	const dates = [
		{
			id: 'dateCreated',
			label: 'Date created',
			value: dayjs(effect.dateCreated),
		},
		{
			id: 'dateModified',
			label: 'Date mofified',
			value: dayjs(effect.dateModified),
		},
	];

	return (
		<div className={styles.column}>
			{texts.map((props) => (
				<TextField key={props.id} variant='filled' {...props} />
			))}
			<div className={styles.dates}>
				{dates.map((props) => (
					<DateTimeField ampm={false} readOnly key={props.id} variant='filled' {...props} />
				))}
			</div>
		</div>
	);
};

export default EffectDetails;
