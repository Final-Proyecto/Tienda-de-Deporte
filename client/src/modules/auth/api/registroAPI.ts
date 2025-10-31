// src/api/registroApi.ts

// Tipos para registro
export interface RegisterData {
  nombreCompleto: string;
  correoElectronico: string;
  contraseña: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    nombreCompleto: string;
    correoElectronico: string;
  };
}

const BASE_URL = 'url del backend de anto';

export const registerUser = async (registerData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear la cuenta');
    }

    // Guardar token en localStorage si existe
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error de conexión');
  }
};