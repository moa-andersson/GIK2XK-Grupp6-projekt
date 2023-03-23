import api from "../api.js";

// export async function getAll() {
//   const result = await api.get("/users/2/carts/3");
//   //const result = await api.get("/users/2/carts/1");

//   if (result.status === 200) return result.data;
//   else {
//     console.log(result.status);
//     console.log(result.data);
//     return [];
//   }
// }

export async function getAll(userId) {
  const result = await api.get(`/users/${userId}/cart/`);

  if (result.status === 200) return result.data;
  else {
    console.log(result.status);
    console.log(result.data);
    return [];
  }
}
