import styled from "styled-components";

const SortingProductContainer = ({ className, setSortOrder, sortOrder }) => {
  return (
    <div className={className}>
      <select
        className="select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">No sorting</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export const SortingProduct = styled(SortingProductContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  margin: 10px auto;
  padding: 0 10px;

  .select {
    padding: 4px;
    border-radius: 6px;
    font-size: 12px;
    color: #4f4f4f;
    // background-color: #dedede;
    border-radius: 6px;
    border: 2px solid #646464;
    box-shadow: 3px 3px 7px rgba(81, 81, 81, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
  }
`;
