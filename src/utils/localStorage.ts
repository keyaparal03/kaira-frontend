export const setAccessToken = (
  token: string
) => {

  localStorage.setItem(
    "accessToken",
    token
  );
};

export const getAccessToken =
  () => {

    return localStorage.getItem(
      "accessToken"
    );
};

/*
REMOVE ACCESS TOKEN
*/

export const removeAccessToken =
  () => {

    localStorage.removeItem(
      "accessToken"
    );
};

export const setRefreshToken =
  (token: string) => {

    localStorage.setItem(
      "refreshToken",
      token
    );
};

export const getRefreshToken =
  () => {

    return localStorage.getItem(
      "refreshToken"
    );
};

/*
REMOVE REFRESH TOKEN
*/

export const removeRefreshToken =
  () => {

    localStorage.removeItem(
      "refreshToken"
    );
};

/*
CLEAR BOTH
*/

export const clearTokens =
  () => {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );
};