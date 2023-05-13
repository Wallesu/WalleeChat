import axios from 'axios'

let config = {
    baseURL: 'http://localhost:3000',
    timeout: 10000
}

const instance = axios.create(config)

instance.interceptors.request.use((config) => {
    if(localStorage.getItem('accessToken')){
        config.headers.authorization = 'Bearer ' + localStorage.getItem('accessToken')
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


instance.interceptors.response.use((response) => {
    return response;
  }, async function (error) {
    try {
         if(error.response?.data?.name === 'TokenExpiredError' && localStorage.getItem('refreshToken')){
            const accessToken = await instance.post('/tokens', {
                refreshToken: localStorage.getItem('refreshToken')
            }).then(res => res.data.accessToken)

            if(error.config.method === 'post'){
                return await axios[error.config.method](error.config.url, error.config.data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
                )
            }
            else {
                return await axios[error.config.method](error.config.url,
                {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
                )
            }
        }
    } catch (error) {
        console.error(error.message)
    }
    return Promise.reject(error);
  });


export default instance;