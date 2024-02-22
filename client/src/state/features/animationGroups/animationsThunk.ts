import { AnimationServiceInstance } from '@/app/api/animationGroup/_service';
import { AnimationGroupsServiceInstance } from '@/app/api/animationGroups/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAnimations = createAsyncThunk(
	'tables/animations/get',
	async () => await AnimationGroupsServiceInstance.getAnimationGroups(),
);

export const createAnimation = createAsyncThunk(
	'tables/animation/post',
	async (args: { duplicateId?: string; data: FormData }) => {
		await AnimationServiceInstance.createAnimationGroup(args);
	},
);

export const deleteAnimations = createAsyncThunk(
	'tables/animations/delete',
	async (ids: string[]) =>
		await AnimationGroupsServiceInstance.deleteAnimationGroups(ids),
);
