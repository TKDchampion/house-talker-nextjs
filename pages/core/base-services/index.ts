import getAxiosInstance from "./get-axios-instance";
import { ApiConfig } from "./model";

export default class BaseServices {
  get = async (apiconfig: ApiConfig) => {
    return await getCall(apiconfig)
  };

  post = async (apiconfig: ApiConfig) => {
    return await postCall(apiconfig)
  };

  patch = async (apiconfig: ApiConfig) => {
    return await patchCall(apiconfig)
  };

  delete = async (apiconfig: ApiConfig) => {
    return await deleteCall(apiconfig)
  };
}

const getCall = (apiconfig: ApiConfig) => {
  return new Promise((resolve, reject) => {
    getAxiosInstance(apiconfig)
      .get(apiconfig.url)
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

const postCall = (apiconfig: ApiConfig) => {
  return new Promise((resolve, reject) => {
    getAxiosInstance(apiconfig)
      .post(
        apiconfig.url,
        apiconfig.body
      )
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

const patchCall = (apiconfig: ApiConfig) => {
  return new Promise((resolve, reject) => {
    getAxiosInstance(apiconfig)
      .patch(
        apiconfig.url,
        apiconfig.body
      )
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteCall = (apiconfig: ApiConfig) => {
  return new Promise((resolve, reject) => {
    getAxiosInstance(apiconfig)
      .delete(apiconfig.url)
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}