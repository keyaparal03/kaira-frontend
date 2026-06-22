import { apiClient } from "../api/ApiClient";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  login(data: LoginData) {
    return apiClient.post(
      "/auth/login",
      data,
      false
    );
  }

  register(
    data: RegisterData
  ) {
    return apiClient.post(
      "/auth/register",
      data,
      false
    );
  }
  /* GET LOGGED USER */

  getCurrentUser() {
    return apiClient.get(
      "/auth/me"
    );
  }
}

export default new AuthService();