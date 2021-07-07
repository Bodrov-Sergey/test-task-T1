import React, {useState} from "react";
import s from "./Pendulum.module.css"
import Loader from "../utilits/Loader/Loader";
import logo from "../assets/t1-logo.svg"
import {getHalfPeriodLowAlpha, getAlpha} from "../utilits/mathScripts/mathScripts";

const Pendulum = (props) => {
    const [ropeLength, setRopeLength] = useState(1);
    const [startHeight, setStartHeight] = useState(0.3);
    const [gravity, setGravity] = useState(9.8);
    const [alpha, setAlpha] = useState(getAlpha(ropeLength, startHeight));
    const [intervalId, setIntervalId] = useState(null);
    const [disabled, setDisabled] = useState(false);


    //
    //Pendulum control functions
    //
    const disableSetter = () => {
        setDisabled(true);
        setTimeout(() => {setDisabled(false)}, 300);
        alpha < 0 && setAlpha(prev => prev * -1);
    }
    const pendulumAction = () => {
        if (!intervalId) {
            setAlpha(prev => prev * -1);
            setIntervalId(setInterval(() => {
                setAlpha(prev => prev * -1);
            }, getHalfPeriodLowAlpha(ropeLength, gravity)));
        } else {
            setIntervalId(clearInterval(intervalId));
            disableSetter();
        }
    }

    //
    //Onchange range functions
    //
    const onRopeLengthChange = (e) => {
        intervalId ? pendulumAction() : disableSetter();
        if (+e.currentTarget.value < +startHeight) {
            setStartHeight(e.currentTarget.value);
            setRopeLength(e.currentTarget.value);
            setAlpha(getAlpha(e.currentTarget.value, e.currentTarget.value));

        } else {
            setRopeLength(e.currentTarget.value);
            setAlpha(getAlpha(e.currentTarget.value, startHeight));
        }
    }
    const onStartHeightChange = (e) => {
        intervalId ? pendulumAction() : disableSetter();
        setStartHeight(e.currentTarget.value);
        setAlpha(getAlpha(ropeLength, e.currentTarget.value));
    }
    const onGravityChange = (e) => {
        intervalId ? pendulumAction() : disableSetter();
        setGravity(e.currentTarget.value)
        setAlpha(getAlpha(ropeLength, startHeight));
    }

    return <div>
        <header className={s.header}>
            <img className={s.headerLogo} alt={"T1 Консалтинг логотип"} src={logo} />
            <h1 className={s.headerTitle}>Приложение "Маятник"</h1>
            <h2 className={s.headerName}>Бодров Сергей</h2>
        </header>
        <section className={s.settingsWrapper}>
            <div className={s.settingsBlock}>
                <div className={s.settingsItem}>
                    <div className={s.description}>Длина подвеса маятника</div>
                    <input className={s.rangeSlider} type={"range"} min={1} max={10} step={0.1}
                           onChange={onRopeLengthChange} onInput={onRopeLengthChange} value={ropeLength}/>
                    <span className={s.rangeValue}>{ropeLength} метра</span>

                </div>
                <div className={s.settingsItem}>
                    <div className={s.description}>Высота исходной позиции шара</div>
                    <input className={s.rangeSlider} type={"range"} min={0} max={ropeLength} step={0.1}
                           onInput={onStartHeightChange} onChange={onStartHeightChange}
                           value={startHeight}/>
                    <div className={s.rangeValue}><p className={s.rangeValueContent}>{startHeight} метра</p></div>
                </div>
                <div className={s.settingsItem}>
                    <div className={s.description}>Сила притяжения</div>
                    <input className={s.rangeSlider} type={"range"} min={0.2} max={15} step={0.2}
                           onChange={onGravityChange} onInput={onGravityChange} value={gravity}/>
                    <div className={s.rangeValue}><p
                        className={s.rangeValueContent}>{gravity} метра/секунду <sup>2</sup></p></div>
                </div>
            </div>
            {disabled ? <Loader height={"40px"}/> :
                <button className={s.actionButton} disabled={disabled}
                        onClick={pendulumAction}>{intervalId ? "Вернуть маятник в исходное положение" : "Запустить маятник"}</button>}
        </section>


        <section className={s.pendulumWrapper}>
            <div style={{
                transform: `rotate(${disabled ? alpha - 0.0000000001 : alpha}deg)`,
                transition: `${!intervalId? 300+"ms ease" :getHalfPeriodLowAlpha(ropeLength, gravity)+"ms ease-in-out"}`
            }} className={s.pendulum}>
                <div className={s.rope}>
                    <span>.</span>
                    <span className={s.ball}> </span>
                </div>
            </div>
        </section>
    </div>
}

export default Pendulum;