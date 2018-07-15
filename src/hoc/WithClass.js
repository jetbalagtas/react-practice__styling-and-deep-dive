import React, {Component} from 'react';

// you can use a regular function that returns a reusable stateless component, passing in unknown props
// const withClass = (WrappedComponent, className) => {
//   return (props) => (
//     <div className={className}>
//       <WrappedComponent {...props} />
//     </div>
//   )
// }

// or you can use a regular function that returns a reusable stateful component with an anonymous class, passing in unknown props
const withClass = (WrappedComponent, className) => {
  return class extends Component {
    render () {
      return (
        <div className={className}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}

export default withClass;
