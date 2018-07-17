import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside Constructor');
    this.lastPersonRef = React.createRef(); // how a child component (Person.js) gets a reference by default
  }

  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount()');
    this.lastPersonRef.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  // the built-in PureComponent (imported with React above then extended as a class) will automatically check for prop and state changes
  // you should only use PureComponent if you know that updates might not be required, and also must be strategically placed within the app tree
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.click !== this.props.click;
  //   // return true; // returning true here causes the lifecycle to run even if there are no changes, costing performance
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }

  render () {
    console.log('[Persons.js] Inside render()');
    return this.props.persons.map((person, index) => {
      return <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        ref={this.lastPersonRef}
        position={index}
        key={person.id}
        changed={(event) => this.props.changed(event, person.id)} />
    });
  }
}

export default Persons;
