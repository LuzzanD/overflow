import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimePassed(creationDate: string): string {
  // Convert the creation date string to a Date object
  const postDate = new Date(creationDate);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - postDate.getTime();

  // Calculate the elapsed time in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the result
  if (days === 1) {
    return `${days} day ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (hours === 1) {
    return `${hours} hour ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes === 1) {
    return `${minutes} minute ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

export function convertDateFormat(inputDate: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthAbbreviation = months[inputDate.getMonth()];

  // Ensure hours and minutes have two digits (pad with leading zeros if necessary)
  const paddedHours = String(inputDate.getHours()).padStart(2, "0");
  const paddedMinutes = String(inputDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${monthAbbreviation} ${inputDate.getDate()}, ${inputDate.getFullYear()} at ${paddedHours}:${paddedMinutes}`;

  return formattedDate;
}
