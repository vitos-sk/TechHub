import styled from "styled-components";

const ButtonContainer = ({ className, children, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  padding: 10px 20px;
  cursor: pointer;
  // background-color: #858585;
  border-radius: 6px;
  border: 2px solid #303030;
  box-shadow: 2px 2px 8px rgba(72, 72, 72, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
  color: #4a4a4a;
  font-size: ${({ fontSize = "15px" }) => fontSize};
  font-weight: bold;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 6px 6px 10px rgba(67, 67, 67, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.8),
      inset -2px -2px 6px rgba(255, 255, 255, 0.3);
    background-color: #181818;
  }

  /* Эффект disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }
`;
