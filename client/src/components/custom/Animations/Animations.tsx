import { AnimationType } from './Animations.type';
import { TableColumnType } from '@/components/base/UITable/UITable.type';
import UITable from '@/components/base/UITable/UITable';
import style from './Animations.module.scss';

const Animations = () => {
	const animationsHeader: TableColumnType<AnimationType, keyof AnimationType>[] = [
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
			key: 'dateCreated',
			header: 'Date created',
		},
		{
			key: 'dateModified',
			header: 'Date modified',
		},
	];

	const dateInstance = new Date();
	const locale = dateInstance.toLocaleString('hu-HU');

	const animations: AnimationType[] = [
		{
			name: 'Fire',
			description: 'asdasdsad',
			dateCreated: locale,
			dateModified: locale,
		},
		{
			name: 'Glow',
			description: 'asdasd',
			dateCreated: locale,
			dateModified: locale,
		},
	];

	return (
		<div className={style.animations}>
			<UITable
				data={[
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
					...animations,
				]}
				columns={animationsHeader}
			/>
		</div>
	);
};

export default Animations;
