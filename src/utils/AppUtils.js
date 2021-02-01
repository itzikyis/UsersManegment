import axios from 'axios'

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

const getAllUsersData = () => {
    return axios.get(usersUrl)
}

const getUserData = (id) => {
    return axios.get(usersUrl + id)
}

const updateUser = (id, obj) => {
    return axios.put(usersUrl + id, obj)
}

const addUser = (obj) => {
    return axios.post(usersUrl, obj)
}

const deleteUser = (id) => {
    return axios.delete(usersUrl + id)
}

const getAllUsersTodos = () => {
    return axios.get(todosUrl)
}

const getAllUsersPosts = () => {
    return axios.get(postsUrl)
}



export default { getAllUsersData, getUserData, updateUser, addUser, deleteUser, getAllUsersTodos, getAllUsersPosts }