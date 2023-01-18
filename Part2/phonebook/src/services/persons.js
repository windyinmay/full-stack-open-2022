import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        name: 'this person is not saved to the server',
        number: '00000'
        }  
    return request.then(res => res.data.concat(nonExisting))
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
