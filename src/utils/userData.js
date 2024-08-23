export function UserData() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(user)
    if (user && token) {
        return JSON.parse(user);
    } else {
        return null;
    }
}
