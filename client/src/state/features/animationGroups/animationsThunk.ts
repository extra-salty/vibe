import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAnimations = createAsyncThunk(
	'tables/animations/get',
	async () => await AnimationsServiceInstance.getAnimations(),
);

export const createAnimation = createAsyncThunk(
	'tables/animation/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await AnimationServiceInstance.createAnimation(args);
	},
);

export const deleteAnimations = createAsyncThunk(
	'tables/animations/delete',
	async (ids: string[]) => await AnimationsServiceInstance.deleteAnimations(ids),
);
