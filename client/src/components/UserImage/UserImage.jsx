import classes from "./UserImage.module.css";


const UserImage = (props) => {
  console.log(props.src)
  return (
    <img
      alt="user"
      src={`http://localhost:5000/${props.src}`}
      className={`${props.className} ${classes.profilepic}`}
    />
  );
};

export default UserImage;
