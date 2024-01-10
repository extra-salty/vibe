import { useDispatch } from 'react-redux';
import { useSelectedEffects } from '@/state/features/animation/animationSelector';
import { memo, useCallback, useState } from 'react';
import { UISelectOptionProps } from '@/components/base/UISelect/UISelect.type';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import { BaseEffectT, Effect } from '@/state/features/effect/effectSlice.types';
import EffectListItem from '../EffectListItem/EffectListItem';
import UISelect from '@/components/base/UISelect/UISelect';
import UIInput from '@/components/base/UIInput/UIInput';
import UIButton from '@/components/base/UIButton/UIButton';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';

const EffectList = ({ effects }: { effects: BaseEffectT[] }) => {
	const dispatch = useDispatch();
	const selectedEffects = useSelectedEffects();

	const [effectsData, setEffectsData] = useState<BaseEffectT[]>(effects);
	const [sortOption, setSortOption] = useState<string>('name-asc');
	const [filterOption, setFilterOption] = useState<string>('name');
	const [filterValue, setFilterValue] = useState<string>('');

	const getStaticEffectsData = useCallback(async () => {
		const data = await VibeServiceInstance.getEffects({
			sortOption,
			filterOption,
			filterValue,
		});
		setEffectsData(data);
	}, [filterValue, filterOption, sortOption]);

	const handleCreateEffect = async () => {
		try {
			const newEffect = new Effect('name', 'description');

			await VibeServiceInstance.createEffect(newEffect);
			getStaticEffectsData();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeleteEffects = async () => {
		try {
			await VibeServiceInstance.deleteEffects(selectedEffects);
			getStaticEffectsData();
		} catch (e) {
			console.error(e);
		}
	};

	const actionButtons: UIButtonProps[] = [
		{
			text: 'Create',
			icon: Icons.add,
			onClick: handleCreateEffect,
		},
		{
			text: 'Delete',
			icon: Icons.delete,
			onClick: handleDeleteEffects,
			disabled: !selectedEffects.length,
		},
		{
			text: 'Duplicate',
			icon: Icons.duplicate,
			onClick: handleDeleteEffects,
			disabled: !(selectedEffects.length === 1),
		},
		{
			text: 'Select All ',
			onClick: handleDeleteEffects,
			disabled: !(selectedEffects.length === 1),
		},
	];

	const sortOptions: UISelectOptionProps[] = [
		{
			key: 'name-asc',
			label: 'Name ▴',
		},
		{
			key: 'name-des',
			label: 'Name ▾',
		},
		{
			key: 'description-asc',
			label: 'Description ▴',
		},
		{
			key: 'description-des',
			label: 'Description ▾',
		},
		{
			key: 'dateCreated-asc',
			label: 'Date created ▴',
		},
		{
			key: 'dateCreated-des',
			label: 'Date created ▾',
		},
		{
			key: 'dateModified-asc',
			label: 'Date modified ▴',
		},
		{
			key: 'dateModified-des',
			label: 'Date modified ▾',
		},
	];

	const filterOptions: UISelectOptionProps[] = [
		{
			key: 'name',
			label: 'Name',
		},
		{
			key: 'description',
			label: 'Description',
		},
		{
			key: 'dateCreated',
			label: 'Date Created',
		},
		{
			key: 'dateModified',
			label: 'Date modified',
		},
	];

	return (
		<div>
			<div>
				{actionButtons.map((props: UIButtonProps, i: number) => (
					<UIButton key={i} {...props} />
				))}
			</div>

			<div>
				<UISelect
					options={sortOptions}
					onChange={(value: string) => setSortOption(value)}
					label='Sort by:'
				/>
			</div>
			<div>
				<UISelect
					options={filterOptions}
					onChange={(value: string) => setFilterOption(value)}
					label='Filter by:'
				/>
				<UIInput
					placeholder='Enter filter value'
					onChange={(value: string) => setFilterValue(value)}
				/>
			</div>
			<div></div>
			<ul className={'list-none m-0 p-0'}>
				{effectsData.map((effect, i) => (
					<EffectListItem
						key={effect.name}
						effect={effect}
						index={i}
						selected={selectedEffects.includes(effect.name)}
					/>
				))}
			</ul>
		</div>
	);
};

export default memo(EffectList);
