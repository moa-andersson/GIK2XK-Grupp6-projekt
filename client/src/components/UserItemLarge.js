import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOne } from "../models/UserModel";

// Ändrade lite här så komponenten tar emot en user
function UserItemLarge({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getOne(userId).then((user) => setUser(user));
  }, []);
  console.log("USERRID:", userId);
  console.log("USERS:", user);

  // var currentUser;
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i].id == userId) {
  //     currentUser = users[i];
  //   }
  // }

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
