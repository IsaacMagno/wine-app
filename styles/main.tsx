import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background: gainsboro;
`;

export const Card = styled.div`
  background: white;
  color: rgba(0, 0, 0, 0.125);
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
  &:hover,
  &:focus,
  &:active {
    color: #2b2d42;
    border-color: #2b2d42;
  }
`;

export const LinkCard = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Button = styled.button`
  color: #2222229a
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  margin: 0.2rem;
  cursor: pointer;
  &:hover {
    color: #2b2d42;
    border-color: #2b2d42;
  }
  padding: 1rem;
`;

export const Div = styled.div`
  text-align: center;
`;

export const DetailsDiv = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 3rem;
  width: 50%;
`;

export const ImageDiv = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 5rem;
  width: 20%;
`;
