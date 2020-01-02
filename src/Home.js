import React, { useEffect } from "react";

import "./scss/style.scss";
import { Link } from "react-router-dom";
import { Container } from "./components/StyledComponents";

export const doCheckToken = () => true;

const Home = props => {
  useEffect(() => {
    let token = localStorage.getItem("token");
    doCheckToken();
    token ? props.history.push("/") : props.history.push("/signin");
  }, []);
  return (
    <Container>
      <Link to="/signin">SignIn</Link>
      <Link to="/signup">SignUp</Link>
    </Container>
  );
};

export default Home;

// import React, { useState } from "react";

// import Counter from "./components/Counter";
// import Container from './components/Container';
// export const doIncrement = prevState => ({
//   counter: prevState.counter + 1
// });

// export const doDecrement = prevState => ({
//   counter: prevState.counter - 1
// });

// const App = () => {
//   const [state, setState] = useState({ counter: 0 });

//   const onIncrement = () => {
//     setState(doIncrement);
//   };

//   const onDecrement = () => {
//     setState(doDecrement);
//   };

//   const { counter } = state;
//   return (
//     <div>
//       <h1>My Counter</h1>
//       <Counter counter={counter} />

//       <button type="button" onClick={onIncrement}>
//         Increment
//       </button>

//       <button type="button" onClick={onDecrement}>
//         Decrement
//       </button>
//     </div>
//   );
// };

// export default App;
