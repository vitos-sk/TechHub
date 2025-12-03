import styled from "styled-components";
import {
  Categories,
  ProductCard,
  Search,
  SortingProduct,
  Pagination,
} from "./components";
import { useEffect, useState, useCallback } from "react";
import { Notification } from "../../ui-components";
import { PAGINATION } from "../../bff/constans";
import { debounce } from "../utils";
import { request } from "../../utils";
import { Button } from "../../ui-components";

const MainContainer = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [serchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const url = `/products?page=${page}&limit=${PAGINATION.LIMIT}&search=${shouldSearch}&category=${selectedCategory}`;

    request(url).then((response) => {
      const newCategories = response.data.categories || [];
      const newProducts = response.data.products || [];
      const totalCount = response.data.totalCount || 0;

      setCategories(newCategories);
      setProducts(newProducts);
      setTotalPages(Math.ceil(totalCount / PAGINATION.LIMIT));
    });
  }, [page, selectedCategory, shouldSearch]);

  const currentCategoryName =
    selectedCategory === "all"
      ? "All-category"
      : categories.find((cat) => String(cat.id) === String(selectedCategory))?.name ||
        "Unknown";

  const delayedSearch = useCallback(
    debounce((value) => {
      setShouldSearch(value);
      setPage(1);
    }, 500),
    [page]
  );

  const onChange = (e) => {
    e.preventDefault();
    setSearchPhrase(e.target.value);
    delayedSearch(e.target.value);
  };

  const sortedProducts = [...products];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className={className}>
      <div className="search-row">
        <Search serchPhrase={serchPhrase} onChange={onChange} />
        <SortingProduct
          className="sorting-product"
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {products.length === 0 ? (
        <Notification>No products</Notification>
      ) : (
        <>
          <div className="contant-row">
            <Button className="toggle-categories" onClick={toggleCategories}>
              {isCategoriesOpen ? "Categories ▲" : " Categories ▼"}
            </Button>
            <div className={`categories ${isCategoriesOpen ? "open" : "closed"}`}>
              <Categories
                isDisabled={page > 1 && true}
                currentCategoryName={currentCategoryName}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            {products.length === 0 ? (
              <Notification>No products in this category</Notification>
            ) : (
              <div className="products">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image_url={product.image_url}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="pagination">
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  .toggle-categories {
    display: none;
  }
  .search-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .contant-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 auto;
    gap: 50px;
  }

  .categories {
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 150px;
    padding: 15px;
    gap: 40px;
    transition: all 0.3s ease-in-out;
    overflow: visible;
  }

  .products {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    align-content: flex-start;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    width: 100%;
  }

  @media (max-width: 695px) {
    display: block;

    .toggle-categories {
      display: block;
    }

    .contant-row {
      padding: 20px 40px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    .categories {
      max-height: 0;
      overflow: hidden;
      padding: 0;
      margin: 0;
      transition: max-height 0.5s ease, padding 0.5s ease;
    }

    .categories.open {
      min-height: 220px;
      padding: 15px;
    }

    .categories.closed {
      max-height: 0;
      overflow: hidden;
    }

    .products {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .pagination {
      margin-top: 20px;
    }
  }

  @media (max-width: 470px) {
    .contant-row {
      padding: 0 10px;
    }
    .search-row {
      flex-direction: column;
    }
  }
`;

export default Main;
