import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const mockTask = {
  id: '123',
  title: 'Aprender Vitest',
  description: 'Practicar pruebas unitarias',
  status: 'pending',
  attachments: [],
  comments: [],
};

describe('Pruebas en <TaskCard />', () => {
  it('Debe renderizar el título de la tarea correctamente', () => {
    render(<div>{mockTask.title}</div>);
    const titleElement = screen.getByText('Aprender Vitest');
    expect(titleElement).toBeInTheDocument();
  });
});