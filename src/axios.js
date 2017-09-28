import axios from 'axios'
import store from './store'
import router from './router'

// set global axios default
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charst=UTF-8';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charst=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

// set interceptor of request
instance.interceptors.request.use(
    config => {
        if(localStorage.getItem('evaluate_user_info')) {
            config.headers.Authorization = `token ${JSON.parse(localStorage.getItem('evaluate_user_info')).token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// set interceptor of response
instance.interceptors.response.use(
    response => {
        return response;
    },
// stauts code isn't 2xx
    err => {
        if(err.response) {
            console.log('response.status',err.response.status);
            if(err.response.status == '401') {
                // token lose efficacy
                store.commit('SIGN_OUT');
                window.location.href = '/login';
            }
        }
        return Promise.reject(err.response.data);
    }
);

const commonUrl = 'http://localhost:3000';
const uploadConfig = {
    headers: { 'Content-Type': 'multipart/form-data;boundary=—-WebKitFormBoundary7MA4YWxkTrZu0gW'}
};

export default {
    signin (data) {
        return instance.post(commonUrl +'/api/signin', data);
    },

    signup (data) {
        return instance.post(commonUrl +'/api/signup', data);
    },

    send_resetMail (data) {
        return instance.get(commonUrl +'/api/reset_pass?email='+data.email);
    },

    reset_pass (data) {
        return instance.post(commonUrl +'/api/reset_pass', data);
    },

    getUserData () {
        return instance.get(commonUrl +'/api/user');
    },

    getOtherUserData (data) {
        console.log(data)
        return instance.get(commonUrl + '/api/user/' + data);
    },

    getEvalMsg () {
        return instance.get(commonUrl + '/api/jobs');
    },

    saveUserBasic (data) {
        return instance.post(commonUrl + '/api/user/save/basic', data);
    },

    saveUserJob (data) {
        return instance.post(commonUrl + '/api/user/save/job', data);
    },

    saveUserTime (data) {
        return instance.post(commonUrl + '/api/user/save/time', data);
    },

    saveUserName (data) {
        return instance.post(commonUrl + '/api/user/save/name', data);
    },

    saveUserCount (data) {
        return instance.post(commonUrl + '/api/user/save/count', data);
    },

    getTestByJob (data) {
        return instance.post(commonUrl + '/api/test/job', data);
    },

    getTestById (data) {
        return instance.post(commonUrl + '/api/test/'+ data);
    },

    getQuestionByQid (data) {
        return instance.post(commonUrl + '/api/test/next?tid=' + data.tid +'&qid=' + data.qid, data);
    },

    saveAnswerByTidIndex (data) {
        return instance.post(commonUrl + '/api/test/save', data);
    },

    createArticle (data) {
        return instance.post(commonUrl + '/api/community/create', data);
    },

    getCommunity (data) {
        return instance.get(commonUrl + '/api/community/?tab='+data.data.tab+'&page='+data.data.page);    
    },

    getTopicData (data) {
        return instance.get(commonUrl + '/api/community/topic/'+data.id);    
    },

    reply (data) {
        return instance.post(commonUrl + '/api/community/topic/'+data.topicId + '/reply', data);
    },

    getAnalysis (data) {
        return instance.get(commonUrl + '/api/test/' + data.qid + '/analysis');
    },

    finishTest (data) {
        return instance.post(commonUrl + '/api/test/' + data.tid + '/finish');
    },

    uploadAvatar (data) {
        console.log('axios',data);
      
        return instance.post(commonUrl + '/api/upload/avatar' ,data.avatar, {headers:data.headers});
    },

    upReply (data) {
        console.log('axios',data)
        return instance.post(commonUrl + '/api/community/topic/' + data.topicId + '/reply/' + data.replyId + '/up');
    },

    getMessages () {
        return instance.get(commonUrl + '/api/message/');
    },

    getHistoryTests () {
        return instance.get(commonUrl + '/api/test/history');
    },

    getHistoryTopics () {
        return instance.get(commonUrl + '/api/user/topic/history');
    },

    getWrongQuestions () {
        return instance.get(commonUrl + '/api/user/wrong');
    },

    getSelfCreateTest (data) {
        return instance.post(commonUrl + '/api/test/create', data);
    },
}