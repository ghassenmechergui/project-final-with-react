import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Skeleton from "@mui/material/Skeleton";
import { CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
export default function Post(props) {
  const { loading = false } = props;
  const { post = { username: "" } } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={post.author.name} src={post.author.profile_image} />
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            post.author.name
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            post.created_at
          )
        }
      />
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body1" color="text.secondary" component="h">
            {post.title}
          </Typography>
        )}
      </CardContent>
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <>
          <CardMedia component="img" height="140" image={post.image} />
        </>
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            {post.body}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        {loading ? null : (
          <IconButton>
            <Badge badgeContent={post.comments_count} color="primary">
              <MailIcon />
            </Badge>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

Post.propTypes = {
  loading: PropTypes.bool,
};
