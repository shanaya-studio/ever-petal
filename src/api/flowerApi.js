import api from "./api";

export const getFlowers = () => {
    return api.get("/flowers");
};

export const getFlower = (id) => {
    return api.get(`/flowers/${id}`);
};

export const addFlower = (flower) => {
    return api.post("/flowers", flower);
};

export const updateFlower = (id, flower) => {
    return api.put(`/flowers/${id}`, flower);
};

export const deleteFlower = (id) => {
    return api.delete(`/flowers/${id}`);
};