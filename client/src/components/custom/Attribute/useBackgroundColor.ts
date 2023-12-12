import { ColorType } from '@/state/features/attributes/attributeSlice.type';
import { Attributes } from './Attribute.type';

export const useBackgroundColor = (color: ColorType, attribute: Attributes) => {
	const { hue: h, saturation: s, lightness: l } = color;

	switch (attribute) {
		case `${Attributes.hue}`:
			let gradientParts = [];
			for (let i = 0; i < 36; i++) {
				gradientParts.push(`hsl(${i * 10} ${s}% ${l}%)`);
			}
			return `linear-gradient(to right, ${gradientParts.join(',')})`;

		case `${Attributes.saturation}`:
			return `linear-gradient(
        to right,
        hsl(${h} 0% ${l}%),
        hsl(${h} 100% ${l}%)
        )`;

		case `${Attributes.lightness}`:
			return `linear-gradient(
      to right,
      hsl(${h} ${s}% 0%),
      hsl(${h} ${s}% 25%),
      hsl(${h} ${s}% 50%)
      )`;
		default:
			``;
	}
};
