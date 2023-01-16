import classes from "./UserImage.module.css";

const UserImage = (props) => {
  return (
    <div>
      {props.user && (
        <img
          alt="user"
          src={`http://localhost:5000/${props.user.dp}`}
          className={`${props.className} ${classes.profilepic}`}
        />
      )}
    </div>
  );
};

export default UserImage;
