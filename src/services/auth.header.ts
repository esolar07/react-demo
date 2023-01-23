import AuthService from "./auth.service";

export default function authHeader() {
    const userToken = AuthService.getCurrentUser();
    if (userToken) {
        return { Authorization: 'Bearer ' + userToken.userToken };
    }
    return { Authorization: '' };
}