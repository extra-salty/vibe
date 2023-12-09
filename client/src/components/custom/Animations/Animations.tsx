import { AnimationDataType, AnimationType } from './Animations.type';
import { TableColumnType } from '@/components/base/UITable/UITable.type';
import UITable from '@/components/base/UITable/UITable';
import style from './Animations.module.scss';
import UIInput from '@/components/base/UIInput/UIInput';

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
	const locale = dateInstance.toLocaleString('hu-HU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

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

	const createAnimation = ({
		name,
		description,
		dateCreated,
		dateModified,
	}: AnimationType): AnimationDataType => {
		return {
			name: <UIInput value={name} onChange={() => {}} />,
			description: <UIInput value={description} onChange={() => {}} />,
			dateCreated: dateCreated,
			dateModified: dateModified,
		};
	};

	const data = animations.map(createAnimation);
	console.log('🚀 ~ file: Animations.tsx:62 ~ Animations ~ data:', data);

	return (
		<div className={style.animations}>
			<UITable
				data={[...data, ...data, ...data, ...data, ...data, ...data]}
				columns={animationsHeader}
			/>
		</div>
	);
};

export default Animations;
