export const saveUserDataInLocalStorage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let token,
    email,
    user_id,
    jwt_token = "";
  if (urlParams.has("access_token")) {
    token = urlParams.get("access_token");
  }
  if (urlParams.has("email")) {
    email = urlParams.get("email");
  }
  if (urlParams.has("user_id")) {
    user_id = urlParams.get("user_id");
  }
  if (urlParams.has("jwt_token")) {
    jwt_token = urlParams.get("jwt_token");
  }
  if (token && email && user_id && jwt_token) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("jwt_token", jwt_token);
    return { user_id, token, email, jwt_token };
  } else {
    return null;
  }
};

export const getOnlyUserId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("user_id")) {
    return urlParams.get("user_id");
  }
  return null;
};
