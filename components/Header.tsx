import { HeaderDiv, NavBar, Logo, NavItem } from "../styles/main";

const Header = () => {
  const nav = ["Clube", "Loja", "Produtores", "Ofertas", "Eventos"];
  return (
    <HeaderDiv>
      <Logo>WINE</Logo>
      <NavBar>
        {nav.map((n) => (
          <NavItem>{n}</NavItem>
        ))}
      </NavBar>
    </HeaderDiv>
  );
};

export default Header;
