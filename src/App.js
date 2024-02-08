import './App.css';
import Table from "./components/table";
import Searchbar from "./components/searchbar";
import AddForm from "./components/addForm";
import {useState} from "react";
import axios from 'axios';


function App() {
const [people, setPeople] = useState([]);
 const [editingUser, setEditingUser] = useState(null);
 const [searchResults, setSearchResults] = useState([]);
const [noUsersFound, setNoUsersFound] = useState(false);
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user/users/${query}`);
    const people = response.data;
      console.log('Users:', people);
      setSearchResults(people);
    } catch (error) {
      console.error('Error searching users:', error);
        setNoUsersFound(true);
    }
  };


  const addPerson = (newPerson) => {
    setPeople([...people, newPerson]);
  };
  return (
      <>
          <h1>Users Managment</h1>
        <Searchbar onSearch={handleSearch}/>
          <AddForm editedUser={editingUser} addPerson={addPerson} people={people}/>
            <Table  searchResult={searchResults} onEditUser={setEditingUser} setSearchResult={setSearchResults} setNoUsersFound={setNoUsersFound} people={people} noUsersFound={noUsersFound}/>
      </>
  );
}

export default App;



