import jwtDecode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  error: {},
};

const slice = createSlice({
  name: "authJwt",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },

    // LOGIN FAILURE
    loginFailure(state, action) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      // You can add an error field to your state to store the error message
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/setup/signin/email`,
        {
          email,
          password,
        }
      );
      const { accessToken, user } = response.data;
      setSession(accessToken);
      dispatch(slice.actions.loginSuccess({ user }));
    } catch (error) {
      const errorData = {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status,
      };
      // Dispatch an error action with the serializable error data
      dispatch(slice.actions.loginFailure(errorData));
    }
  };
}

// ----------------------------------------------------------------------

export function register({ email, password, nickName }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/setup/signup/email`,
        {
          email,
          password,
          nickName,
        }
      );
      const { accessToken, user } = response.data;

      window.localStorage.setItem("accessToken", accessToken);
      dispatch(slice.actions.registerSuccess({ user }));
    } catch (error) {
      const errorData = {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status,
      };
      // Dispatch an error action with the serializable error data
      dispatch(slice.actions.loginFailure(errorData));
    }
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem("accessToken");

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("/api/account/my-account");
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user,
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  };
}
