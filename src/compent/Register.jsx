import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function () {
  const [inputRegister, setInputRegister] = useState({
    name: "",
    username: "",
    password: "",
    image: null,
  });
  const navigate = useNavigate();
  function register() {
    let formData = new FormData();
    formData.append("name", inputRegister.name);
    formData.append("username", inputRegister.username);
    formData.append("password", inputRegister.password);
    formData.append("image", inputRegister.image);
    axios
      .post("https://tarmeezacademy.com/api/v1/register", formData)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      });
  }
  return (
    <div>
      <div className=" login">
        <Link>
          <ArrowBackIcon style={{ fontSize: "40px", margin: "20px" }} />
        </Link>
        <div className=" content-login">
          <h2> Astro</h2>

          <div
            style={{ marginTop: "80px", width: "80%" }}
            className=" loginforme"
          >
            <TextField
              onChange={(e) => {
                setInputRegister({ ...inputRegister, name: e.target.value });
              }}
              value={inputRegister.name}
              fullWidth
              id="outlined-input"
              label="name"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setInputRegister({
                  ...inputRegister,
                  username: e.target.value,
                });
              }}
              value={inputRegister.username}
              fullWidth
              id="outlined-input"
              label="username"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setInputRegister({
                  ...inputRegister,
                  password: e.target.value,
                });
              }}
              value={inputRegister.password}
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(e) => {
                  setInputRegister({
                    ...inputRegister,
                    image: e.target.files[0],
                  });
                }}
                files={inputRegister.image}
                type="file"
              />
            </Button>

            <Button
              color="primary"
              variant="contained"
              disableElevation
              fullWidth
              style={{ marginTop: "50px", borderRadius: "15px" }}
              onClick={register}
            >
              register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
