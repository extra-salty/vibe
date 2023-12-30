export type classCollection = (
	| (boolean | string | undefined | null)
	| { [className: string]: boolean | undefined }
	| classCollection
)[];

const appendClasses = (classes: classCollection) => {
	const strings = classes
		.filter((x) => !!x)
		.map((i) => {
			if (i instanceof Array) {
				return appendClasses(i as classCollection);
			}
			return i;
		})
		.filter((x) => x && x !== true) as string[];

	// !!x.trim()
	return strings.join(' ');
};

export default appendClasses;
