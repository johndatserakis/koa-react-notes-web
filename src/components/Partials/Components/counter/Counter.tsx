import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "@/store/counterSlice";
import styles from "./Counter.module.css";

export const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment(undefined))}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          type="button"
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement(undefined))}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => dispatch(setIncrementAmount(e.target.value))}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          type="button"
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
};
