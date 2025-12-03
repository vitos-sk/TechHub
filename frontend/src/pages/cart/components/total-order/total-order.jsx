import styled from "styled-components";
import { Button } from "../../../../ui-components";

const TotalOrderContainer = ({ className, total }) => {
  const formattedTotal = Number(total).toFixed(2);
  return (
    <div className={className}>
      <h3>Order Summary</h3>
      <p className="total-amount">Total: {formattedTotal} $</p>
      <Button onClick={() => alert("Go to payment")}>Go to Payment</Button>
    </div>
  );
};

export const TotalOrder = styled(TotalOrderContainer)`
  display: flex;
  flex: 0 1 190px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 350px;

  gap: 20px;

  border-radius: 8px;

  h3 {
    padding: 11px;
    color: #3c3b3b;
    font-size: 16px;
    font-weight: 600;
  }

  .total-amount {
    font-size: 11px;
    font-weight: 700;
    color: #393939;
  }

  button {
    padding: 8px;
    @media (max-width: 668px) {
      font-size: 10px;
    }
  }
`;
