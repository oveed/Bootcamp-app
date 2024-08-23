// Example slice
import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../utils/userData';
const userStore = createSlice({
  name: 'user',
  initialState: {
    isDoctor: false,
    doctorId: null,
  },
  reducers: {
    setDoctorId: (state, action) => {
        state.doctorId = action.payload;
        console.log(state.doctorId)
      },
    setIsDoctor: (state, action) => {
        const user = UserData()
        state.isDoctor = user.role === 'doctor';
      },
    }
  },
);

export const { setDoctorId, setIsDoctor } = userStore.actions;
export default userStore.reducer;
