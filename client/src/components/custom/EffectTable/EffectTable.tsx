import { UITableColumnType } from '@/components/base/UITable/UITable.type';
import { EffectTableDataT, EffectTableHeaderT } from './EffectTable.type';
import UITable from '@/components/base/UITable/UITable';
import UIInput from '@/components/base/UIInput/UIInput';
import UICheckbox from '@/components/base/UICheckbox/UICheckbox';
import style from './EffectTable.module.scss';
import { useState } from 'react';

const EffectTable = () => {
	const effectTableHeader: UITableColumnType<EffectTableHeaderT, keyof EffectTableHeaderT>[] = [
		{
			key: 'select',
			text: 'Select',
		},
		{
			key: 'name',
			text: 'Name',
		},
		{
			key: 'description',
			text: 'Description',
			classes: 'width',
		},
		{
			key: 'frames',
			text: 'Frames',
		},
		{
			key: 'dateCreated',
			text: 'Date created',
		},
		{
			key: 'dateModified',
			text: 'Date modified',
		},
		// {
		// 	key: 'goTo',
		// 	text: 'Go to',
		// },
	];

	const dateInstance = new Date();
	const locale = dateInstance.toLocaleString('hu-HU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	const effects: EffectTableHeaderT[] = [
		{
			select: false,
			name: 'Fire',
			description: 'asdasdsad',
			frames: 10,
			dateCreated: locale,
			dateModified: locale,
		},
		{
			select: false,
			name: 'Glow',
			description: 'asdasd',
			frames: 10,
			dateCreated: locale,
			dateModified: locale,
		},
	];

	const renderEffectTableData = ({
		select,
		name,
		description,
		dateCreated,
		frames,
		dateModified,
	}: EffectTableHeaderT): EffectTableDataT => {
		return {
			select: <UICheckbox isChecked={select} onChange={() => {}} />,
			name: <UIInput type='text' value={name} onChange={() => {}} />,
			description: <UIInput type='text' value={description} onChange={() => {}} />,
			frames: frames,
			dateCreated: dateCreated,
			dateModified: dateModified,
		};
	};

	const data = effects.map(renderEffectTableData);

	return (
		<div className={style.animations}>
			<UITable data={[...data, ...data]} header={effectTableHeader} />
		</div>
	);
};

export default EffectTable;
