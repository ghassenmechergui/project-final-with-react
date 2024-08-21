import React from "react";

export default function Pagenetion() {
  return (
    <div
      className="apploder"
      style={{ margin: "0 0 40px", width: "100%", height: "80px" }}
    >
      <h1
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          borderWidth: "4px",
        }}
      >
        <span
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "10px",
            borderWidth: "4px",
          }}
        >
          <div className="letter"></div>
        </span>
      </h1>
    </div>
  );
}
