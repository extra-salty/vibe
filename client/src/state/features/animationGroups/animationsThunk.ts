import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { StaticAnimationApi } from '@/app/api/staticAnimation/_service';
import { StaticAnimationsApi } from '@/app/api/staticAnimations/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAnimations = createAsyncThunk(
	'tables/animations/get',
	async () => await AnimationsServiceInstance.getAnimations(),
);

export const deleteAnimations = createAsyncThunk(
	'tables/animations/delete',
	async (ids: string[]) => await AnimationsServiceInstance.deleteAnimations(ids),
);

export const getStaticAnimations = createAsyncThunk(
	'staticAnimations/GET',
	async () => await StaticAnimationsApi.getAnimations(),
);

export const createStaticAnimation = createAsyncThunk(
	'staticAnimation/POST',
	async (args: { duplicateId?: string; data: FormData }) => {
		await StaticAnimationApi.create(args);
	},
);

export const deleteStaticAnimations = createAsyncThunk(
	'staticAnimations/DELETE',
	async (args: { duplicateId?: string; data: FormData }) => {
		await StaticAnimationApi.create(args);
	},
);
