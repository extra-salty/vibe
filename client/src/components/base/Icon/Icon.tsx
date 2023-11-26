import Image from 'next/image';
import IconType from './Icon.type';

const Icon = ({ name, width = 24, height = 24, onClick, hidden, classes }: IconType) => {
	if (hidden) return;
	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={classes}
			onClick={onClick}
		/>
	);
};

export default Icon;
