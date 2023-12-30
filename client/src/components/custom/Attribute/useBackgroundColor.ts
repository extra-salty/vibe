import { ColorT } from '@/state/features/effect/effectSlice.types';
import { Attributes } from './Attribute.type';

export const useBackgroundColor = (color: ColorT, attribute: Attributes) => {
	const { hue: h, saturation: s, lightness: l } = color;

	switch (attribute) {
		case `${Attributes.hue}`:
			let gradientParts = [];
			for (let i = 0; i < 36; i++) {
				gradientParts.push(`hsl(${i * 10} ${s}% ${l}% / ${(l / 100) * 2})`);
			}
			return `linear-gradient(to right, ${gradientParts.join(',')})`;

		case `${Attributes.saturation}`:
			return `linear-gradient(
        to right,
        hsl(${h} 0% ${l}% / ${(l / 100) * 2}),
        hsl(${h} 100% ${l}% / ${(l / 100) * 2})
        )`;

		case `${Attributes.lightness}`:
			return `linear-gradient(
      to right,
      hsl(${h} ${s}% 0% / 0),
      hsl(${h} ${s}% 50%),
      hsl(${h} ${s}% 100%)
      )`;
		default:
			``;
	}
};
