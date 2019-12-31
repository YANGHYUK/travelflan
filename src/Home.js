import React, { useEffect } from "react";
import styled from "styled-components";
import "./scss/style.scss";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  margin: 0;
  padding: 0;
`;

const Home = props => {
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   token ? props.history.push("/") : props.history.push("/signin");
  // });
  return (
    <Container>
      {/* <h3 className="title">Home.js</h3> */}
      <Link to="/signin">SignIn</Link>
      <Link to="/signup">SignUp</Link>
    </Container>
  );
};

export default Home;

// import React, { useState } from "react";

// import Counter from "./components/Counter";
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
