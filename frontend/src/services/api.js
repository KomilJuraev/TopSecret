let BASE_URL = "";


if (process.env.NODE_ENV === "development") {
    console.log(process.env);
    BASE_URL = "http://localhost:5000/api";
  } else if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://topsecret-l2s9.onrender.com/api";
  }

export async function registerUser(email, password) {
    const requestBody = {
        email: email, 
        password: password
    }
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data;    
    } catch(error) {
        return error;
    }
}

export async function loginUser(email, password) {
    const requestBody = {
        email: email, 
        password: password
    }
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return data; 
    } catch(error) {
        return error;
    }
}

export async function getSecretsForUser(userId) {
    try {
        const response =  await fetch(`${BASE_URL}/secrets/${userId}`);
        const data = await response.json();
        return data;
    } catch(error) {
        return error;
    }
}

export async function addSecretForUser(userId, secret) {
    const requestBody = {
        userId: userId, 
        secretInfo: secret 
    }
    try {
        const response = await fetch(`${BASE_URL}/secrets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }); 
        const data = await response.json();
        return data;
    } catch(error) {
        return error;
    }
}