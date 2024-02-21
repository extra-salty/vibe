// import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { StaticAnimationTableT } from '@/types/effect.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const mongodbApi = createApi({
	reducerPath: 'mongodbApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL }),
	endpoints: (builder) => ({
		getEffects: builder.query({
			query: (name) => `pokemon/${name}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEffectsQuery } = mongodbApi;
