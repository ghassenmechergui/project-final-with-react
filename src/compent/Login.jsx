import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
export default function Login() {
  const [inputLogin, setInputLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function login() {
    axios
      .post("https://tarmeezacademy.com/api/v1/login", inputLogin)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(response.data);
        response.data.user.info = inputLogin;
        const uniUser = [...new Map(users.map((e) => [e.user.id, e])).values()];

        localStorage.setItem("users", JSON.stringify(uniUser.reverse()));
        setInputLogin({
          username: "",
          password: "",
        });
        navigate("/home");
      });
  }
  return (
    <div className=" login">
      <div className=" content-login " style={{ marginTop: "30px" }}>
        <h2> Astro</h2>

        <div
          style={{ marginTop: "80px", width: "80%" }}
          className=" loginforme"
        >
          <TextField
            fullWidth
            id="outlined-input"
            label="username"
            type="text"
            autoComplete="current-username"
            value={inputLogin.username}
            onChange={(e) => {
              setInputLogin({ ...inputLogin, username: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={inputLogin.password}
            onChange={(e) => {
              setInputLogin({ ...inputLogin, password: e.target.value });
            }}
          />
          <Button
            variant="contained"
            disableElevation
            fullWidth
            style={{ marginTop: "40px", borderRadius: "15px" }}
            onClick={login}
          >
            login
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            disableElevation
            fullWidth
            style={{ marginTop: "100px", borderRadius: "15px" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            register
          </Button>
        </div>
      </div>
    </div>
  );
}
