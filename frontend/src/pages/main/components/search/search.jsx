import styled from "styled-components";
import { Input } from "../../../../ui-components";

const SearchContainer = ({ className, searchPhrase, onChange }) => (
  <div className={className}>
    <Input type="text" placeholder="Search..." value={searchPhrase} onChange={onChange} />
  </div>
);

export const Search = styled(SearchContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 40px;
  margin: 5px auto;
  // padding: 0 10px;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 5px 10px;
    background: #b3b3b300;
    position: relative;
    top: 5px;
  }
`;
