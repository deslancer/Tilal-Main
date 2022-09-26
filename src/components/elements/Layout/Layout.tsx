import React from 'react';
import Header from '../Header';
import s from './Layout.module.scss';

interface LayoutProps {
    children?: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};

export default Layout;
