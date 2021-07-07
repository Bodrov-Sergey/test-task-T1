import React from "react";
import loader from '../../assets/load-anim.svg'

const Loader = (props) => {
    return (
            <img src={loader} alt={"loader"} style={{height: props.height, margin: "0 auto", display: "block" } }/>
    )
}
export default Loader;