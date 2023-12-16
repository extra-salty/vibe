// 'use client';
import { connectToDatabase } from '@/services/database/database.service';
import React from 'react';

const page = () => {
	connectToDatabase();

	return <div>Asd</div>;
};

export default page;
