import NavBar from "./navBar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
