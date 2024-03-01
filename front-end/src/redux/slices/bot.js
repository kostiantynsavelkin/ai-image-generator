import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  generatedImages: [],
  selectedImage: null
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getGeneratedImagesSuccess(state, action) {
      state.isLoading = false;
      state.generatedImages = action.payload;
    },

    setSelectedImageSuccess(state, action) {
      state.isLoading = false;
      state.selectedImage = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getGeneratedImages(prompt) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/generate`,
        {
          keyword: prompt,
        }
      );

      dispatch(slice.actions.getGeneratedImagesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setSelectedImage(image) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/allow`,
        {
          id: image.id
        }
      );

      if(response.data === true) {
        dispatch(slice.actions.setSelectedImageSuccess(image));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setReset() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.getGeneratedImagesSuccess([]));
      dispatch(slice.actions.setSelectedImageSuccess(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
