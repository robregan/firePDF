// store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import pdfReducer from '../features/pdfs/pdfSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    pdf: pdfReducer,
  },
})
