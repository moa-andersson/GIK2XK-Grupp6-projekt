import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAll } from "../models/UserModel";

function UserItemSmall() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((users) => setUsers(users));
  }, []);

  let smallUser;
  if (users[0]) {
    smallUser = users[0];
  } else {
    smallUser = {
      firstName: "hittades inte",
      lastName: "hittades inte",
      id: 0,
    };
  }
  return (
    <Typography fontSize="1.4rem" color="secondary" variant="h2">
      {smallUser.firstName} {smallUser.lastName}
    </Typography>
  );
}

export default UserItemSmall;
