import styled from "styled-components";
import { CartCard } from "./components";
import { userSelect } from "../../selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { considerTotalPrice } from "./utils";
import { TotalOrder } from "./components";
import { Notification } from "../../ui-components";
import { request } from "../../utils";

const CartContainer = ({ className }) => {
  const { id: userId } = useSelector(userSelect);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await request("/cart", "GET");

      if (!response.error) {
        setCart(response.data);
      } else {
        console.error("Ошибка загрузки корзины:", response.error);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const items = cart?.items || [];
  const total = considerTotalPrice(items);

  if (isLoading) {
    return (
      <div className={className}>
        <Notification>Загрузка...</Notification>
      </div>
    );
  }

  return (
    <div className={className}>
      {items.length === 0 ? (
        <Notification>The cart is empty </Notification>
      ) : (
        <>
          <div className="products">
            {items.map((item) => (
              <CartCard
                key={item.product_id}
                name={item.name}
                image_url={item.image_url}
                price={item.price}
                quantity={item.quantity}
                id={item.product_id}
                product_id={item.product_id}
                onUpdate={fetchCart}
              />
            ))}
          </div>
          <div className="total-order">
            <TotalOrder total={total} />
          </div>
        </>
      )}
    </div>
  );
};

const Cart = styled(CartContainer)`
  display: flex;
  gap: 20px;
  padding: 10px;
  width: 100%;

  align-items: flex-start;

  .products {
    flex: 0 1 940px;
    min-height: 350px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    padding: 20px 0 0 20px;
  }

  .total-order {
    flex: 0 1 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 350px;
    gap: 20px;
    padding: 20px 0 0 0;
  }
`;

export default Cart;
