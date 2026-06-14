import ApiError from "./apiError";

import {
  getAccessToken
} from "../utils/localStorage";

/*
|--------------------------------------------------------------------------
| Base URL
|--------------------------------------------------------------------------
*/

const BASE_URL =
  "http://localhost:3500/api";

/*
|--------------------------------------------------------------------------
| Api Client
|--------------------------------------------------------------------------
*/

class ApiClient {
  private baseUrl: string;

  constructor(
    baseUrl: string
  ) {
    this.baseUrl =
      baseUrl;
  }

  /*
  |--------------------------------------------------------------------------
  | Main Request Method
  |--------------------------------------------------------------------------
  */

  private async request<T>(
    endpoint: string,

    auth: boolean = true,

    options: RequestInit = {}
  ): Promise<T> {
    const token =
      getAccessToken();

    const response =
      await fetch(
        `${this.baseUrl}${endpoint}`,
        {
          ...options,

          headers: {
            "Content-Type":
              "application/json",

            ...(token &&
            auth
              ? {
                  Authorization:
                    `Bearer ${token}`
                }
              : {}),

            ...options.headers
          }
        }
      );

    /*
    |--------------------------------------------------------------------------
    | Parse Response
    |--------------------------------------------------------------------------
    */

    const data =
      await response.json();

    /*
    |--------------------------------------------------------------------------
    | Error Handling
    |--------------------------------------------------------------------------
    */

    if (!response.ok) {
      throw new ApiError(
        data.message ||
          "API Error",

        response.status,

        data
      );
    }

    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */

  get<T>(
    endpoint: string,

    auth: boolean = true
  ) {
    return this.request<T>(
      endpoint,

      auth,

      {
        method: "GET"
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | POST
  |--------------------------------------------------------------------------
  */

  post<T, B>(
    endpoint: string,

    body: B,

    auth: boolean = true
  ) {
    return this.request<T>(
      endpoint,

      auth,

      {
        method: "POST",

        body: JSON.stringify(
          body
        )
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PUT
  |--------------------------------------------------------------------------
  */

  put<T, B>(
    endpoint: string,

    body: B,

    auth: boolean = true
  ) {
    return this.request<T>(
      endpoint,

      auth,

      {
        method: "PUT",

        body: JSON.stringify(
          body
        )
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  delete<T>(
    endpoint: string,

    auth: boolean = true
  ) {
    return this.request<T>(
      endpoint,

      auth,

      {
        method:
          "DELETE"
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export const apiClient =
  new ApiClient(
    BASE_URL
  );