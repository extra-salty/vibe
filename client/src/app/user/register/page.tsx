'use client';
import RegisterWindow from '@/components/Register/RegisterWindow';
import { Options, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

const Register = () => {
	const options: Partial<Options> = {
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary,
		},
		useLevenshteinDistance: true,
		// graphs: zxcvbnCommonPackage.adjacencyGraphs,
	};

	zxcvbnOptions.setOptions(options);

	return <RegisterWindow />;
};

export default Register;
