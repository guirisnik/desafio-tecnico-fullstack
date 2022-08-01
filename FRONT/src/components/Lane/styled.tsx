import styled from "@emotion/styled";

export const LaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  border-radius: 7px;
  background-color: #f3f4fb;
  height: 100%;
`;

export const TitleContainer = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: left;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border-radius: 7px;
  background-color: #f3f4fb;
  height: 100%;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  column-gap: 4px;
  cursor: pointer;
  padding: 12px 0px;
  border: #eee 1px solid;
  border-radius: 7px;
  align-items: center;
  background-color: #e4ebf9;
  color: #3957ed;
  font-size: 1.1rem;
  font-weight: bold;
  :hover {
    background-color: #d8e0f0;
  }
`;
