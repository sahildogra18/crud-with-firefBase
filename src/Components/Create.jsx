import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  let [name, setName] = useState("sudhanshu");
  let [age, setAge] = useState("26");
  let [club, setClub] = useState("Manchester City");

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "https://futball-records-default-rtdb.firebaseio.com/footballData/.json",
        {
          player_name: name,
          player_club: club,
          player_age: age,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Link to={"/"}>
        <button>Get back to list</button>
      </Link>
      <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Submit" />
        </div>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default Create;
