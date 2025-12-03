import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled(Link)`
  display: inline-block;
  text-decoration: none;
  background-color: black;

  padding: 5px 6px 5px 7px;
  border-radius: 12px;
  border: 1px solid #ccc;

  box-shadow: 2px 2px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
    font-family: sans-serif;
    transition: transform 0.2s ease;

    .dot {
      color: #ffffff;
    }
  }

  h3:hover {
    transform: scale(1.1);
  }
`;
