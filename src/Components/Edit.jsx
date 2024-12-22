import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  let [name, setName] = useState("");
  let [age, setAge] = useState("");
  let [club, setClub] = useState("");
  let [id, setId] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setClub(localStorage.getItem("club"));
    setAge(localStorage.getItem("age"));
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(
        `https://futball-records-default-rtdb.firebaseio.com/footballData/${id}.json`,
        {
          player_name: name,
          player_club: club,
          player_age: age,
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Something went wrong! Please try again.");
      });
  }
  return (
    <div>
      {" "}
      <form onSubmit={handleUpdate}>
        <label>
          Enter Your Name
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <br />

        <label>
          Enter Your Team
          <input
            type="text"
            placeholder="your team"
            value={club}
            onChange={(e) => {
              setClub(e.target.value);
            }}
          />
        </label>
        <br />

        <label>
          Enter Your Age
          <input
            type="number"
            placeholder="your age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </label>
        {/* <Link to={"/"}> */}
        <div>
          <input type="submit" value="Update" />
        </div>
        {/* </Link> */}
      </form>
      <Link to={"/"}>
        <button>go back to Read page</button>
      </Link>
    </div>
  );
}

export default Edit;
