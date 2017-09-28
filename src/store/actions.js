import Vue      from 'vue'
import router   from '../router'
import * as types from './types'

export default {

    signin ({ commit }, data) {
        // console.log('action data',data)
        commit(types.SIGN_IN, data);
    },

    signup ({ commit }, data) {
        // commit(types.SET_TOKEN, data);
    },

    signout ({ commit }) {
        socket.emit('login_out', JSON.parse(localStorage.getItem('evaluate_user_info'))._id);
        commit(types.SIGN_OUT);
    },

    set_user ({ commit }, data) {
        commit(types.SET_USER, data);
    },

    set_basic ({ commit }, data) {
        commit(types.SET_BASIC, data);
    },

    // set_nickname ({ commit }, data) {
    //     commit(types.SET_NICKNAME, data);
    // },

    set_jobs ({ commit }, data) {
        commit(types.SET_JOBS, data);
    },

    set_userjob ({ commit }, data) {
        commit(types.SET_USERJOB, data);
    },
    
    count_testtime ({ commit }) {
        commit(types.COUNT_TESTTIME);
    },

    set_test ({ commit }, data) {
        commit(types.SET_TEST, data);
    },

    set_testtime ({ commit }, data) {
        console.log('action',data)
        commit(types.SET_TESTTIME, data);
    },

    set_statuslist ({ commit }, data) {
        commit(types.SET_STATUSLIST, data);
    },

    init_statuslist ({ commit }) {
        commit(types.INIT_STATUSLIST);
    },

    init_analysislist ({ commit }, data) {
        commit(types.INIT_ANALYSISLIST, data);
    },

    get_statuslist ({ commit }) {
        commit(types.GET_STATUSLIST)
    },

    set_user_answer ({ commit }, data) {
        commit(types.SET_USER_ANSWER, data);
    },

    set_test_status ({ commit }, data) {
        commit(types.SET_TEST_STATUS, data);
    },

    set_count ({ commit }, data) {
        commit(types.SET_COUNT, data);
    }

}