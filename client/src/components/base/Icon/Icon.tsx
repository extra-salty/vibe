import Image from 'next/image';
import IconType from './Icon.type';
import appendClasses from '@/helpers/appendClass/appendClass';

const Icon = ({ name, width = 24, height = 24, onClick, hidden, classes }: IconType) => {
	if (hidden) return;
	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={appendClasses([classes])}
			onClick={onClick}
			draggable={false}
		/>
	);
};

export default Icon;
