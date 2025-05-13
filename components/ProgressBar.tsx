"use client";

import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export default function ProgressBar() {
  return <CircularProgressbar value={20} text={`${20}%`} />;
}
