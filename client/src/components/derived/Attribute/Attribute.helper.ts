import { ColorType } from '@/state/features/attribute/attributeSlice.type';
import { Attributes } from './Attribute.type';

export const getBackgroundColor = (color: ColorType, attribute: Attributes) => {
	const { hue, saturation, lightness } = color;

	switch (attribute) {
		case `${Attributes.hue}`:
			let gradientParts = [];
			for (let i = 0; i < 36; i++) {
				gradientParts.push(`hsl(${i * 10} ${saturation}% ${lightness}%)`);
			}
			return `linear-gradient(to right, ${gradientParts.join(',')})`;
		case `${Attributes.saturation}`:
			return `linear-gradient(
        to right,
        hsl(${hue} 0% ${lightness}%),
        hsl(${hue} 100% ${lightness}%)
        )`;
		case `${Attributes.lightness}`:
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
