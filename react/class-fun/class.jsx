import React, { Component, createRef } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

class ClassPractice extends Component {
  inputRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      text: "",
      users: ["Kalidas", "React", "Class"],
      show: true,
      timer: 0,
    };

    // Manual binding for standard methods
    this.increment = this.increment.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.interval = setInterval(() => {
      this.setState((prev) => ({ timer: prev.timer + 1 }));
    }, 1000);

    this.inputRef.current?.focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true; 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count updated:", this.state.count);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("componentWillUnmount cleanup");
  }

  increment() {
    this.setState(
      (prevState) => ({ count: prevState.count + 1 }),
      () => console.log("Updated Count:", this.state.count)
    );
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  toggleShow = () => {
    this.setState((prev) => ({ show: !prev.show }));
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  addUser = () => {
    this.setState((prev) => ({
      users: [...prev.users, prev.text],
      text: "",
    }));
  };

  render() {
    const { title = "Class Component Practice" } = this.props;
    const { count, text, users, show, timer } = this.state;

    if (count === 5) {
      throw new Error("Test error boundary");
    }

    return (
      <div style={{ padding: 20 }}>
        <h1>{title}</h1>

        <h3>Counter: {count}</h3>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
        </div>

        {show && <p>This is conditionally rendered</p>}
        <button onClick={this.toggleShow} style={{ marginBottom: "16px" }}>Toggle Text</button>

        <hr />

        <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
          <input
            ref={this.inputRef}
            value={text}
            onChange={this.handleChange}
            placeholder="Enter name"
          />
          <button onClick={this.addUser}>Add</button>
        </div>

        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>

        <hr />
        <p>Timer: {timer}s</p>
      </div>
    );
  }
}

export default function ClassApp() {
  return (
    <ErrorBoundary>
      <ClassPractice title="React Class All Concepts" />
    </ErrorBoundary>
  );
}
