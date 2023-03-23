import api from "../api.js";

export async function getAll() {
  const result = await api.get("/products/");

  if (result.status === 200) return result.data;
  else {
    console.log(result.status);
    console.log(result.data);
    console.log("Tom array");
    return [];
  }
}

export async function getOne(id) {
  console.log("GetOneID: ", id);
  const result = await api.get(`/products/${id}`);
  if (result.status === 200) {
    console.log("SUCCESS!");
    console.log(result.data);
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    console.log("FAIL!");
    return [];
  }
}

export async function update(product) {
  const result = await api.put(`/products/`, product);
  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}
export async function create(product) {
  const result = await api.post("/products/", product);
  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}

export async function remove(id) {
  const result = await api.delete("/products/", { data: { id } });
  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}

export async function addRating(rating) {
  const id = rating.productId;
  const result = await api.post(`/products/${id}/addRating/`, rating);
  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}

export async function addToCart(cartRow) {
  const productId = cartRow.productId;
  const userId = cartRow.userId;
  const result = await api.post(
    `/products/${productId}/user/${userId}/addToCart/`,
    cartRow
  );
  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}
