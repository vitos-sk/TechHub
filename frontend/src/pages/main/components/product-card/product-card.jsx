import styled from "styled-components";
import { Link } from "react-router-dom";
import { userSelect } from "../../../../selectors";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../../ui-components";
import { Modal } from "../../../../ui-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../../../../utils";
import { loadCartAsync } from "../../../../actions";

const ProductCardContainer = ({ className, name, image_url, price, id }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { id: userId } = useSelector(userSelect);
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!userId) {
      setShowModal(true);
      return;
    }

    try {
      setIsAdding(true);
      const product = {
        product_id: id,
        price,
        name,
        image_url,
        quantity: 1,
      };
      const response = await request("/cart", "POST", product);

      if (!response.error) {
        await dispatch(loadCartAsync());
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={className}>
      <div className="card">
        <div className="form_front">
          <Link to={`/product/${id}`}>
            <div className="card-img">
              {image_url ? (
                <img src={image_url} alt={name} />
              ) : (
                <img src="/placeholder.png" alt="No image" />
              )}
            </div>
            <div className="card-info">
              <h4 className="text-title">{name}</h4>
            </div>
          </Link>
          <div className="card-footer">
            <Button className="card-button" onClick={addToCart} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add"}
            </Button>
            <span>${price}</span>
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

export const ProductCard = styled(ProductCardContainer)`
  .modal-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 8px;
  }

  .modal-buttons {
    display: flex;
    gap: 10px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  .card {
    flex: 1 1 190px;
    height: 315px;
    padding: 10px;
    max-width: 190px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 7px;
    margin: 10px 10px 0 0;
  }
  .form_front {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .card-img {
    flex: 1;
    background-color: #ffffff;
    height: 70%;
    width: 100%;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }
  span {
    color: #4e4e4e;
  }

  .card-info {
    padding-top: 5%;
    flex-grow: 1;
    height: 20px;
  }

  .text-title {
    font-weight: 900;
    font-size: 1.2em;
    line-height: 1.7;
    margin: 0;
    color: #373636;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #777777;
  }

  .card-button {
    border: 1px solid #252525;
    padding: 0.3em 0.5em;
    cursor: pointer;
    border-radius: 50px;
    color: #474747;
  }
  @media (max-width: 470px) {
    flex: 1 1 150px;
    max-width: 150px;
    padding: 5px;

    .card {
      height: 220px;
    }

    .card-info {
      font-size: 10px;
    }
    .card-img {
      height: 100px;
    }

    .form_front {
      gap: 40px;
    }
  }
`;
