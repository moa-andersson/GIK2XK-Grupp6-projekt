import { Typography } from "@mui/material";

function UserItemLarge({ user }) {
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
