import classes from "./UserImage.module.css";

import profilepic from "../../assets/randompic.png";

const UserImage = (props) => {
  return (
    <img
      alt="user"
      src={profilepic}
      className={props.className}
    />
  );
};

export default UserImage;
