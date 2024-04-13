"use client";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppState, AppDispatch } from "@/app/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
