import { useEffect } from "react";
import axios from "axios";
// compont import
import Post from "./Post";

// import react roote
import { Link } from "react-router-dom";

// import castom hook
import { usePosts } from "../context/ContextPosts";
//  mui import
import { Button, Typography } from "@mui/material";
import { Badge } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
export default function Home() {
  const { posts, dispatch } = usePosts();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  useEffect(() => {
    let cancelAxios = null;
    axios
      .get("https://tarmeezacademy.com/api/v1/posts", {
        cancelToken: new axios.CancelToken((c) => {
          console.log("deconnected");
          cancelAxios = c;
        }),
      })
      .then((response) => {
        console.log("connected");
        dispatch({ type: "start", payloed: { posts: response.data.data } });
      });

    return () => {
      cancelAxios();
    };
  }, []);
  const ariaLabel = { "aria-label": "description" };
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
  return (
    <div>
      <div className=" header">
        <Typography variant="h3">Astro</Typography>
        <div className=" header-rigth">
          <Badge badgeContent={4} color="primary">
            <RefreshIcon style={{ fontSize: "30px" }}></RefreshIcon>
          </Badge>
          <Link to="/profile">
            <PersonIcon style={{ fontSize: "1.5em" }} />
          </Link>
          <Link to={"/users"}>
            <MenuIcon style={{ fontSize: "1.5em" }} />
          </Link>
        </div>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          margin: "0 10px",
        }}
      >
        <Avatar
          alt={user.user.name || "A"}
          src={user.user.profile_image || ""}
          sx={{ width: 46, height: 46 }}
        />
        <Input placeholder="text" inputProps={ariaLabel} />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PermMediaIcon />}
        >
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <Divider />
      <div className="content">
        <div style={{ display: posts == null ? "block" : "none" }}>
          <Post loading />
          <Post loading />
        </div>
        {posts == null
          ? () => <Post loading />
          : posts.map((e) => {
              return <Post key={e.id} post={e} />;
            })}
      </div>
    </div>
  );
}
