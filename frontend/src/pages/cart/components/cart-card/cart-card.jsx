import styled from "styled-components";
import { Button, Modal } from "../../../../ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../../../utils";
import { loadCartAsync } from "../../../../actions";

const CartCardContainer = ({
  className,
  name,
  image_url,
  price,
  id,
  quantity,
  onUpdate,
}) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (newQuantity) => {
    if (newQuantity < 0) return;

    try {
      setIsUpdating(true);
      if (newQuantity === 0) {
        const res = await request(`/cart/${id}`, "DELETE");

        if (!res.error) {
          setIsDeleting(false);
          await dispatch(loadCartAsync());
          if (onUpdate) onUpdate();
        } else {
          console.error("Ошибка от сервера:", res.error);
        }
      } else {
        const res = await request("/cart", "POST", {
          product_id: id,
          quantity: newQuantity,
        });
        if (!res.error) {
          await dispatch(loadCartAsync());
          if (onUpdate) onUpdate();
        } else {
          console.error("Ошибка от сервера:", res.error);
        }
      }
    } catch (error) {
      console.error("Ошибка обновления:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={className}>
      <div className="card">
        <div className="card-img">
          <img src={image_url} alt={name} />
          <p className="id">id: {id}</p>
        </div>
        <div className="card-info">
          <h5 className="text-title">{name}</h5>
          <p>{price} $</p>
          <p>qty: {quantity}</p>
        </div>
        <div className="card-footer">
          <div className="cp-icon-div">
            <img
              className="cp-icon"
              src="/remove.svg"
              alt="remove"
              onClick={() => setIsDeleting(true)}
            />
            <div className="cp-icon" onClick={() => handleUpdate(quantity + 1)}>
              <h3>+</h3>
            </div>
            <div className="cp-icon" onClick={() => handleUpdate(quantity - 1)}>
              <h3>-</h3>
            </div>
          </div>
        </div>
      </div>
      <Modal show={isDeleting} onClose={() => setIsDeleting(false)}>
        <div className="modal-content">
          <h2>Are you sure?</h2>
          <p>Remove this item from the cart?</p>
          <div className="modal-buttons">
            <Button onClick={() => handleUpdate(0)}>Delete</Button>
            <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const CartCard = styled(CartCardContainer)`
  position: relative;
  color: #383838;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
  border: 1px solid #676767;

  .text-title {
    max-width: 80px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .card {
    flex: 1 1 260px;
    height: 150px;
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    padding: 5px;
  }

  .card-img {
    flex: 0 1 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & img {
      width: 70px;
      height: 70px;
    }
  }

  .id {
    font-size: 7px;
    color: #999;
    position: relative;
    top: 45px;
  }

  .cp-icon-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 5px;
  }

  .cp-icon {
    width: 35px;
    height: 35px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 15px;

    backdrop-filter: blur(3px);
    box-shadow: 2px 2px 8px rgba(86, 86, 86, 1), 1px 1px 10px rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cp-icon:hover {
    transform: scale(1.2);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 1), 1px 1px 10px rgba(255, 255, 255, 0.6),
      inset 2px 2px 10px rgba(0, 0, 0, 1), inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  .cp-icon:active {
    transform: scale(1.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8) inset;
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 3px 0 0 0;
  }

  .modal-content {
    color: #f9f9f9;
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
`;
