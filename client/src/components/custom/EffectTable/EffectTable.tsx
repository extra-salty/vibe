import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelectedStaticEffectIds } from '@/state/features/app/appSelector';
import { useDispatch } from 'react-redux';
import { setActiveEffect } from '@/state/features/effect/effectSlice';
import { setSelectedEffects } from '@/state/features/app/appSlice';
import { convertDate } from '@/misc/helpers/helpers';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import { EffectTableDataT, EffectTableHeaderT } from './EffectTable.type';
import { Effect, BaseEffectT, HistoriesT } from '@/state/features/effect/effectSlice.types';
import { UITableHeaderType } from '@/components/base/UITable/UITable.type';
import { UISelectOptionProps } from '@/components/base/UISelect/UISelect.type';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UITable from '@/components/base/UITable/UITable';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import UIButton from '@/components/base/UIButton/UIButton';
import UISelect from '@/components/base/UISelect/UISelect';
import UIInput from '@/components/base/UIInput/UIInput';
import style from './EffectTable.module.scss';

const EffectTable = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const selectedIds = useSelectedStaticEffectIds();
	const [effectsData, setEffectsData] = useState<BaseEffectT[]>();
	const [sortOption, setSortOption] = useState<string>('name-asc');
	const [filterOption, setFilterOption] = useState<string>('name');
	const [filterValue, setFilterValue] = useState<string>('');

	const getStaticEffectsData = useCallback(async () => {
		const data = await VibeServiceInstance.getStaticEffects({
			sortOption,
			filterOption,
			filterValue,
		});
		setEffectsData(data);
	}, [filterValue, filterOption, sortOption]);

	const handleCreateEffect = async () => {
		try {
			const newEffect = new Effect('name', 'description');

			await VibeServiceInstance.createStaticEffect(newEffect);
			getStaticEffectsData();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDeleteEffects = async () => {
		try {
			await VibeServiceInstance.deleteStaticEffects(selectedIds);
			getStaticEffectsData();
		} catch (e) {
			console.error(e);
		}
	};

	const handleEffectLinkClick = (effect: BaseEffectT) => {
		const historyProps: HistoriesT = {
			undo: [],
			redo: [],
		};
		const frames = effect.frames.map((frame) => {
			return { ...frame, ...historyProps };
		});

		dispatch(setActiveEffect({ effect: { ...effect, frames } }));

		router.push('/effect');
	};

	const useRenderEffectTableData = (effect: BaseEffectT, i: number): EffectTableDataT => {
		const { _id, name, description, dateCreated, dateModified, frames } = effect;
		return {
			numbering: i + 1,
			select: (
				<UICheckbox
					isChecked={selectedIds.includes(_id)}
					onChange={() => dispatch(setSelectedEffects({ _id }))}
				/>
			),
			name,
			description,
			frames: frames.length,
			duration: frames.reduce((duration, frame) => duration + frame.duration, 0) / 1000,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			edit: (
				<UIButton
					onClick={() => handleEffectLinkClick(effect)}
					icon={Icons.edit}
					iconSize={14}
					hasBorder={false}
				/>
			),
		};
	};

	const data = effectsData?.map(useRenderEffectTableData);

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
			disabled: !selectedIds.length,
		},
		{
			text: 'Duplicate',
			icon: Icons.duplicate,
			onClick: handleDeleteEffects,
			disabled: !(selectedIds.length === 1),
		},
		{
			text: 'Select All ',
			onClick: handleDeleteEffects,
			disabled: !(selectedIds.length === 1),
		},
	];

	const effectTableHeader: UITableHeaderType<EffectTableHeaderT, keyof EffectTableHeaderT>[] = [
		{
			key: 'select',
			header: '',
		},
		{
			key: 'numbering',
			header: '#',
		},
		{
			key: 'name',
			header: 'Name',
		},
		{
			key: 'description',
			header: 'Description',
		},
		{
			key: 'frames',
			header: 'Frames',
		},
		{
			key: 'duration',
			header: 'Duration (s)',
		},
		{
			key: 'dateCreated',
			header: 'Date created',
		},
		{
			key: 'dateModified',
			header: 'Date modified',
		},
		{
			key: 'edit',
			header: 'Edit',
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

	useEffect(() => {
		getStaticEffectsData();
	}, [getStaticEffectsData]);

	return (
		<div>
			<div className={style.tableActions}>
				<div>
					{actionButtons.map((props: UIButtonProps, i: number) => (
						<UIButton key={i} {...props} />
					))}
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
				<div>
					<UISelect
						options={sortOptions}
						onChange={(value: string) => setSortOption(value)}
						label='Sort by:'
					/>
				</div>
			</div>
			<div className={style.effectTable}>
				{data && <UITable data={data} header={effectTableHeader} />}
			</div>
		</div>
	);
};

export default EffectTable;
