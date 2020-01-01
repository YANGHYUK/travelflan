import React, { createContext } from "react";

const UserInfoContext = createContext([
  {
    email: "user@gmail.com",
    password: "123456"
  }
]);

export default UserInfoContext;
