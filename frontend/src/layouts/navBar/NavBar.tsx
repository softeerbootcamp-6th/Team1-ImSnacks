const navItems = [
    { title: "홈", path: "/" },
    { title: "날씨 정보", path: "/dashboard" },
    { title: "내 농장", path: "/my-farm" }
]
const NavBar = () => {

    return (
        <nav>
            <ul>
                {navItems.map(item => (
                    <li key={item.path}>
                        <a href={item.path}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;