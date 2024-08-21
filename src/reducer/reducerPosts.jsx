export default function reducerPosts(currentPosts, action) {
  switch (action.type) {
    case "start":
      return action.payloed.posts;
    case "next":
      console.log(currentPosts);
      let n = currentPosts;
      action.payloed.posts.map((e) => {
        n.push(e);
      });
      return n;

    default:
      break;
  }
}
