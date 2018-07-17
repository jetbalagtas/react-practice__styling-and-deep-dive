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
  // to still be able to use the ref in the WrappedComponent's parent component and forward it, we instead store the class and return it within React.forwardedRef()
  const WithClass = class extends Component {
    render () {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />  {/* because ref is a special React property, it is not forwarded. so we have to set it here (WrappedComponent = Person) */}
        </div>
      )
    }
  }
  
  return React.forwardRef((props, ref) => {
    return <WithClass {...props} forwardedRef={ref} />
  });
}

export default withClass;
