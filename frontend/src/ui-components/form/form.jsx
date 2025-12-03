import styled from "styled-components";

const FormContainer = ({ className, children, nameForm, ...props }) => {
  return (
    <div className={className}>
      <form className="form" {...props}>
        <div className="form_front">
          <div className="form_details">{nameForm}</div>
          {children}
        </div>
      </form>
    </div>
  );
};

export const Form = styled(FormContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    padding: 65px 45px;
    border-radius: 15px;
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 1),
      inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  .form_front {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .form_details {
    font-size: 25px;
    font-weight: 600;
    color: #232323;
  }
`;
