import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import AppT from './appSlice.types';

const initialState: AppT = {
	isModalOpen: false,
	selectedStaticEffects: [],
	// actionsState: {
	// 	[Actions.reset]: false,
	// },
};

export const App = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setSelectedEffects: (state, action: PayloadAction<{ _id: string }>) => {
			const { _id } = action.payload;
			const indexOfId = state.selectedStaticEffects.indexOf(_id);

			if (indexOfId < 0) {
				state.selectedStaticEffects.push(_id);
			} else {
				state.selectedStaticEffects.splice(indexOfId, 1);
			}
		},
	},
});

export const { setSelectedEffects } = App.actions;

export default App.reducer;
