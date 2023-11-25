import Image from 'next/image';
import { ComponentType } from '../../components/Types';

export enum Icons {
	expandMore = 'expand-more',
	palette = 'palette',
}

type IconType = ComponentType & {
	name: Icons;
	width?: number;
	height?: number;
};

const Icon = ({ name, width = 24, height = 24, hidden, classes }: IconType) => {
	if (hidden) return;
	return (
		<Image
			src={`/${name}.svg`}
			alt={name}
			width={width}
			height={height}
			className={classes}
		/>
	);
};

export default Icon;
