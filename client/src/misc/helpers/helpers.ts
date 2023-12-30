import { memo } from 'react';

export const convertDate = (date: any) => {
	const ms = Date.parse(date);
	const newDate = new Date(ms);
	const string = newDate.toLocaleString('hu-HU');
	// const asd = string.split('').filter((x) => !!x);
	// console.log('🚀 ~ file: helpers.ts:8 ~ convertDate ~ asd:', asd);
	return string;
};

export const genericMemo: <T>(component: T) => T = memo;

export const generateRandomElementId = () => '_' + Math.random().toString(36).substr(2, 9);
