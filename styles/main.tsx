import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5vh 95vh;

  grid-template-areas:
    "h h"
    "m c";

  background: #f5f5f5;

  height: 170em;
`;

export const ContainerDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5vh 95vh;

  grid-template-areas:
    "h h"
    "m c";

  background: #f5f5f5;
`;

export const ContainerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 5vh 50vh 45vh;

  grid-template-areas:
    "h h"
    "c c"
    ". .";

  background: #f5f5f5;
`;

export const HeaderDiv = styled.div`
  grid-area: h;
  display: flex;
  background: #ffffff;
  justify-content: space-around;
`;

export const Card = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1rem;
  width: 16rem;
  height: 33rem;
  padding: 1rem;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;

  grid-area: c;
`;

export const Button = styled.button`
  color: #fff;
  background-color: #7ebc43;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;

  margin: 0.01rem;
  cursor: pointer;
  padding: 1rem 7.3rem;
`;

export const AddButtons = styled.button`
  color: #fff;
  background-color: #7ebc43;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;

  margin: 0.1rem;
  cursor: pointer;
  padding: 0.5rem 3rem;
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  font-size: 15px;

  cursor: pointer;

  margin: 10px 30px;
  position: absolute;
`;

export const PageButton = styled.button`
  color: #b6116e;
  background: #f5f5f5;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1.5rem;

  cursor: pointer;
  margin: 5px;
  padding: 8px;

  &:hover {
    color: #f5f5f5;
    background: #b6116e;
  }
`;

export const Div = styled.div`
  text-align: center;
`;

export const Select = styled.div`
  background-clip: border-box;
  border-radius: 0.5rem;
  margin: 1rem;
  margin-left: 4rem;
  text-align: left;
  grid-area: m;
`;

export const Search = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5rem;
  padding: 10px;
  margin: 10px;

  &:hover,
  &:focus,
  &:active {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

export const ContainerWines = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  grid-area: c;
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 3rem;
  grid-area: c;
`;

export const CardDiv = styled.div`
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 3px;
  padding: 3rem;
`;

export const ImageDiv = styled.div`
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 5rem;

  grid-area: m;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Logo = styled.h4`
  padding: 10px;
`;

export const NavItem = styled.p`
  padding: 15px 40px;
  &:hover {
    color: #c81a78;
  }
  cursor: pointer;
`;

export const CartTotal = styled.p`
  margin: 10px;
  align-self: center;
  fontsize: 15px;

  &:hover {
    color: #c81a78;
  }

  cursor: pointer;
`;
