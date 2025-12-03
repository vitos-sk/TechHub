import styled from "styled-components";

const NotificationContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Notification = styled(NotificationContainer)`
  position: absolute;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: #252525;
  padding: 20px;
  border-radius: 12px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* для Safari */
  font-weight: 900;
`;
