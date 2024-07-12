import React, { useTransition } from "react";
import { useState } from "react";
import classes from "./Calculator.module.css";

export default function Calculator() {
  const [funcClicked, setFuncClicked] = useState(false);
  const [main, setMain] = useState(0);
  const [secondary, setSecondary] = useState("");
  const [funcChosen, setFuncChosen] = useState("");
  const [percentClicked, setPercentClicked] = useState(false);
  const [minusClicked, setMinusClicked] = useState(false);
  // const [percentValue, setPercentValue] = useState(""); ///

  function handleClick(event) {
    !funcClicked &&
      minusClicked &&
      setMain((prevState) =>
        prevState <= -1
          ? prevState + event.target.id
          : prevState + -event.target.id
      );
    !funcClicked &&
      !minusClicked &&
      setMain((prevState) =>
        prevState == 0 ? event.target.id : prevState + event.target.id
      );
    funcClicked &&
      minusClicked &&
      setSecondary((prevState) => -(prevState + event.target.id));
    funcClicked &&
      !minusClicked &&
      setSecondary((prevState) => prevState + event.target.id);
  }

  function handleFunc(event) {
    setMinusClicked(false);
    setFuncClicked(true);
    setFuncChosen(event.target.id);

    if (funcChosen == "+") {
      setMain((prevState) => Number(prevState) + Number(secondary));
      setSecondary("");
    } else if (funcChosen == "-") {
      setMain((prevState) => Number(prevState) - Number(secondary));
      setSecondary("");
    } else if (funcChosen == "*") {
      setMain((prevState) => Number(prevState) * Number(secondary));
      setSecondary("");
    } else if (funcChosen == "/") {
      setMain((prevState) => Number(prevState) / Number(secondary));
      setSecondary("");
    } else {
      return;
    } ///2222
  }

  function handleMinus() {
    setMinusClicked(true); // use prevState to avoid bug for minus double click that does not work after pressing some function. The latter on the other hand causes bug for secondary, namely, adds number to 0.
    // secondary
    //   ? setSecondary((prevState) => -prevState)
    //   : setMain((prevState) => -prevState);  //previous incorrect

    !secondary && !funcClicked && setMain((prevState) => -prevState);
    main !== 0 && funcClicked && setSecondary((prevState) => -prevState);
  }

  function handlePercent() {
    setPercentClicked(true);
    // if (funcChosen == "*") {
    //   setPercentValue(Number(secondary) / 100);
    // } //////
  }

  function handleSum() {
    if (funcChosen == "+") {
      setMain((prevState) => Number(prevState) + Number(secondary));
    } else if (funcChosen == "-") {
      setMain(Number(main) - Number(secondary));
    } else if (funcChosen == "*") {
      percentClicked
        ? setMain((prevState) => (Number(prevState) * Number(secondary)) / 100)
        : setMain(Number(main) * Number(secondary));
    } else if (funcChosen == "/") {
      setMain(Number(main) / Number(secondary));
    } else {
      return;
    }

    setSecondary("");
    setFuncChosen("");
    setFuncClicked(false);
    setMinusClicked(false);
    // setPercentValue(0); ////
  }

  function clearData() {
    setFuncClicked(false);
    setMinusClicked(false);
    setPercentClicked(false);
    setFuncChosen("");
    setMain(0);
    setSecondary("");
    // setPercentValue(0); ////
  }

  return (
    <>
      <div className={classes.calculator}>
        <div className={classes.circles}>
          <div className={classes.circle1}></div>
          <div className={classes.circle2}></div>
          <div className={classes.circle3}></div>
        </div>
        <div className={classes.output}>
          <div className={classes.sum}>
            {!secondary ? main : secondary}
            {/* {percentValue} */}
          </div>
        </div>
        <div className={classes.functions}>
          <div className={classes["functions-dark"]}>
            <div onClick={clearData}>C</div>
            <div onClick={handleMinus}>+/-</div>
            <div onClick={handlePercent}>%</div>
          </div>
          <div className={classes["functions-orange-container"]}>
            <div className={classes["functions-orange"]}>
              <div onClick={handleFunc} id="/">
                /
              </div>
              <div onClick={handleFunc} id="*">
                *
              </div>
              <div onClick={handleFunc} id="-">
                -
              </div>
              <div onClick={handleFunc} id="+">
                +
              </div>
              <div onClick={handleSum}>=</div>
            </div>
          </div>
        </div>
        <div className={classes.numbers}>
          <div className={classes.num7} onClick={handleClick} id={7}>
            7
          </div>
          <div className={classes.num8} onClick={handleClick} id={8}>
            8
          </div>
          <div className={classes.num9} onClick={handleClick} id={9}>
            9
          </div>
          <div className={classes.num4} onClick={handleClick} id={4}>
            4
          </div>
          <div className={classes.num5} onClick={handleClick} id={5}>
            5
          </div>
          <div className={classes.num6} onClick={handleClick} id={6}>
            6
          </div>
          <div className={classes.num1} onClick={handleClick} id={1}>
            1
          </div>
          <div className={classes.num2} onClick={handleClick} id={2}>
            2
          </div>
          <div className={classes.num3} onClick={handleClick} id={3}>
            3
          </div>
          <div onClick={handleClick} id={0} className={classes.zero}>
            0
          </div>
          <div className={classes.numdot} onClick={handleClick} id=".">
            .
          </div>
        </div>
      </div>
    </>
  );
}
