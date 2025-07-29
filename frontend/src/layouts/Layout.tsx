const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
