import { memo } from 'react';

export const genericMemo: <T>(component: T) => T = memo;

// export const objectToQueryString = (formData) => {
// 	const data = [...formData.entries()];
// 	const asString = data
// 		.map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
// 		.join('&');
// 	return asString;
// };
