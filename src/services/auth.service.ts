import { apiClient } from "../api/apiClient";

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
}

export default new AuthService();