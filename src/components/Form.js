import React, { useReducer, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/UserContext";
import styles from "./Form.module.css";

const Backdrop = (props) => (
  <div className={styles.backdrop} onClick={() => props.onClose()} />
);

const reducerFn = (state, action) => {
  switch (action.type) {
    case "EDIT_NAME":
      return { ...state, name: action.value };
    case "EDIT_EMAIL":
      return { ...state, email: action.value };
    case "EDIT_PHONE":
      return { ...state, phone: action.value };
    case "EDIT_GENDER":
      return { ...state, gender: action.value };
    case "ADD_HOBBY": {
      if (!action.value) return { ...state, hobbies: [] };
      return { ...state, hobbies: state.hobbies.concat(action.value) };
    }
    case "DEL_HOBBY": {
      if (state.hobbies.includes(action.value)) {
        const newHobbies = state.hobbies.filter(
          (hobby) => hobby !== action.value
        );
        return { ...state, hobbies: newHobbies };
      } else return { ...state };
    }
    case "EDIT_USER": {
      console.log(action.value);
      const updatedFields = {
        ...state,
        name: action.value.name,
        gender: action.value.gender,
        email: action.value.email,
        phone: action.value.phone,
        hobbies: action.value.hobbies,
      };
      console.log(updatedFields);
      return updatedFields;
    }
    default:
      return { ...state };
  }
};

function Form(props) {
  const { addUser, updateUser } = useContext(UserContext);
  const { updatingUser, onClose, closeEditForm } = props;

  const initData = {
    name: "",
    email: "",
    phone: "",
    gender: null,
    hobbies: [],
  };
  const [user, dispatch] = useReducer(reducerFn, initData);

  useEffect(() => {
    if (updatingUser.isUpdating) {
      dispatch({ type: "EDIT_USER", value: updatingUser.existingUser });
    }
  }, [updatingUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (updatingUser.isUpdating) {
      updateUser(updatingUser.existingUser, user);
      closeEditForm();
    } else {
      user.id = Math.random().toString().slice(2, 8);
      addUser(user);
    }
    dispatch({ type: "EDIT_NAME", value: "" });
    dispatch({ type: "EDIT_EMAIL", value: "" });
    dispatch({ type: "EDIT_PHONE", value: "" });
    dispatch({ type: "EDIT_GENDER", value: "" });
    dispatch({ type: "EDIT_HOBBIES", value: "" });
    onClose();
  };
  console.log(user);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <form onSubmit={submitHandler} className="form">
            <div>
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) =>
                  dispatch({ type: "EDIT_NAME", value: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  dispatch({ type: "EDIT_EMAIL", value: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="gender">Gender: </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="male"
                  checked={user.gender === "male" ? true : false}
                  onChange={(e) => {
                    e.target.checked &&
                      dispatch({ type: "EDIT_GENDER", value: e.target.value });
                  }}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="female"
                  checked={user.gender === "female" ? true : false}
                  onChange={(e) => {
                    e.target.checked &&
                      dispatch({ type: "EDIT_GENDER", value: e.target.value });
                  }}
                />{" "}
                Female
              </label>
            </div>
            <div>
              <label htmlFor="phone">Phone: </label>
              <input
                type="number"
                id="phone"
                value={user.phone}
                onChange={(e) =>
                  dispatch({ type: "EDIT_PHONE", value: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="hobbies">Hobbies: </label>
              <label>
                <input
                  id="hobbies"
                  type="checkbox"
                  name="hobbies"
                  value="reading"
                  checked={user.hobbies.includes("reading") ? true : false}
                  onChange={(e) => {
                    e.target.checked &&
                      dispatch({ type: "ADD_HOBBY", value: e.target.value });
                    !e.target.checked &&
                      dispatch({ type: "DEL_HOBBY", value: e.target.value });
                  }}
                />
                Reading
              </label>
              <label>
                <input
                  id="hobbies"
                  type="checkbox"
                  name="hobbies"
                  value="writing"
                  checked={user.hobbies.includes("writing") ? true : false}
                  onChange={(e) => {
                    e.target.checked &&
                      dispatch({ type: "ADD_HOBBY", value: e.target.value });
                    !e.target.checked &&
                      dispatch({ type: "DEL_HOBBY", value: e.target.value });
                  }}
                />
                Writing
              </label>
              <label>
                <input
                  id="hobbies"
                  type="checkbox"
                  name="hobbies"
                  value="playing"
                  checked={user.hobbies.includes("playing") ? true : false}
                  onChange={(e) => {
                    e.target.checked &&
                      dispatch({ type: "ADD_HOBBY", value: e.target.value });
                    !e.target.checked &&
                      dispatch({ type: "DEL_HOBBY", value: e.target.value });
                  }}
                />
                Playing
              </label>
            </div>
            <button onClick={submitHandler}>Submit</button>
          </form>
          <button onClick={() => onClose()}>Close Form</button>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Form;
