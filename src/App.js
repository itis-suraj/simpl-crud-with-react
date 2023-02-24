import React, { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [updatingUser, setUpdatingUser] = useState({
    isUpdating: false,
    existingUser: {},
  });

  const openFormHandler = () => {
    setIsFormOpen(true);
  };

  const closeFormHandler = () => {
    setIsFormOpen(false);
    if (updatingUser.isUpdating) {
      setUpdatingUser({ isUpdating: false, existingUser: {} });
    }
  };

  const editFormHandler = (editingUser) => {
    openFormHandler();
    setUpdatingUser({ isUpdating: true, existingUser: editingUser });
  };

  const unEditFormHandler = () => {
    setUpdatingUser({ isUpdating: false, existingUser: {} });
  };

  return (
    <div className="App">
      {!isFormOpen && <button onClick={openFormHandler}>Open Form</button>}
      {isFormOpen && (
        <Form
          onClose={closeFormHandler}
          updatingUser={updatingUser}
          closeEditForm={unEditFormHandler}
        />
      )}
      <Table onEdit={editFormHandler} />
    </div>
  );
}

export default App;
