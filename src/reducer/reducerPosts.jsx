import axios from "axios";
export default function reducerPosts(currentPosts, action) {
  switch (action.type) {
    case "start":
      return action.payloed.posts;
    case "next":
      let n = currentPosts;
      let newpost = [];
      axios
        .get(
          `https://tarmeezacademy.com/api/v1/posts?page=${
            action.payloed.counter + 1
          }`
        )
        .then((response) => {
          action.payloed.setCounter({ ...action.payloed.counter, state: true });
          newpost = response.data.data;
          console.log(newpost);
          action.payloed.setCounter({
            ...action.payloed.counter,
            counter: action.payloed.counter.counter + 1,
          });
        })
        .catch((error) => {
          action.payloed.setCounter({ ...action.payloed.counter, state: true });
        });
      newpost.map((e) => {
        n.push(e);
      });

      return n;
    case "refresh":
      axios.get("https://tarmeezacademy.com/api/v1/posts").then((response) => {
        return response.data.data;
      });
    default:
      break;
  }
}
