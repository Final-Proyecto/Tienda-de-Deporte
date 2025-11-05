const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface LoginResponse {
  token: string;
  message: string;
}

interface RegisterResponse {
  message: string;
}

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

interface UserProduct {
  productId: ProductData;
  _id: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  products: UserProduct[];
  createdAt: string;
}

interface ApiError {
  error: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt?: string;
}

export const saveToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const removeToken = (): void => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);

    // Si el token expiró o es inválido
    if (response.status === 401) {
      removeToken();
      window.location.href = "/login";
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    // Si hay un error del servidor
    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({
        error: `Error ${response.status}`,
      }))) as ApiError;
      throw new Error(errorData.error || response.statusText);
    }

    // Si la respuesta es exitosa
    return await response.json();
  } catch (error) {
    // Si es un error de red
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    }
    // Re-lanzar el error
    throw error;
  }
}

export const RegistroAuth = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  return apiFetch<RegisterResponse>("users/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const LoginAuth = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const data = await apiFetch<LoginResponse>("users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    saveToken(data.token);
  }

  return data;
};

export const logout = (): void => {
  removeToken();
  window.location.href = "/login";
};

export const getProfile = (): Promise<User> => {
  return apiFetch<User>("users/profile", {
    method: "GET",
  });
};

export const getMyProducts = (): Promise<Product[]> => {
  return apiFetch<Product[]>("users/my-products", {
    method: "GET",
  });
};
