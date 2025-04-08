'use client';

import React from 'react';

export default function CustomGame () {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[91vh] bg-radial from-red-800 via-transparent to-transparent">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">¡Próximamente!</h1>
        <p className="text-lg text-center max-w-md">
          Estamos trabajando en algo increíble. Mantente atento para más actualizaciones.
        </p>
        <div className="mt-8">
          <svg
        className="w-16 h-16 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
          >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};