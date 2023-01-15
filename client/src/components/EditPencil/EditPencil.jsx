import React from 'react'

import { PencilFill } from "react-bootstrap-icons";
import { propTypes } from 'react-bootstrap/esm/Image';

import classes from "./EditPencil.module.css";

const EditPencil = (props) => {
  return (
    <span>
    <a href={props.href}>
      <span>
        <PencilFill className={classes.editbtn} />
      </span>
    </a>
  </span>
  )
}

export default EditPencil