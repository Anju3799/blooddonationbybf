const API_URL = "http://localhost:5000/api/donor";

export const registerDonor = async (donorData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donorData),
  });
  return await response.json();
};

export const loginDonor = async (loginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  return await response.json();
};
