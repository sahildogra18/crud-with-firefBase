import { useSelector, useDispatch } from "react-redux";
import { getAllData } from "../features/getdataSlice";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getAllData()); // API call Redux Thunk naal
  }, [dispatch]);

  function handleDelete(id) {
    axios
      .delete(
        `https://futball-records-default-rtdb.firebaseio.com/footballData/${id}.json`
      )
      .then(() => {
        dispatch(getAllData()); // State update karan layi getAllData dobara call karo
        console.log(`Deleted player with ID: ${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function sendDataToLocalStorage(id, name, club, age) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("club", club);
    localStorage.setItem("age", age);
  }

  return (
    <>
      <Link to={"/create"}>
        <button>Go Back to Create Page</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Club Name</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.user &&
            Object.entries(data.user).map(([id, player]) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{player.player_name}</td>
                  <td>{player.player_club}</td>
                  <td>{player.player_age}</td>
                  <td>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                  <td>
                    <Link to={"/edit"}>
                      <button
                        onClick={() =>
                          sendDataToLocalStorage(
                            id,
                            player.player_name,
                            player.player_club,
                            player.player_age
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Read;
