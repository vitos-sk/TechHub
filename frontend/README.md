# Техническое задание: Фронтенд интернет-магазина

## Области хранения данных:

- База данных на JSON-сервер
- BFF (Backend For Frontend)
- Redux-store

## Сущности приложения:

- Пользователи: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
- Товары: БД (каталог товаров), стор (отображение в каталоге)
- Категории: БД (список категорий), стор (навигация и фильтрация)
- Корзина: localStorage/стор (временное хранение), BFF (при авторизации)
- Заказы: БД (история заказов), стор (текущий заказ)

## Таблицы БД:

- Пользователи - users: id / login / password / email / registered_at / role_id
- Роли - roles: id / name (admin, user)
- Товары - products: id / name / description / price / image_url / category_id / stock_quantity / created_at
- Категории - categories: id / name / description
- Корзина - cart_items: id / user_id / product_id / quantity / added_at
- Заказы - orders: id / user_id / total_amount / status / created_at / delivery_method / payment_method
- Позиции заказа - order_items: id / order_id / product_id / quantity / price

## Схема состояния на BFF:

- Сессия текущего пользователя: login / password / role / cart_session_id
- Корзина сессии: session_id / items / total_amount

## Схема для Redux Store (на клиенте):

### User State:

- user: login / id / email / roleId / isAuthenticated
- authStatus: loading / success / error

### Products State:

- products: массив product: id / name / description / price / imageUrl / categoryId / stockQuantity
- categories: массив category: id / name / description
- currentProduct: id / name / description / price / imageUrl / categoryId / stockQuantity / reviews
- filters: searchQuery / selectedCategory / sortBy / priceRange

### Cart State:

- cartItems: массив cartItem: productId / name / price / imageUrl / quantity / totalPrice
- cartTotal: totalQuantity / totalAmount
- cartStatus: loading / success / error

### Admin State:

- adminProducts: массив product: id / name / description / price / imageUrl / categoryId / stockQuantity / createdAt
- adminUsers: массив user: id / login / email / registeredAt / role
- adminOrders: массив order: id / userId / totalAmount / status / createdAt / items

### UI State:

- loading: общие состояния загрузки
- errors: массив ошибок по модулям
- modals: состояния модальных окон

## Основной функционал:

### Публичная часть:

1. Каталог товаров с поиском и фильтрацией
2. Страница товара с детальной информацией
3. Корзина с управлением количеством
4. Регистрация/Авторизация
5. Оформление заказа

### Админ-панель:

1. Управление товарами (CRUD операции)
2. Управление категориями
3. Просмотр заказов
4. Управление пользователями

## Роуты приложения:

- / - главная страница с товарами
- /category/:id - товары по категории
- /product/:id - страница товара
- /cart - корзина
- /checkout - оформление заказа
- /login - авторизация
- /register - регистрация
- /profile - профиль пользователя
- /admin - админ-панель
- /admin/products - управление товарами
- /admin/orders - управление заказами
- /admin/users - управление пользователями

## Технический стек:

- React + Redux Toolkit
- React Router
- JSON Server (имитация backend)
- localStorage для корзины неавторизованных
- CSS Modules / Styled Components
