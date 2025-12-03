import styled from "styled-components";

const InputContainer = ({ className, placeholder, type, ...props }) => {
  return (
    <div className={className}>
      <input type={type} className="input" placeholder={placeholder} {...props} />
    </div>
  );
};

export const Input = styled(InputContainer)`
  .input {
    width: 245px;
    min-height: 45px;
    color: #000000;
    outline: none;
    transition: 0.35s;
    padding: 0px 7px;
    // background-color: #dedede;
    border-radius: 6px;
    border: 2px solid #646464;
    box-shadow: 3px 3px 7px rgba(81, 81, 81, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
  }

  .input::placeholder {
    color: #999;
  }

  .input:focus::placeholder {
    transition: 0.3s;
    opacity: 0;
  }

  .input:focus {
    transform: scale(1.05);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }
`;
