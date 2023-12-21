import { memo } from 'react';

export const convertDate = (date: any) => {
	const ms = Date.parse(date);
	const newDate = new Date(ms);
	const string = newDate.toLocaleString('hu-HU');
	return string;
};

export const genericMemo: <T>(component: T) => T = memo;
