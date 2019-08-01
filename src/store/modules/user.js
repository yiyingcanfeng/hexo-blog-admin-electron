import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUsername } from '@/utils/auth'
import { resetRouter } from '@/router'
const user = {
  state: {
    token: '',
    username: '',
    nickname: '',
    avatar: '',
    roles: [],
    jsessionid: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_JSESSIONID: (state, jsessionid) => {
      state.jsessionid = jsessionid
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        let axiosInstance = login({ username: username.trim(), password: password })
        axiosInstance.then((response) => {
          let jsessionid = response.headers['jsessionid']
          const { data } = response.data
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', data.username)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_JSESSIONID', jsessionid)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取token
    getToken({ commit }) {
      getToken().then(cookie => {
        if (cookie.length > 0) {
          const val = cookie[0].value
          if ((typeof val) === 'object') {
            commit('SET_TOKEN', JSON.parse(val))
          }
        }
      })
    },

    // 获取用户信息
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.username).then(response => {
          const { data } = response.data
          if (!data) {
            reject('验证失败，请重新登录')
          }

          const { nickname, avatar } = data

          commit('SET_NICKNAME', nickname)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
