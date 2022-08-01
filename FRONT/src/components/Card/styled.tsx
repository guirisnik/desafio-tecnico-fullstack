import styled from "@emotion/styled";

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  row-gap: 8px;
  padding: 10px 15px;
  box-shadow: #ddd 0px 0px 3px;
`;

export const TitleContainer = styled.div`
  min-height: 24px;
  display: flex;
  justify-content: flex-start;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ContentContainer = styled.div`
  min-height: 24px;
  text-align: left;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button`
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  :hover {
    background-color: #eee;
  }
  :disabled {
    color: #ccc;
    :hover {
      background-color: transparent;
    }
  }
`;

export const Input = styled.input`
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 7px 15px;
  width: 100%;
  :hover {
    background-color: #e8ebf9aa;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 7px 15px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  resize: none;
  :hover {
    background-color: #e8ebf9aa;
  }
`;