import { Typography } from "@mui/material";

function UserItemLarge() {
  const user = 2;
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
