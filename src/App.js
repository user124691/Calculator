import React, {useReducer} from "react"
import "./styles.css"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"

export const ACTIONS = {
  DELETE_ALL: 'delete_all',
  DELETE_ONE: 'delete_one',
  ADD_NUMBER: 'add_number',
  ADD_SYMBOL: 'add_symbol',
  EVALUATE: 'evaluate'
}

function evaluate(currentOperand, previousOperand, operation){
  let a = Number(currentOperand)
  let b = Number(previousOperand)
  let operand = operation
  switch(operand){
    case "+":
      return String(b + a)
    case "-":
      return String(b - a)
    case "*":
      return String(b * a)
    case "/":
      return String(b / a)
  }
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.DELETE_ALL:
      return {
        state
      }
      case ACTIONS.DELETE_ONE: 
      if(state.currentOperand === ''){
        return {
          ...state,
          operation: '',
          previousOperand: ''
        }
      }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
    case ACTIONS.ADD_NUMBER:
      if(!state.currentOperand && payload.digit === '.'){
        return {...state}
      }
      if(state.currentOperand && state.currentOperand.includes(".") && payload.digit === "."){
        return {...state}
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.ADD_SYMBOL:
      if(state.currentOperand && state.previousOperand && state.operation !== payload.operation){
        return {
          operation: payload.operation,
          previousOperand: evaluate(state.currentOperand, state.previousOperand, payload.operation),
          currentOperand: ""
        }
      }
      if(state.operation){
        return {
          ...state,
          operation: `${payload.operation}`
        }
      }
      return {
        ...state,
        operation: `${payload.operation}`,
        previousOperand: `${state.currentOperand}`,
        currentOperand: ""
      }
      case ACTIONS.EVALUATE: 
        return{
          ...state,
          previousOperand: evaluate(state.currentOperand, state.previousOperand, state.operation),
          currentOperand: '',
          operation: ''
        }
  }
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="App">
      <div className="calc_display">
        <div className="display_previous">{previousOperand} {operation}</div>
        <div className="display_current">{currentOperand}</div>
      </div>
      <button onClick = {() => dispatch({type: ACTIONS.DELETE_ALL})} className="span-two">AC</button>
      <button onClick = {() => dispatch({type: ACTIONS.DELETE_ONE})}>DEL</button>
      <OperationButton dispatch={dispatch} operation="+"/>
      <DigitButton dispatch={dispatch} digit="1"/>
      <DigitButton dispatch={dispatch} digit="2"/>
      <DigitButton dispatch={dispatch} digit="3"/>
      <OperationButton dispatch={dispatch} operation="-"/>
      <DigitButton dispatch={dispatch} digit="4"/>
      <DigitButton dispatch={dispatch} digit="5"/>
      <DigitButton dispatch={dispatch} digit="6"/>
      <OperationButton dispatch={dispatch} operation="*"/>
      <DigitButton dispatch={dispatch} digit="7"/>
      <DigitButton dispatch={dispatch} digit="8"/>
      <DigitButton dispatch={dispatch} digit="9"/>
      <OperationButton dispatch={dispatch} operation="/"/>
      <button onClick = {() => dispatch({type: ACTIONS.ADD_NUMBER, payload: {digit: "."}})}>.</button>
      <DigitButton dispatch={dispatch} digit="0"/>
      <button onClick={() => dispatch({type: ACTIONS.EVALUATE})} className="span-two">=</button>
    </div>
  );
}

export default App;
