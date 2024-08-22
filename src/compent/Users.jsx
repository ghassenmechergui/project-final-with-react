import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Users() {
  const navigate = useNavigate();
  function deconnecte() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  function login(e) {
    console.log(e);
    axios
      .post("https://tarmeezacademy.com/api/v1/login", e.user.info)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      });
  }
  return (
    <div className="user login">
      <div>
        <Link to={"/home"}>
          <ArrowBackIcon
            style={{
              fontSize: "40px",
              margin: " 5px 10px",
              position: "absolute",
            }}
          />
        </Link>

        <div className="  content-login" style={{ marginTop: "30px" }}>
          <h2>Astro</h2>
        </div>
        <div className="list-user">
          {users.map((e) => {
            console.log(typeof e.user.profile_image);
            return (
              <ListItemButton
                key={e.user.id}
                className="li-user"
                onClick={() => {
                  login(e);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={e.user.name || ""}
                    src={
                      typeof e.user.profile_image != "object"
                        ? e.user.profile_image
                        : ""
                    }
                  />
                </ListItemAvatar>
                <ListItemText id={2} primary={e.user.name}></ListItemText>
              </ListItemButton>
            );
          })}
        </div>
        <div className="deconnecte">
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            fullWidth
            style={{ borderRadius: "15px" }}
            onClick={deconnecte}
          >
            deconnected
          </Button>
        </div>
      </div>
    </div>
  );
}
