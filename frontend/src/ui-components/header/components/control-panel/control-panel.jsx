import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { ROLE } from "../../../../bff/constans/role";
import { useSelector } from "react-redux";
import { roleIdSelect } from "../../../../selectors";

const ControlPanelContainer = ({ className }) => {
  const roleId = Number(useSelector(roleIdSelect));
  const location = useLocation();

  const isAuthenticated = roleId === ROLE.ADMIN || roleId === ROLE.USER;

  let links = [{ to: "/", icon: "/store.svg", alt: "store" }];

  if (isAuthenticated) {
    links.push({ to: "/cart", icon: "/cart.svg", alt: "cart" });
  }

  if (roleId === ROLE.ADMIN) {
    links.push({ to: "/admin-panel", icon: "/admin-panel.svg", alt: "admin" });
  }

  return (
    <div className={className}>
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          <div className={`cp-icon-div ${location.pathname === link.to ? "active" : ""}`}>
            <img className="cp-icon" src={link.icon} alt={link.alt} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;

  .cp-icon-div {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    backdrop-filter: blur(3px);
    box-shadow: 2px 2px 10px rgba(32, 32, 32, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cp-icon-div:hover {
    transform: scale(1.2);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  .cp-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .cp-icon-div.active {
    transform: scale(1.2);
    background-color: #79797970;
    border-color: #ffffff;
  }
`;
