import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { createContext, useContext } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorMode = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	return (
		<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
			{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	);
};

export default ColorMode;
