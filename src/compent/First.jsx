import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function First() {
  const user = JSON.stringify(localStorage.getItem("user"));
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user != "null") {
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } else {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  });
  return (
    <div className="apploder">
      <h1>
        <span>
          <div className="letter">A</div>
        </span>
      </h1>
      <h2>Astro</h2>
    </div>
  );
}
