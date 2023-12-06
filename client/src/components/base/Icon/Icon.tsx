import Image from 'next/image';
import IconType from './Icon.type';
import appendClasses from '@/helpers/appendClasses/appendClasses';
import './Icon.scss';

const Icon = ({ name, enlarge, width = 24, height = 24, onClick, hidden, classes }: IconType) => {
	const classNames = appendClasses(['icon', classes, enlarge && 'enlarge']);

	if (hidden) return;
	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={classNames}
			onClick={onClick}
			draggable={false}
		/>
	);
};

export default Icon;
