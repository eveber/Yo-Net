import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '93c267b5-5b93-4225-bc41-d44947558d7f'
    }
});

export const authAPI = {
    authMe() {
        return instance.get('auth/me')
            .then(response => response.data)
    },

    login(email, password, rememberMe, captcha) {
        return instance.post('auth/login', {email: email, password: password, rememberMe: rememberMe, captcha: captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete('auth/login')
            .then(response => response.data)
    },

    getCaptcha() {
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get('profile/status/' + userId)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put('profile/status', {status: status})
            .then(response => response.data)
    },

    uploadProfilePhoto(photo) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    updateUserProfile(profile) {
        return instance.put('profile', {...profile})
            .then(response => response.data)
    }
};

export const usersAPI = {
    getUsers(count, page, term, friend) {
        return instance.get(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
            .then(response => response.data)
    },

    followUser(userId) {
        return instance.post('follow/' + userId)
            .then(response => response.data)
    },

    unFollowUser(userId) {
        return instance.delete('follow/' + userId)
            .then(response => response.data)
    }
};

//profileAPI.uploadProfilePhoto().then((response) => console.log("ddddd"));

