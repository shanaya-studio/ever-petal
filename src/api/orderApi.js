import api from "./api";

// Get all orders
export const getOrders = () => {
  return api.get("/orders");
};

// Get one order
export const getOrder = (id) => {
  return api.get(`/orders/${id}`);
};

// Add order
export const addOrder = (order) => {
  return api.post("/orders", order);
};

// Update order
export const updateOrder = (id, order) => {
  return api.put(`/orders/${id}`, order);
};

// Delete order
export const deleteOrder = (id) => {
  return api.delete(`/orders/${id}`);
};