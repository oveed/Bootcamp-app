// Example slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../utils/userData';
import { db } from '../utils/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export const fetchDoctorName = createAsyncThunk(
  'user/fetchDoctorName',
  async (doctorId) => {
    try {
      const docRef = doc(db, "users", doctorId); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());  
        return docSnap.data().fullName; 
      } else {
        throw new Error('Doctor not found');
      }
    } catch (error) {
      console.error('Error fetching doctor name:', error);
      throw error;
    }
  }
);

const userStore = createSlice({
  name: 'user',
  initialState: {
    isDoctor: false,
    doctorId: null,
    name: '', 
    status: 'idle', 
    error: null,
  },
  reducers: {
    setDoctorId: (state, action) => {
        state.doctorId = action.payload;
        console.log("DOC ID FROM STORE ",state.doctorId)
      },
      setIsDoctor: (state, action) => {
        const user = UserData()
        state.isDoctor = user.role === 'doctor';
        console.log("setIsdocTor", user.role === 'doctor')
      },
    },
    extraReducers: (builder) => {
      builder

        .addCase(fetchDoctorName.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchDoctorName.fulfilled, (state, action) => {
          console.log('Action payload:', action.payload);           state.status = 'succeeded';
          state.name = action.payload || '';
        })
        .addCase(fetchDoctorName.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  },
  
);

export const { setDoctorId, setIsDoctor } = userStore.actions;
export default userStore.reducer;
