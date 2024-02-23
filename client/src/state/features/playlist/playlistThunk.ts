import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAnimationsDetail = createAsyncThunk(
	'animation/get',
	async (args: { ids: string[]; index?: number }) => {
		const animations = (
			await AnimationServiceInstance.getAnimationDetails(args.ids)
		).reverse();
		return { animations, index: args.index };
	},
);
