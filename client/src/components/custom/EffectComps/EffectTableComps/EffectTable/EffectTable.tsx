'use client';
import useEffectTableData from './useEffectTableData';
import { useState } from 'react';
import { UITableOptionsValueT } from '@/components/base/UITableOptions/UITableOptions';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import {
	effectTableHeader,
	effectTableSortOptions,
	effectTableFilterOptions,
} from './effectTableSettings';
import EffectTableActions from '../EffectTableActions/EffectTableActions';
import UITable from '@/components/base/UITable/UITable';

const EffectTable = ({ initialEffects }: { initialEffects: BaseEffectT[] }) => {
	const [effects, setEffects] = useState<BaseEffectT[]>(initialEffects);
	const effectsData = useEffectTableData({ effects });

	const [tableOptions, setTableOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name-asc',
		filterOptionValue: 'name',
		filterValue: '',
	});

	return (
		<div>
			<EffectTableActions tableOptions={tableOptions} setEffects={setEffects} />
			<div className={'my-2'}>
				<UITable
					data={effectsData}
					header={effectTableHeader}
					options={{
						sortOptions: effectTableSortOptions,
						filterOptions: effectTableFilterOptions,
						setOptions: setTableOptions,
					}}
				/>
			</div>
		</div>
	);
};

export default EffectTable;
