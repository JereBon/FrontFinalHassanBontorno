export interface Client {
  id_key: number;
  name: string;
  lastname: string;
  email: string;
  telephone: string;
  // La contraseña no se devuelve por seguridad
}