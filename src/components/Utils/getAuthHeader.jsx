function getAuthHeader() {
  let token = localStorage.getItem("token");
  return `Bearer ${token}`
}

export default getAuthHeader
