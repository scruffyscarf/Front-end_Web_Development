import * as React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import styles from '../components/App';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContent/>}/>
                <Route path="/comic" element={<Footer/>}/>
            </Routes>
        </Router>
    );
};

export default App;


test('renders learn react link', () => {
    const {getByText} = render(<Header name="Header.tsx"/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
