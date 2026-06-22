import {
  apiClient
} from "../api/ApiClient";

class UserService {

  async getProfile() {

    return apiClient.get(
      "/users/profile"
    );
  }
}

export default
new UserService();