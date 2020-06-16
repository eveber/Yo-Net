import React from "react";
import css from './Preloader.module.scss';
import preloader from "./preloader.svg";

const Preloader = React.memo((props) => {
    return (
        <div className={css.preloader}>
            <img src={preloader} alt="preloader"/>
        </div>
    )
});

export default Preloader;