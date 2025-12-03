import styled from "styled-components";
import { Button, Loader } from "../../../../ui-components";
import { useSelector } from "react-redux";
import { userSelect } from "../../../../selectors";
import { useState } from "react";
import { Modal } from "../../../../ui-components";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../utils";

const ProductContentContainer = ({ product, className }) => {
  const {
    image_url,
    name,
    price,
    description,
    id,
    stock_quantity,
    created_at,
    long_description,
  } = product;

  const { id: userId } = useSelector(userSelect);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!userId) {
      setShowModal(true);
      return;
    }
    const product = {
      product_id: id,
      price,
      name,
      image_url,
      quantity: 1,
    };
    await request("/cart", "POST", product);
  };

  if (!product || !product.name) {
    return <Loader />;
  }

  return (
    <div className={className}>
      <div className="center-wrapper">
        <div className="card">
          <div className="top-section">
            <div className="product-img">
              <img src={image_url || null} alt={name} />
            </div>
            <div className="product-info">
              <div className="div-1">
                <h1>{name}</h1>
                <h3>{description}</h3>
                <p>Stock quantity: {stock_quantity}</p>
              </div>
              <div className="div-2">
                <p>{price}$</p>
                <Button type="primary" onClick={addToCart}>
                  Add to cart
                </Button>
              </div>
              <p>{created_at}</p>
              <p>Product ID: {id}</p>
            </div>
          </div>
          <div className="long-description">
            <h3>Description</h3>
            <p>{long_description}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>Authorization required</h2>
            <p>Please authorize to add product to cart</p>
            <div className="modal-buttons">
              <Button onClick={() => navigate("/authorization")}>Login</Button>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export const ProductContent = styled(ProductContentContainer)`
  max-width: 900px;
  width: 100%;
  margin: 40px auto;

  .modal-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 8px;
  }

  .modal-buttons {
    display: flex;
    gap: 10px;
  }

  .center-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    border-radius: 16px;
    color: #000000;
    background: #ffffffe3;
    width: 100%;
  }

  .top-section {
    display: flex;
    flex-direction: row;
    gap: 90px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .product-img {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
    }
  }

  @media (max-width: 695px) {
    .top-section {
      flex-direction: column;
      gap: 20px;
    }

    .product-img img {
      width: 100%;
      max-width: none;
    }
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    .div-1 {
      display: flex;
      flex-direction: column;
      gap: 8px;

      h1 {
        margin: 0;
        font-size: 1.8rem;
        color: #2d2d2d;
      }

      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        color: #545454;
      }
    }

    .div-2 {
      display: flex;
      flex-direction: column;
      gap: 10px;

      p {
        font-size: 1.2rem;
        font-weight: 600;
        color: #6f6f6f;
      }
    }

    p {
      font-size: 0.85rem;
      color: #626262;
      margin-top: 10px;
    }
  }

  .long-description {
    width: 100%;
    border-top: 1px solid #777777;
    padding-top: 20px;

    h3 {
      margin: 0 0 10px 0;
      font-size: 1.2rem;
      color: #4c4c4c;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #595959;
      line-height: 1.5;
    }
  }
`;
