import styled from "styled-components";
import { ControlPanel } from "./components";
import { Logo } from "./components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { roleIdSelect } from "../../selectors";
import { ROLE } from "../../bff/constans";
import { logout } from "../../actions";

const HeaderContainer = ({ className }) => {
  const userRole = useSelector(roleIdSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/authorization");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const isAuthenticated = userRole === ROLE.ADMIN || userRole === ROLE.USER;

  return (
    <div className={className}>
      <div className="header">
        <Logo className="logo" onClick={handleLogoClick}>
          <h3>
            tech hub<span className="dot">.</span>
          </h3>
        </Logo>

        <h3 className="header-title">Buy smart, buy fast</h3>

        <ControlPanel />

        {isAuthenticated ? (
          <div className="header-icon-div" onClick={onLogout}>
            <img className="header-icon" src="logout.svg" alt="logout" />
          </div>
        ) : (
          <Link to="/authorization" className="login">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export const Header = styled(HeaderContainer)`
  max-width: 1200px;
  width: 100%;
  padding: 10px;

  .header {
    ${ControlPanel} {
      margin-left: auto;
      margin-right: 10px;
    }

    position: fixed;
    top: 5px;
    left: 1%;
    right: 1%;
    z-index: 99;

    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 60px;
    padding: 0 30px;

    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(3px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #2f2f2f;
    font-weight: bold;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }

  .header-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2em;
    font-weight: bold;
    color: #5b5b5b;
    padding: 5px 10px;
    border: 1px solid rgba(192, 190, 190, 1);
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    @media (max-width: 670px) {
      display: none;
    }
  }

  & button {
    margin-left: 10px;
    font-size: 10px;
    margin-bottom: 5px;
  }

  .header-icon-div {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .header-icon-div:hover {
    transform: scale(1.2);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  .header-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  & .login {
    color: #282727;
    margin-left: 10px;
    transition: all 0.2s;
  }

  & .login:hover {
    color: #000000;
    transform: scale(1.1);
  }
    
  & .logo { 
    margin-left: -10px;
  }

  h3 {
      @media (max-width: 670px) { 
  font-size: 16px;
      }
    }
  }
`;
