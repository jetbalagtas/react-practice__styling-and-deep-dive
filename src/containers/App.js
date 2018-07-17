import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor');
    this.state = {
      persons: [
         { id: 'asdf1', name: 'Jet', age: 28 },
         { id: 'lkjd2', name: 'Renee', age: 22 },
         { id: 'oiuo3', name: 'Elisha', age: 21 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // the built-in PureComponent (imported with React above then extended as a class) will automatically check for prop and state changes
  // you should only use PureComponent if you know that updates might not be required, and also must be strategically placed within the app tree
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  //   // return true; // returning true here causes the lifecycle to run even if there are no changes, costing performance
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [
  //      { id: 'asdf1', name: 'Jet', age: 28 },
  //      { id: 'lkjd2', name: 'Renee', age: 22 },
  //      { id: 'oiuo3', name: 'Elisha', age: 21 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }; // more modern approach than the Object.assign below

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; // ES6 approach instead of slice() above
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
    // TAKEAWAY:
    // this below is the incorrect way bec setState is a method executed asynchronously by React
    // which means you cannot rely on this.state inside setState to really reflect the latest version of the state
    // if you call setState in another part of the app around the same time, it might finish before this one
    // so this.state in below might not be correct
    // the better syntax to call setState, if you plan on using this.state, is with a function syntax above wherein:
    // prevState can't be mutated from anywhere else in the app, and is the best practice of mutating state if you rely on a previous state
    // this.setState({
    //   showPersons: !doesShow,
    //   toggleClicked: this.state.toggleClicked + 1
    // });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    return (
      <Aux>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
        {/* provide this context to all child components no matter what level they are */}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
