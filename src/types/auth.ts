export interface User {
  email: string;
  // Puedes agregar más campos aquí según lo que devuelva tu backend (id, nombre, rol, etc.)
}

export interface AuthResponse {
  token: string;
  user?: User; // Hacemos user opcional por si el backend solo devuelve el token
}