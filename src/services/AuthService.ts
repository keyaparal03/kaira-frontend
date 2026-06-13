import { apiClient } from "../api/ApiClient";

import {
  LoginPayload,
  RegisterPayload
} from "../types/auth.types";

class AuthService {
  login(
    payload: LoginPayload
  ) {
    return apiClient.post(
      "/api/auth/login",
      payload,
      false
    );
  }

  register(
    payload: RegisterPayload
  ) {
    return apiClient.post(
      "/api/auth/register",
      payload,
      false
    );
  }
}

export default new AuthService();