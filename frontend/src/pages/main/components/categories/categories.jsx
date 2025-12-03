import styled from "styled-components";

const CategoriesContainer = ({
  className,
  categories,
  selectedCategory,
  setSelectedCategory,
  currentCategoryName,
  isDisabled,
}) => {
  return (
    <div className={className}>
      <div className="curent-category">
        <h4>{currentCategoryName}</h4>
      </div>
      <button
        disabled={isDisabled}
        onClick={() => setSelectedCategory("all")}
        className={selectedCategory === "all" ? "active" : ""}
      >
        <p className="category-name">All categories</p>
      </button>
      {categories.map((cat) => (
        <button
          disabled={isDisabled}
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={selectedCategory === cat.id ? "active" : ""}
        >
          <p className="category-name"> {cat.name}</p>
        </button>
      ))}
    </div>
  );
};

export const Categories = styled(CategoriesContainer)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 15px;
  // overflow: hidden;
  box-shadow: 4px 4px 6px rgba(73, 73, 73, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);

  button {
    width: 90px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 10px 0;
    padding: 0 10px;
    border: 1px solid #414141;
    border-radius: 12px;

    color: #212121;
    backdrop-filter: blur(3px);
    box-shadow: 4px 4px 7px rgba(76, 76, 76, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover:not(:disabled) {
      transform: scale(1.1);
      box-shadow: 6px 6px 10px rgba(55, 55, 55, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
        inset 2px 2px 10px rgba(56, 56, 56, 1),
        inset -1px -1px 5px rgba(255, 255, 255, 0.6);
    }

    &.active {
      transform: scale(1.2);
      box-shadow: 6px 6px 10px rgba(110, 110, 110, 1),
        1px 1px 10px rgba(255, 255, 255, 0.6), inset 2px 2px 10px rgba(91, 91, 91, 1),
        inset -1px -1px 5px rgba(255, 255, 255, 0.6);
      color: #272727;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }

  .curent-category {
    border: 1px solid #ccc;
    width: 133px;
    height: 90px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    padding: 0 10px;
    text-align: center;
    h4 {
      font-size: 1.2em;
      font-weight: 900;
    }
  }

  @media (max-width: 695px) {
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 13px;
    padding: 5px 10px;
    flex-wrap: wrap;
    .curent-category {
      width: 100%;
      height: 60px;
      font-size: 0.95em;
      padding: 0 6px;
      box-shadow: none;
      h4 {
        font-size: 1em;
      }
    }
    button {
      height: 32px;
      margin: 6px 0;
      font-size: 0.97em;
      box-shadow: none;
      padding: 0 6px;
      .category-name {
        font-size: 10px;
      }
    }
    .curent-category {
      width: 100%;
      height: 60px;
      font-size: 0.95em;
      padding: 6px;
      box-shadow: none;
      h4 {
        font-size: 1em;
      }
    }
  }
`;
