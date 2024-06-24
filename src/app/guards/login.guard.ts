export const loginGuard = () => {
    if(window.localStorage.getItem('role') === 'ADMIN') {
        return 'ADMIN';
    }
    if(window.localStorage.getItem('role') === 'CLIENT') {
        return 'CLIENT';
    }
    return 'DEFAULT';
};