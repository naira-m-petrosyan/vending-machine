export default () => ({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
});