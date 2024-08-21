import { useEffect, useState } from "react";
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

import { useImage } from "../context/contextImage";
import Pagenetion from "./Pagenetion";
export default function Home() {
  const { posts, dispatch } = usePosts();
  const [counter, setCounter] = useState({
    counter: 1,
    state: true,
  });

  const user = JSON.parse(localStorage.getItem("user")) || "";
  useEffect(() => {
    let cancelAxios = null;
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts?page=${counter.counter}`, {
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

  const { imageurl, setimageurl } = useImage();
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

  window.onscroll = function () {
    let heigth =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    let end = scrollTop / heigth;

    if (end > 0.999 && counter.state == true) {
      setCounter({ ...counter, state: false });
      axios
        .get(`https://tarmeezacademy.com/api/v1/posts?page=${counter + 1}`)
        .then((response) => {
          console.log(response);
          setCounter({ ...counter, state: false });
          dispatch({ type: "next", payloed: { posts: response.data.data } });
          setCounter({ ...counter, counter: counter.counter + 1 });
        });
    }
  };

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

          margin: "18px 10px",
        }}
      >
        <Avatar alt={user.user.name || "A"} sx={{ width: 46, height: 46 }} />
        <Link to={"/newPost"}>
          <Input fullWidth placeholder="text" inputProps={ariaLabel} />
        </Link>
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
              hindelInputDaylouied(e);
            }}
          />
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
      <Pagenetion />
    </div>
  );
}
