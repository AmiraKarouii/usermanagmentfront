import './App.css';
import Table from "./components/table";
import Searchbar from "./components/searchbar";
import AddForm from "./components/addForm";
import {useState} from "react";

function App() {
const [people, setPeople] = useState([]);
 const [editingUser, setEditingUser] = useState(null);

  const addPerson = (newPerson) => {
    setPeople([...people, newPerson]);
  };
  return (
      <>
          <h1>Users Managment</h1>
        <Searchbar/>
          <AddForm editedUser={editingUser} addPerson={addPerson} people={people}/>
            <Table  onEditUser={setEditingUser} people={people}/></>
  );
}

export default App;

