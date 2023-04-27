import { render, screen } from '@testing-library/react';
import SearchLine from '../components/SearchLine/SearchLine';

test('Find element', () => {
    render(<SearchLine />);
    const find = screen.getByText('Найти!')
    expect(find).toBeInTheDocument()
})

test('click on button', () => {
    render(<SearchLine />);
    const input = screen.getByPlaceholderText('Поиск')
    expect(input).toBeInTheDocument()
});

test('Find text', () => {
    render(<SearchLine />);
    const buttonText = screen.getByAltText('search')
    expect(buttonText).toBeInTheDocument()
})
