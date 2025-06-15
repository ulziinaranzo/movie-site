"use client";

export const formatRunTime = (runtime: string): string => {
  const runtimeNumber = parseInt(runtime, 10);
  if (!runtimeNumber) return "N/A";
  const hours = Math.floor(runtimeNumber / 60);
  const minutes = runtimeNumber % 60;
  return `${hours}h ${minutes}m`;
};

export const formatTrailerDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
