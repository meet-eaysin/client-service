import { TApiResponse, TErrorApiResponse } from '@/types/api';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isErrorResponse = (
  response: TApiResponse,
): response is TErrorApiResponse => {
  return !response.success;
};
