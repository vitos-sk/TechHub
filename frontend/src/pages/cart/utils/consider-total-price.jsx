export const considerTotalPrice = (items = []) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0)
