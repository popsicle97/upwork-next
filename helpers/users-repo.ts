
export const userRepo = {
    getLocalUser: () => localStorage.getItem('user'),
    setLocalUser: (user: string) => localStorage.setItem('user', user)
}