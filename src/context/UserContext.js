import { createContext, useReducer } from "react";

const UserContext = createContext({
  users: [],
  addUser: (user) => {},
  deleteUser: (id) => {},
  updateUser: (user) => {},
});

const reducerUsers = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return state.concat(action.value);
    case "DEL_USER":
      return state.filter((user) => user.id !== action.value);
    case "UPDATE_USER": {
      const { exisitingUser, newData } = action.value;
      return state.map((user) => {
        if (user.id === exisitingUser.id) {
          const update = {
            name: newData.name,
            id: user.id,
            gender: newData.gender,
            email: newData.email,
            phone: newData.phone,
            hobbies: newData.hobbies,
          };
          return { ...update };
        } else return user;
      });
    }
    default:
      return state;
  }
};

export const UserContextProvider = (props) => {
  const [users, dispatchUsers] = useReducer(reducerUsers, []);

  const addUserHandler = (user) => {
    dispatchUsers({ type: "ADD_USER", value: user });
  };

  const deleteUserHandler = (id) => {
    dispatchUsers({ type: "DEL_USER", value: id });
  };

  const updateUserHandler = (exisitingUser, newData) => {
    dispatchUsers({
      type: "UPDATE_USER",
      value: { exisitingUser, newData },
    });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser: addUserHandler,
        deleteUser: deleteUserHandler,
        updateUser: updateUserHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
