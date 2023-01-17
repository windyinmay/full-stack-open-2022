import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return request.then(res => res.data)
}

const create = newObject => {
    const resquest = axios.post(baseUrl, newObject)
    return resquest.then(res => res.data)
}

const update = (id, newObject) => {
   const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson }
