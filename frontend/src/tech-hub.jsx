import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Loader, Footer, Header } from "./ui-components";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { ROLE } from "./bff/constans";
import { useSelector } from "react-redux";
import { userSelect } from "./selectors";
import { Navigate } from "react-router-dom";

const Authorization = lazy(() => import("./pages/authorization/authorization"));
const Registration = lazy(() => import("./pages/registaration/registration"));
const Main = lazy(() => import("./pages/main/main"));
const Product = lazy(() => import("./pages/product/product"));
const Cart = lazy(() => import("./pages/cart/cart"));
const AdminPanel = lazy(() => import("./pages/admin-panel/admin-panel"));

function TechHub({ className }) {
  const [init, setInit] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(userSelect);

  useEffect(() => {
    const currentUserDataJson = localStorage.getItem("userData");
    if (currentUserDataJson) {
      const currentUserData = JSON.parse(currentUserDataJson);
      dispatch(
        setUser({
          ...currentUserData,
          role_id: Number(currentUserData.role_id),
        })
      );
    }
    setInit(false);
  }, [dispatch]);

  return (
    <AppContainer className={className}>
      <Header />
      <MainContent>
        <Suspense fallback={<Loader />}>
          {init ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/admin-panel"
                element={user.role === ROLE.ADMIN ? <AdminPanel /> : <Navigate to="/" />}
              />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          )}
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default TechHub;

const AppContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  min-height: 90vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 70px auto 10px auto;
  min-height: 80vh;
`;
