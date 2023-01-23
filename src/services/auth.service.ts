import axios from "axios";

class AuthService {
    register(email: string, password: string) {
        return axios.post("/api/register", {
            email,
            password
        }).then(response => {
            if (response.data.userToken) {
                localStorage.setItem("userAuthToken", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    login(username: string, password: string) {
        return axios.post("/api/signin",{
                username,
                password
            }).then(response => {
                if (response.data.userToken) {
                    localStorage.setItem("userAuthToken", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("userAuthToken");
    }

    getCurrentUser() {
        const userAuthToken = localStorage.getItem("userAuthToken");
        if (userAuthToken) return JSON.parse(userAuthToken);
        return null;
    }
}

export default new AuthService();