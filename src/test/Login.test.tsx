import {  expect, test } from 'vitest'
import { render, screen } from "@testing-library/react";
import NotFoundPage from '../pages/notFound.tsx';

// describe('Renderizado de Page Not found', () => {

    test('renderiza el componente Notfound', () => {
        // expect((1 + 1)).toBe(2)
        render(<NotFoundPage /> )
        expect(screen.getByText("Ir al Inicio"));
    })
    
// })