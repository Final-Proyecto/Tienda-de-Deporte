const API_URL = "http://localhost:4000/api";

interface BuyProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface BuyProductResponse {
  message: string;
}

const getToken = (): string | null => {
  return localStorage.getItem("authToken");
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

    if (response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({
        error: `Error ${response.status}`,
      }))) as { error: string };
      throw new Error(errorData.error || response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    }
    throw error;
  }
}

export const buyProduct = async (
  userId: string,
  productData: BuyProductDto
): Promise<BuyProductResponse> => {
  return apiFetch<BuyProductResponse>(`shop/buy/${userId}`, {
    method: "POST",
    body: JSON.stringify(productData),
  });
};
