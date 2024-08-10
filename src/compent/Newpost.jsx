import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { ListItemButton, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useState } from "react";
export default function Newpost() {
  const user = JSON.parse(localStorage.getItem("user"));
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
  const [imageurl, setimageurl] = useState(null);
  function hindelInputDaylouied(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimageurl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={"/home"}>
          <ArrowBackIcon style={{ fontSize: "40px", margin: "20px" }} />
        </Link>
        <Typography variant="h5">crée une publication</Typography>
      </div>
      <Divider />

      <ListItemButton className="li-user" style={{ margin: "0 10px" }}>
        <ListItemAvatar>
          <Avatar alt={user.user.name} src={user.user.profile_image} />
        </ListItemAvatar>
        <ListItemText id={2} primary={user.user.name}></ListItemText>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PermMediaIcon />}
        >
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              console.log(e.target.result);
              hindelInputDaylouied(e);
            }}
          />
        </Button>
      </ListItemButton>

      <TextField
        color="secondary"
        className="inputNewPost"
        id="contained-multiline"
        label="text"
        fullWidth
        multiline
        rows={8}
        defaultValue=""
      />
      <div>
        <Card
          fullWidth
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 20px ",
            padding: "10px",
          }}
        >
          <CardMedia sx={{ height: 140 }} title="green iguana">
            <img
              src={imageurl}
              alt=""
              srcset=""
              style={{ width: "100%", height: "100%" }}
            />
          </CardMedia>
        </Card>
      </div>

      <div style={{ margin: "0 10px" }}>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          style={{ marginTop: "40px ", borderRadius: "15px" }}
        >
          publie
        </Button>
      </div>
    </div>
  );
}
