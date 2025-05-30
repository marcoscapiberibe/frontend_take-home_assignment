export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}