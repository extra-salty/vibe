namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_BASE_API_URL: string;
		NEXTAUTH_SECRET: string;
		AUTH_GOOGLE_ID: string;
		AUTH_GOOGLE_SECRET: string;
		MONGODB_URI: string;
		DB_NAME: string;
		STATIC_ANIMATION_COLLECTION: string;
		ANIMATIONS_COLLECTION: string;
		NEXT_PUBLIC_APP_ID: string;
		NEXT_PUBLIC_REDIRECT_URI: string;
	}
}
