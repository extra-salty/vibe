import { useDispatch } from 'react-redux';
import { useThemeMode } from '@/state/features/app/appSelector';
import { AppActions } from '@/state/features/app/appSlice';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const ThemeToggle = () => {
	const dispatch = useDispatch();
	const themeMode = useThemeMode();
	const isDark = themeMode === 'dark';

	const handleThemeChange = () =>
		dispatch(AppActions.setThemeMode(isDark ? 'light' : 'dark'));

	return (
		<Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
			<IconButton onClick={handleThemeChange}>
				{isDark ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
