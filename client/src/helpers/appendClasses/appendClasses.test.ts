import appendClasses from '@/helpers/appendClasses/appendClasses';

describe('non strings as input', () => {
	it('empty array returns empty', () => {
		expect(appendClasses([])).toBe('');
	});
	it('undefined returns empty', () => {
		expect(appendClasses([undefined])).toBe('');
	});
	it('null returns empty', () => {
		expect(appendClasses([null])).toBe('');
	});
	it('true returns empty', () => {
		expect(appendClasses([true])).toBe('');
	});
	it('false returns empty', () => {
		expect(appendClasses([false])).toBe('');
	});
});

describe('string as input', () => {
	it('empty string returns empty', () => {
		expect(appendClasses([''])).toBe('');
	});
	it('empty strings returns empty', () => {
		expect(appendClasses(['', ''])).toBe('');
	});
	it('whitespace string returns empty', () => {
		expect(appendClasses([' '])).toBe('');
	});
	it('whitespace strings returns empty', () => {
		expect(appendClasses([' ', ' '])).toBe('');
	});
	it('class string in array returns class string', () => {
		expect(appendClasses(['class'])).toBe('class');
	});
	it('class strings in array returns class strings', () => {
		expect(appendClasses(['class1', 'class2'])).toBe('class1 class2');
	});
});

describe('conditional string as input', () => {
	it('true and string returns string', () => {
		expect(appendClasses([true && 'class'])).toBe('class');
	});
	it('false and string returns empty', () => {
		expect(appendClasses([false && 'class'])).toBe('');
	});
	it('string and true returns string', () => {
		expect(appendClasses(['class' && true])).toBe('class');
	});
	it('string and false returns empty', () => {
		expect(appendClasses(['class' && false])).toBe('');
	});
	it('', () => {
		expect(appendClasses([true && 'class1', false && 'class2'])).toBe('class1');
	});
	it('', () => {
		expect(appendClasses([false && 'class1', true && 'class2'])).toBe('class2');
	});
});
