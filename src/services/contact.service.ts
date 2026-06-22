import {
  apiClient
} from "../api/ApiClient";

class ContactService {

  async sendMessage(
    data: any
  ) {

    return apiClient.post(
      "/contact",
      data
    );
  }
}

export default
new ContactService();