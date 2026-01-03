import styled from "styled-components";
import { useState } from "react";
import { AddProduct, Products, Search, Pagination } from "./components";
import { useSelector } from "react-redux";
import { userSelect } from "../../selectors";
import { Navigate } from "react-router-dom";
import { ROLE } from "../../bff/constans";
import { useCallback } from "react";
import { debounce } from "../utils";

const AdminPanelContainer = ({ className }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [serchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const user = useSelector(userSelect);

  if (!user || Number(user.role) !== ROLE.ADMIN) {
    return <Navigate to="/" replace />;
  }

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setPage(1);
  };

  const handleSave = () => {
    setSelectedProduct(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleClear = () => {
    setSelectedProduct(null);
  };

  const delayedSearch = useCallback(
    debounce((value) => {
      setShouldSearch(value);
      setPage(1);
    }, 500),
    [setShouldSearch, setPage]
  );

  const onChange = (e) => {
    e.preventDefault();
    setSearchPhrase(e.target.value);
    delayedSearch(e.target.value);
  };

  return (
    <div className={className}>
      <div className="add-product">
        <AddProduct product={selectedProduct} onSave={handleSave} onClear={handleClear} />
      </div>
      <div className="products">
        <Search serchPhrase={serchPhrase} onChange={onChange} />
        <Products
          onEdit={handleEdit}
          onClear={handleClear}
          serchPhrase={serchPhrase}
          page={page}
          setTotalPages={setTotalPages}
          refreshTrigger={refreshTrigger}
        />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

const AdminPanel = styled(AdminPanelContainer)`
  display: flex;

  padding: 10px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  .add-product {
    flex: 0 1 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    padding: 20px 0 20px 0;
  }

  .products {
    flex: 0 1 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

export default AdminPanel;
