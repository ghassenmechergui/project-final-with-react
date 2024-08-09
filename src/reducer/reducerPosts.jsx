export default function reducerPosts(currentPosts, action) {
  switch (action.type) {
    case "start":
      return action.payloed.posts;

    default:
      break;
  }
}
