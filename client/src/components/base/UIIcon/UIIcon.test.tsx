import { render, screen } from '@testing-library/react';

import { Icons } from './UIIcon.type';
import UIIcon from './UIIcon';

describe('Icon', () => {
	it('Icon is rendered', () => {
		render(<UIIcon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toBeInTheDocument();
	});

	it('Icon is not rendered', () => {
		render(<UIIcon name={Icons.add} hidden={true} />);
		const icon = screen.getByRole('img');
		expect(icon).not.toBeInTheDocument();
	});

	it('Icon has alt text', () => {
		render(<UIIcon name={Icons.add} />);
		const icon = screen.getByAltText('add');
		expect(icon).toBeInTheDocument();
	});

	it('Icon has source', () => {
		render(<UIIcon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveAttribute('src', '/add.svg');
	});

	it('Icon has local class', () => {
		render(<UIIcon name={Icons.add} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveClass('icon');
	});

	it('Icon has external class', () => {
		render(<UIIcon name={Icons.add} classes={['external-class']} />);
		const icon = screen.getByRole('img');
		expect(icon).toHaveClass('external-class');
	});
});
