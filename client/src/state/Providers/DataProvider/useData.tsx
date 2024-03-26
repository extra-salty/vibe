import { useContext } from 'react';
import { DataContext } from './DataProvider';

export const useData = () => {
	const data = useContext(DataContext);

	// if (!data) {
	// 	throw new Error('No connection to database');
	// }

	return data;
};
