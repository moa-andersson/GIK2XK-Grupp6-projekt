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
    };
  }

  return (
    <div>
      {smallUser.firstName} {smallUser.lastName}
    </div>
  );
}

export default UserItemSmall;
