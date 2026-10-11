import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

/** Inicia cada prueba con una ruta y un almacenamiento local limpios. */
beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, '', '/');
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
  window.scrollTo = jest.fn();
});

/** Comprueba que la tienda React muestre el catálogo de instrumentos. */
test('muestra la tienda Sonido Vivo', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /los mejores instrumentos al mejor precio/i })).toBeInTheDocument();
  expect(screen.getByText('Guitarra Acústica Folk Yamaha F310')).toBeInTheDocument();
});

/** Comprueba que el administrador pueda crear una cuenta desde su pestaña. */
test('permite al administrador crear un usuario', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@sonidovivo.cl' } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

  fireEvent.click(screen.getByRole('tab', { name: /administración de usuarios/i }));
  fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }));
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Persona de prueba' } });
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'persona@ejemplo.cl' } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'prueba123' } });
  fireEvent.click(screen.getAllByRole('button', { name: 'Crear usuario' })[1]);

  expect(screen.getByText('persona@ejemplo.cl')).toBeInTheDocument();
});
