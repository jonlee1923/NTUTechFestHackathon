import classes from "./UserImage.module.css";


const UserImage = (props) => {
  return (
    <img
      alt="user"
      src={props.src}
      className={`${props.className} ${classes.profilepic}`}
    />
  );
};

export default UserImage;
