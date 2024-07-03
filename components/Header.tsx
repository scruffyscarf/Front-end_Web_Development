import * as React from 'react';
import { render } from '@testing-library/react';

const Header: React.FC<{ name: string }> = ({ name }) => {
    return (
        <header>
            <h1>{name}</h1>
        </header>
    );
};

export default Header;

test('renders learn react link', () => {
    const { getByText } = render(<Header />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
