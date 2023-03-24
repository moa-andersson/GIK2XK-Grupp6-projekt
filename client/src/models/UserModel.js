import api from "../api.js";

export async function getAll() {
  const result = await api.get("/users");

  if (result.status === 200) {
    return result.data;
  } else {
    console.log(result.status);
    console.log(result.data);
    console.log("Tom array");
    return [];
  }
}

export async function getOne(userId) {
  const result = await api.get(`/users/${userId}`);

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
