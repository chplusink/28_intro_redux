import React from 'react'
import ReactDOM from 'react-dom'

import  { createStore }  from 'redux'
import countReducer from './countReducer'
import notesReducer from './notesReducer'

const store = createStore( countReducer )
const noteStore = createStore( notesReducer )

noteStore.dispatch({type: 'ADD_NOTE', note: 'Buy Milk'})

function App (props) {
  return (
    <div>
      <h1>My Cool App!</h1>
      < Counter store={props.store} />
      < Notes noteStore={props.noteStore} />
    </div>)
}

class Counter extends React.Component {

  componentDidMount(){
    console.log("Component Mounted!!!")
    this.props.store.subscribe( this.forceUpdate.bind(this) )
  }

  handleIncrement(){
    this.props.store.dispatch({type: 'INCREMENT_COUNT' })
    console.log(this.props.store.getState())
  }

  handleDecrement(){
    this.props.store.dispatch({type: 'DECREMENT_COUNT' })
  }

  handleReset(){
    this.props.store.dispatch({type: 'RESET_COUNT' })
  }

  render(){
    return (
      <div>
        <h1>{ this.props.store.getState() }</h1>
        <button onClick={this.handleIncrement.bind(this)}>Increment Count</button>
        <button onClick={this.handleDecrement.bind(this)}>Decrement Count</button>
        <button onClick={this.handleReset.bind(this)}>Reset Count</button>
      </div>
    )
  }
}

class Notes extends React.Component {

  componentDidMount(){
    this.props.noteStore.subscribe( this.forceUpdate.bind(this) )
  }

  handleNotes(){
    let notes = noteStore.getState()

    return notes.map(function (note,i) {
      return(
        <li key={i}>{note}</li>
      )
    })
  }

  handleFormSubmit(e){
    e.preventDefault()
    noteStore.dispatch({type:'ADD_NOTE', note: this.refs.noteInput.value})
    this.refs.noteInput.value = ""
  }

  render(){
    return (
      <div>
        <ul>{this.handleNotes.call(this)}</ul>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <input type="text" ref="noteInput" placeholder="New Note"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

ReactDOM.render(< App store={store} noteStore={noteStore}/>, document.getElementById('container'))
