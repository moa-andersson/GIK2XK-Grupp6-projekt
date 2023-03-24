import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOne } from "../models/UserModel";

function UserItemLarge({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getOne(userId).then((user) => setUser(user));
  }, []);
  console.log("USERRID:", userId);
  console.log("USERS:", user);

  return (
    <>
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography>{user.email}</Typography>
    </>
  );
}

export default UserItemLarge;
