import { Fragment } from "react";
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
import Classes from './Header.module.css';
const header = props => {
    return <Fragment>
        <header className={Classes.header}>
            <h1>React meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={Classes['main-image']}>
            <img src={mealsImg} alt="A Table full of food!" />
        </div>
    </Fragment>
};

export default header;