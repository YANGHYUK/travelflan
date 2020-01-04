import React from "react";

const UserInfoContext = React.createContext([
  {
    email: "user@gmail.com",
    password: "123456"
  }
]);

export const UserInfoContextProvider = UserInfoContext.Provider;
export const UserInfoContextConsumer = UserInfoContext.Consumer;
export default UserInfoContext;
