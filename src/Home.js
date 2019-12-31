import React from "react";
import "./scss/style.scss";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h3 className="title">Home.js</h3>
      <li>
        <Link to="/signup">SignUp</Link>
      </li>
      <li>
        <Link to="/signin">SignIn</Link>
      </li>
    </div>
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
