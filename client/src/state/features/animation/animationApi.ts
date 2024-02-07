import { AnimationServiceInstance } from '@/app/api/animation/_service';
import { AnimationsServiceInstance } from '@/app/api/animations/_service';
import { EffectsServiceInstance } from '@/app/api/effects/_service';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Animation
export const createAnimation = createAsyncThunk(
	'animation/create',
	async () => await AnimationServiceInstance.createAnimation(),
);

// Animations
export const getAnimations = createAsyncThunk(
	'animations/get',
	async () => await AnimationsServiceInstance.getAnimations(),
);

export const deleteAnimations = createAsyncThunk(
	'animations/delete',
	async (_ids: string[]) => await AnimationsServiceInstance.deleteAnimations(_ids),
);

// Effects
export const getEffects = createAsyncThunk(
	'getEffects',
	async () => await EffectsServiceInstance.getEffects(),
);
