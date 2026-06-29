import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// Custom Minimalist Redux-Thunk Middleware
const thunk = (storeAPI) => (next) => (action) =>
  typeof action === "function"
    ? action(storeAPI.dispatch, storeAPI.getState)
    : next(action);

// Action Types
const INC = "INC";
const DEC = "DEC";
const RESET = "RESET";
const FETCH_USERS_START = "FETCH_USERS_START";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

// Synchronous Action Creators
const inc = () => ({ type: INC });
const dec = () => ({ type: DEC });
const reset = () => ({ type: RESET });

// Asynchronous Action Creator (Thunk)
const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_START });
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: err.message || "Something went wrong",
    });
  }
};

// Initial State Profile
const initialState = {
  count: 0,
  users: [],
  loading: false,
  error: "",
};

// Reducer Function
function reducer(state = initialState, action) {
  switch (action.type) {
    case INC:
      return { ...state, count: state.count + 1 };
    case DEC:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: 0 };

    case FETCH_USERS_START:
      return { ...state, loading: true, error: "" };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

// Global Store Creation
const store = createStore(reducer, applyMiddleware(thunk));

// UI Display Component
function UI() {
  const dispatch = useDispatch();
  const { count, users, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Classic Redux + API Fetch (Single File)</h2>

      <h3>Counter: {count}</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button onClick={() => dispatch(inc())}>+</button>
        <button onClick={() => dispatch(dec())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>

      <hr />

      <h3>Users</h3>
      <button onClick={() => dispatch(fetchUsers())} style={{ marginBottom: "12px" }}>
        Refetch Users
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main Application Context Provider Wrapper
export default function App() {
  return (
    <Provider store={store}>
      <UI />
    </Provider>
  );
}
