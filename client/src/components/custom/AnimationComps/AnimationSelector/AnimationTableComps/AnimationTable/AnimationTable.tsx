'use client';
import useAnimationTableData from './useAnimationTableData';
import { memo, useState } from 'react';
import { UITableOptionsValueT } from '@/components/base/UITableOptions/UITableOptions';
import { AnimationT } from '@/state/features/animation/animation.types';
import {
	animationTableHeader,
	animationTableSortOptions,
	animationTablefilterOptions,
} from './animationTableSettings';
import AnimationTableActions from '../AnimationTableActions/AnimationTableActions';
import UITable from '@/components/base/UITable/UITable';

const AnimationTable = ({ initialAnimations }: { initialAnimations: AnimationT[] }) => {
	const [animations, setAnimations] = useState<AnimationT[]>(initialAnimations);
	const animationData = useAnimationTableData({ animations });

	const [tableOptions, setTableOptions] = useState<UITableOptionsValueT>({
		sortOptionValue: 'name-asc',
		filterOptionValue: 'name',
		filterValue: '',
	});

	return (
		<div>
			<AnimationTableActions tableOptions={tableOptions} setAnimations={setAnimations} />
			<UITable
				data={animationData}
				header={animationTableHeader}
				options={{
					sortOptions: animationTableSortOptions,
					filterOptions: animationTablefilterOptions,
					setOptions: setTableOptions,
				}}
			/>
		</div>
	);
};

export default memo(AnimationTable);
