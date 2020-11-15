import Axios from 'axios'

const qmkClient = Axios.create({ baseURL: process.env.REACT_APP_API_URL })

export default qmkClient
