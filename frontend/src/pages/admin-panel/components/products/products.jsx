import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button, Modal } from "../../../../ui-components";
import { PAGINATION } from "../../../../bff/constans";
import { request } from "../../../../utils";

const ProductsContainer = ({
  className,
  onEdit,
  serchPhrase,
  page,
  setTotalPages,
  refreshTrigger,
}) => {
  const [products, setProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchProducts = async () => {
    const url = `/products?page=${page}&limit=${PAGINATION.LIMIT}&search=${serchPhrase}`;
    try {
      const res = await request(url, "GET");
      const newProducts = res?.data?.products || [];
      const totalCount = res?.data?.totalCount || 0;

      setProducts(newProducts);
      setTotalPages(Math.max(1, Math.ceil(totalCount / PAGINATION.LIMIT)));
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, serchPhrase, refreshTrigger, setTotalPages]);

  const deleteProduct = async (id) => {
    try {
      await request(`/products/${id}`, "DELETE");
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
    setIsDeleting(null);
  };

  return (
    <div className={className}>
      {products.map((p) => (
        <div key={p.id} className="product-item">
          <p>{p.name}</p>
          <p>Price: {p.price} $</p>
          <p>Qty: {p.stock_quantity}</p>
          <p> Category: {p.category_id?.name || "N/A"}</p>
          <p className="id"> ID: {p.id}</p>
          <div className="buttons">
            <Button onClick={() => onEdit(p)} className="card-button">
              Edit
            </Button>
            <Button onClick={() => setIsDeleting(p.id)} className="card-button">
              Delete
            </Button>
          </div>
          {isDeleting === p.id && (
            <Modal onClose={() => setIsDeleting(null)}>
              <div className="modal-content">
                <h2>Are you sure?</h2>
                <p>Do you want to delete this product?</p>
                <div className="modal-buttons">
                  <Button onClick={() => deleteProduct(p.id)}>Delete</Button>
                  <Button onClick={() => setIsDeleting(null)}>Cancel</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
};

export const Products = styled(ProductsContainer)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;

  .id {
    font-size: 9px;
  }

  .modal-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .modal-buttons {
    display: flex;
    gap: 10px;
  }

  border-radius: 8px;
  p {
    font-size: 16px;
    font-weight: 500;
  }

  .product-item {
    padding: 10px;
    color: #282828;
    border: 1px solid #282828;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 250px;
    height: 180px;
  }

  .buttons {
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
  }
  .card-button {
    border: 1px solid #252525;
    padding: 0.3em 0.5em;
    font-size: 16px;
    width: 80px;
    cursor: pointer;
    border-radius: 50px;
  }
`;
