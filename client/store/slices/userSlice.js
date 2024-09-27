import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allRequests: [],
    allUsers: [],
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAllRequests: (state, action) => {
      state.allRequests = action.payload;
    },
    updateAllRequests: (state, action) => {
      const { data, id } = action.payload;
      const updatedData = state?.allRequests?.map((request) => {
        if (request._id == id) {
          return {
            ...request,
            ...data,
          };
        } else {
          return request;
        }
      });

      state.allRequests = updatedData;
    },
    updateAllUsers: (state, action) => {
      const { data, userid } = action.payload;
      const updatedData = state?.allUsers?.map((user) => {
        if (user._id == userid) {
          return {
            ...user,
            ...data,
          };
        } else {
          return user;
        }
      });

      state.allUsers = updatedData;
    },

    removeSingleUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload
      );
    },
    removeSingleRequest: (state, action) => {
      state.allRequests = state.allRequests.filter(
        (user) => user._id !== action.payload
      );
    },
    addSingleRequest: (state, action) => {
      console.log(
        action.payload,
        "............................................................"
      );
      state.allRequests = [...state.allRequests, action.payload];
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  setIsAuthenticated,
  removeSingleRequest,
  setAllRequests,
  addSingleRequest,
  setAllUsers,
  updateAllRequests,
  updateAllUsers,
  removeSingleUser,
} = userSlice.actions;
