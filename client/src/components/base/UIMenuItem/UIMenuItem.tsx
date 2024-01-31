import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

export type MenuItemProps = {
	disabled?: boolean;
	icon: any;
	label: string;
	onClick: () => void;
	onClose?: () => void;
};

const UIMenuItem = ({ icon, label, disabled, onClick, onClose }: MenuItemProps) => {
	const handleItemClick = () => {
		onClick();
		onClose && onClose();
	};

	return (
		<MenuItem disabled={disabled} onClick={handleItemClick}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			{label ? <ListItemText>{label}</ListItemText> : null}
		</MenuItem>
	);
};

export default UIMenuItem;
