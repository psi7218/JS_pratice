import styled from "styled-components";

export const Statediv = styled.div`
  display: flex;
  align-items: space-between;
`;

export const Olbutton = styled.ol<{ $clicked: boolean }>`
  background-color: ${($clicked) => ($clicked ? "white" : "green")};
`;
export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

export const Button = styled.button<{ variant?: "delete" }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.variant === "delete" ? "#ff4444" : "#0066ff"};
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#cc0000" : "#0052cc"};
  }
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const TodoText = styled.span<{ $completed: boolean }>`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#888" : "#333")};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
