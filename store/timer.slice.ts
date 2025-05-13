import { createSlice } from "@reduxjs/toolkit";

type stat = "playing" | "paused" | "stopped";

type initialStateType = {
  previousTime: number;
  timer: number;
  id: string | null;
  name: string | null;
  isRecorded: boolean | null;
  showTimer: boolean;
  stat: stat | null;
  isMinimized: boolean;
  startTime: number | null;
  dateTimePassed: number;
  dayTracked: number | null;
};

const initialState: initialStateType = {
  previousTime: 0,
  timer: 0,
  dateTimePassed: 0,
  id: null,
  name: null,
  isRecorded: null,
  showTimer: false,
  isMinimized: false,
  stat: null,
  startTime: null,
  dayTracked: null,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setPreviousTime: (state, action: { type: string; payload: number }) => {
      state.previousTime = action.payload;
    },
    setTimer: (state, action: { type: string; payload: number }) => {
      state.timer = action.payload;
    },
    increaseTimer: (state, action: { type: string; payload: number }) => {
      state.timer += action.payload;
    },
    setId: (state, action: { type: string; payload: string }) => {
      state.id = action.payload;
    },
    setIsRecorded: (state, action: { type: string; payload: boolean }) => {
      state.isRecorded = action.payload;
    },
    setStartTimer(
      state,
      action: {
        type: string;
        payload: {
          id: string;
          name: string;
          startTime: number;
          stat: stat;
          isRecorded: boolean;
          showTimer: boolean;
          dayTracked: number;
          previousTime: number;
        };
      }
    ) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.startTime = action.payload.startTime;
      state.stat = action.payload.stat;
      state.isRecorded = action.payload.isRecorded;
      state.showTimer = action.payload.showTimer;
      state.dayTracked = action.payload.dayTracked;
      state.previousTime = action.payload.previousTime;
    },
    setResetTimer: (state) => {
      state.timer = initialState.timer;
      state.name = initialState.name;
      state.id = initialState.id;
      state.isRecorded = initialState.isRecorded;
      state.showTimer = initialState.showTimer;
      state.stat = initialState.stat;
      state.isMinimized = initialState.isMinimized;
      state.startTime = initialState.startTime;
      state.dateTimePassed = initialState.dateTimePassed;
      state.dayTracked = initialState.dayTracked;
      state.previousTime = initialState.previousTime;
    },
    setPauseTimer: (
      state,
      action: {
        type: string;
        payload: {
          startTime: number | null;
          stat: stat;
          timer: number;
          previousTime: number;
        };
      }
    ) => {
      state.stat = action.payload.stat;
      state.timer = action.payload.timer;
      state.previousTime = action.payload.previousTime;
      state.startTime = action.payload.startTime;
    },
    setShowTimer: (state, action: { type: string; payload: boolean }) => {
      state.showTimer = action.payload;
    },
    setStat: (state, action: { type: string; payload: stat }) => {
      state.stat = action.payload;
    },
    setIsMinimized: (state, action: { type: string; payload: boolean }) => {
      state.isMinimized = action.payload;
    },
    toggleShowTimer: (state) => {
      state.showTimer = !state.showTimer;
    },
    setDateTimePassed: (state, action: { type: string; payload: number }) => {
      state.dateTimePassed = action.payload;
    },
    setStartTime: (state, action: { type: string; payload: number | null }) => {
      state.startTime = action.payload;
    },
  },
});

export const {
  setTimer,
  setId,
  setIsRecorded,
  setIsMinimized,
  setShowTimer,
  toggleShowTimer,
  setStat,
  increaseTimer,
  setDateTimePassed,
  setPreviousTime,
  setStartTime,
  setPauseTimer,
  setResetTimer,
  setStartTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
