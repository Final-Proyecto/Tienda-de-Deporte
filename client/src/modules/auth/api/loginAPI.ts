// Tipos para login
export interface LoginData {
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

export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
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

/**
 * Función para cerrar sesión
 */
export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }

    // Limpiar localStorage
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Limpiar localStorage incluso si hay error
    localStorage.removeItem('authToken');
  }
};