import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectedStaticEffectIds } from '@/state/features/app/appSelector';
import { setSelectedEffects } from '@/state/features/app/appSlice';
import { EffectTableDataT, EffectTableHeaderT } from './EffectTable.type';
import { VibeServiceInstance } from '@/services/vibe/vibeService';
import { Effect, BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { convertDate } from '@/misc/helpers/helpers';
import { UITableHeaderType } from '@/components/base/UITable/UITable.type';
import { Icons } from '@/components/base/UIIcon/UIIcon.types';
import UIButtonProps from '@/components/base/UIButton/UIButton.type';
import UITable from '@/components/base/UITable/UITable';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import UIButton from '@/components/base/UIButton/UIButton';
import style from './EffectTable.module.scss';
import UIIcon from '@/components/base/UIIcon/UIIcon';
import Link from 'next/link';

const EffectTable = () => {
	const dispatch = useDispatch();
	const [effectsData, setEffectsData] = useState<BaseEffectT[]>();
	const selectedIds = useSelectedStaticEffectIds();

	const getStaticEffectsData = async () => {
		const data = await VibeServiceInstance.getStaticEffectsData();
		setEffectsData(data);
	};

	const handleCreateEffect = async () => {
		try {
			const newEffect = new Effect('name', 'description');

			await VibeServiceInstance.createStaticEffect(newEffect);
			getStaticEffectsData();
		} catch (e) {}
	};

	const handleDeleteEffects = async () => {
		try {
			VibeServiceInstance.deleteStaticEffects(selectedIds);
			getStaticEffectsData();
		} catch (e) {}
	};

	const handleOnSelect = (_id: string) => dispatch(setSelectedEffects({ _id }));

	const actions: UIButtonProps[] = [
		{
			text: 'Create',
			onClick: handleCreateEffect,
		},
		{
			text: 'Delete',
			onClick: handleDeleteEffects,
			disabled: !selectedIds.length,
		},
		{
			text: 'Duplicate',
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
			header: 'Select',
		},
		{
			key: 'name',
			header: 'Name',
		},
		{
			key: 'description',
			header: 'Description',
			classes: 'width',
		},
		{
			key: 'frames',
			header: <UIIcon name={Icons.stack} height={12} />,
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
			key: 'link',
			header: 'Link',
		},
	];

	const handleEffectLinkClick = (effect: BaseEffectT) => {};

	const useRenderEffectTableData = (effect: BaseEffectT): EffectTableDataT => {
		const { _id, name, description, dateCreated, dateModified, frames } = effect;
		return {
			select: <UICheckbox onChange={() => handleOnSelect(_id)} />,
			name,
			description,
			frames: frames.length,
			duration: frames.reduce((duration, frame) => duration + frame.duration, 0) / 1000,
			dateCreated: convertDate(dateCreated),
			dateModified: convertDate(dateModified),
			link: <UIButton onClick={() => handleEffectLinkClick(effect)} />,
		};
	};

	const data = effectsData?.map(useRenderEffectTableData);

	const renderActionButtons = (props: UIButtonProps, i: number) => <UIButton key={i} {...props} />;

	useEffect(() => {
		getStaticEffectsData();
	}, []);

	return (
		<>
			{actions.map(renderActionButtons)}
			<div className={style.animations}>
				{data && <UITable data={data} header={effectTableHeader} />}
			</div>
		</>
	);
};

export default EffectTable;
