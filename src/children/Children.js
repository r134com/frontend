import React from "react";

const Children = (props) => {
　// ここを追加
　console.log(props);
  return (
    <div>
      {/* ここを追加 */}
      {props.children}
      <p>{props.text}</p>
    </div>
  );
};

export default Children;