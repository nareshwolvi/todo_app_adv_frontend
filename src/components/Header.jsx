import React from "react";
import TodoLogo from "../assets/naresh_tech_logo_white.svg"

export default function Header(){
    return(
        <div>
            <img src={TodoLogo} alt="Todo Logo" height={130} width={130} left={40}/>
            <h1 align={"center"}> TASK MANAGEMENT APPLICATION</h1>
        </div>
    );
}