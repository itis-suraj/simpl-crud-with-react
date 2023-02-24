import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import styles from "./Table.module.css";

const joinArray = (array) => {
  return array.map((el) => el[0].toUpperCase() + el.slice(1)).join(" ");
};

function Table(props) {
  let { users, deleteUser } = useContext(UserContext);

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id} className={styles.item}>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {user.gender && (
            <p>Gender: {user.gender[0].toUpperCase() + user.gender.slice(1)}</p>
          )}
          {user.hobbies.length > 0 && <p>Hobbies: {joinArray(user.hobbies)}</p>}
          <div>
            <button
              onClick={() => {
                props.onEdit(user);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Table;
