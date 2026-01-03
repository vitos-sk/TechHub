import styled from "styled-components";
import { CartCard } from "./components";
import { userSelect, cartSelect } from "../../selectors";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { considerTotalPrice } from "./utils";
import { TotalOrder } from "./components";
import { Notification } from "../../ui-components";
import { loadCartAsync } from "../../actions";

const CartContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(userSelect);
  const cart = useSelector(cartSelect);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await dispatch(loadCartAsync());

        if (result?.error) {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message || "Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  const items = cart?.items || [];
  const total = considerTotalPrice(items);

  if (isLoading) {
    return (
      <div className={className}>
        <Notification>Загрузка...</Notification>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Notification>{error}</Notification>
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
                onUpdate={() => dispatch(loadCartAsync())}
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
