import styled from "styled-components";
import { ProductContent } from "./components";
import { useEffect } from "react";
import { loadProductAsync } from "../../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productSelect } from "../../selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Notification } from "../../ui-components";

const ProductContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(productSelect);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      const result = await dispatch(loadProductAsync(id));
      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
      }
    };
    loadProduct();
  }, [id, dispatch]);

  return (
    <div className={className}>
      <ProductContent product={product || {}} />
      {error && <Notification>{error}</Notification>}
    </div>
  );
};

const Product = styled(ProductContainer)`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 20px;
`;
export default Product;
