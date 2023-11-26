import { ColorAttributes } from '@/components/Components.type';
import { ColorType } from '@/state/features/color/colorSlice';

export const getBackgroundColor = (color: ColorType, attribute: ColorAttributes) => {
	const { hue, saturation, lightness } = color;

	switch (attribute) {
		case `${ColorAttributes.hue}`:
			let gradientParts = [];
			for (let i = 0; i < 36; i++) {
				gradientParts.push(`hsl(${i * 10} ${saturation}% ${lightness}%)`);
			}
			return `linear-gradient(to right, ${gradientParts.join(',')})`;
		case `${ColorAttributes.saturation}`:
			return `linear-gradient(
        to right,
        hsl(${hue} 0% ${lightness}%),
        hsl(${hue} 100% ${lightness}%)
        )`;
		case `${ColorAttributes.lightness}`:
			return `linear-gradient(
      to right,
      hsl(${hue} ${saturation}% 0%),
      hsl(${hue} ${saturation}% 25%),
      hsl(${hue} ${saturation}% 50%)
      )`;
		default:
			``;
	}
};
