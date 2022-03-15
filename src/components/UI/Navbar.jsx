
import React from "react";
import NavigationalItems from "./NavigationalItems";
import classes from './Navbar.module.css';

const Navbar = ()=> {
return (
    <div className={classes.navbar}>
        <h1>ReactTodo</h1>
        <h1>Todo App</h1>
        <NavigationalItems />

    </div>
)

}

export default Navbar;