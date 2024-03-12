namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_BASE_API_URL: string;
		NEXT_PUBLIC_APP_ID: string;
		NEXT_PUBLIC_GOOGLE_ID: string;
		//
		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;
		NEXTAUTH_GOOGLE_SECRET: string;
		//
		DB_URL: string;
		DB_NAME: string;
		DB_STATIC_ANIMATION_COLLECTION: string;
		DB_ANIMATIONS_COLLECTION: string;
	}
}
