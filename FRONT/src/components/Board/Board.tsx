import styled from "@emotion/styled";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  padding: 20px;
  height: 100%;
`;

interface BoardProps {
  children?: JSX.Element | JSX.Element[];
}

function Board({ children }: BoardProps) {
  return <BoardContainer>{children}</BoardContainer>;
}

export { Board };
