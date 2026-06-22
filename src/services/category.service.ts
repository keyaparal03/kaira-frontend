import { apiClient }
from "../api/ApiClient";

class CategoryService {

  /*
  -------------------------------
  GET ALL CATEGORIES
  -------------------------------
  */

  getCategories() {

    return apiClient.get(
      "/categories",
      false
    );
  }

  /*
  -------------------------------
  GET CATEGORY BY ID
  -------------------------------
  */

  getCategoryById(
    id: string
  ) {

    return apiClient.get(
      `/categories/${id}`,
      false
    );
  }

  /*
  -------------------------------
  CREATE CATEGORY
  -------------------------------
  */

  createCategory(
    data: any
  ) {

    return apiClient.post(
      "/categories",
      data
    );
  }

  /*
  -------------------------------
  UPDATE CATEGORY
  (using POST because your project
  is avoiding PUT)
  -------------------------------
  */

  updateCategory(
    id: string,
    data: any
  ) {

    return apiClient.post(
      `/categories/update/${id}`,
      data
    );
  }

  /*
  -------------------------------
  DELETE CATEGORY
  (using POST because avoiding DELETE)
  -------------------------------
  */

  deleteCategory(
    id: string
  ) {

    return apiClient.post(
      `/categories/delete/${id}`,
      {}
    );
  }
}

export default
new CategoryService();