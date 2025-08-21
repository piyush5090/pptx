import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  presentationData: [],
  currentSlideIndex: 0,
  isLoading: false,
  error: null,
  exportStatus: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  validationErrors: [],
  presentationTitle: 'Untitled Presentation',
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setPresentationData: (state, action) => {
      state.presentationData = action.payload;
      state.currentSlideIndex = 0; // Reset to first slide
      state.error = null;
      state.validationErrors = [];
    },
    setCurrentSlide: (state, action) => {
      const newIndex = action.payload;
      if (newIndex >= 0 && newIndex < state.presentationData.length) {
        state.currentSlideIndex = newIndex;
      }
    },
    nextSlide: (state) => {
      if (state.currentSlideIndex < state.presentationData.length - 1) {
        state.currentSlideIndex += 1;
      }
    },
    previousSlide: (state) => {
      if (state.currentSlideIndex > 0) {
        state.currentSlideIndex -= 1;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setExportStatus: (state, action) => {
      state.exportStatus = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    setPresentationTitle: (state, action) => {
      state.presentationTitle = action.payload;
    },
    resetPresentation: (state) => {
      return initialState;
    },
  },
});

export const {
  setPresentationData,
  setCurrentSlide,
  nextSlide,
  previousSlide,
  setLoading,
  setError,
  clearError,
  setExportStatus,
  setValidationErrors,
  setPresentationTitle,
  resetPresentation,
} = presentationSlice.actions;

// Selectors
export const selectPresentationData = (state) => state.presentation.presentationData;
export const selectCurrentSlide = (state) => {
  const { presentationData, currentSlideIndex } = state.presentation;
  return presentationData[currentSlideIndex] || null;
};
export const selectCurrentSlideIndex = (state) => state.presentation.currentSlideIndex;
export const selectTotalSlides = (state) => state.presentation.presentationData.length;
export const selectIsLoading = (state) => state.presentation.isLoading;
export const selectError = (state) => state.presentation.error;
export const selectExportStatus = (state) => state.presentation.exportStatus;
export const selectValidationErrors = (state) => state.presentation.validationErrors;
export const selectPresentationTitle = (state) => state.presentation.presentationTitle;

export default presentationSlice.reducer;