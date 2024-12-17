import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Read() {
  let [data, setData] = useState([]);
  function getData() {
    axios
      .get(
        `https://futball-records-default-rtdb.firebaseio.com/footballData.json`
      )
      .then((response) => {
        setData(response.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id) {
    axios
      .delete(
        `https://futball-records-default-rtdb.firebaseio.com/footballData/${id}.json`
      )
      .then(() => {
        getData();
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
        <button>go back to create page</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Club Name</th>
            <th>age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([id, player]) => {
            return (
              <>
                <tr key={id}>
                  <td>{id}</td>
                  <td>{player.player_name}</td>
                  <td>{player.player_club}</td>
                  <td>{player.player_age}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={"/edit"}>
                      <button
                        onClick={() => {
                          sendDataToLocalStorage(
                            id,
                            player.player_name,
                            player.player_club,
                            player.player_age
                          );
                        }}
                      >
                        edit
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Read;
