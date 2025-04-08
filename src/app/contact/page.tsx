import React from 'react';

export default function ContactPage () {
  return (
    <div className="h-[91vh] flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-md shadow-2xl/55 dark:shadow-white bg-white dark:bg-neutral-800">
        <h1 className="text-2xl font-bold mb-6">Contáctanos</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu correo electrónico"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu mensaje"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};