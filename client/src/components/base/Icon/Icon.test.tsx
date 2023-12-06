import { render, screen } from '@testing-library/react';

import { Icons } from './Icon.type';
import Icon from './Icon';

describe('Icon', () => {
	it('Icon is rendered', () => {
		render(<Icon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toBeInTheDocument();
	});

	it('Icon is not rendered', () => {
		render(<Icon name={Icons.add} hidden={true} />);
		const icon = screen.getByRole('img');
		expect(icon).not.toBeInTheDocument();
	});

	it('Icon has alt text', () => {
		render(<Icon name={Icons.add} />);
		const icon = screen.getByAltText('add');
		expect(icon).toBeInTheDocument();
	});

	it('Icon has source', () => {
		render(<Icon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveAttribute('src', '/add.svg');
	});

	it('Icon has local class', () => {
		render(<Icon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveClass('icon');
	});

	it('Icon has external class', () => {
		render(<Icon name={Icons.add} classes={['external-class']} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveClass('external-class');
	});
});
