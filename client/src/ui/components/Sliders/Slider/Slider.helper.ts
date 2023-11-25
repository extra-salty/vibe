import { ColorType } from '@/state/features/color/colorSlice';

export const getHueBackgroundColor = ({ hue, saturation, lightness }: ColorType) => {
	let gradientParts = [];

	for (let i = 0; i < 36; i++) {
		gradientParts.push(`hsl(${i * 10} ${saturation}% ${lightness}%)`);
	}

	const asd = `linear-gradient(to right, ${gradientParts.join(',')})`;
	return asd;
};
