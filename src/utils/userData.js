export function UserData() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
        return JSON.parse(user);
    } else {
        return null;
    }
}
