import * as types from './types'

export default {
    [types.SIGN_IN]: (state, data) => {
        state.user = data;
        state.is_login = true;
        localStorage.setItem('evaluate_user_info', JSON.stringify(data));
    },

    [types.SIGN_OUT]: (state) => {
        localStorage.clear();
    },

    [types.SET_USER]: (state, data) => {
        state.user = data;
    },

    // [types.SET_NICKNAME]: (state, data) =>{
    //     localStorage.setItem('evaluate_user_nickname', data);  
    // },

    [types.SET_JOBS]: (state, data) => {
        localStorage.setItem('evaluate_eval_jobs', JSON.stringify(data));
        state.eval_jobs = data;
    },

    [types.SET_BASIC]: (state, data) => {
        state.user.job = data[0];
        state.user.time = data[1];
        let user_info = JSON.parse(localStorage.getItem('evaluate_user_info'));
        user_info.job = data[0];
        user_info.time = data[1];
        localStorage.setItem('evaluate_user_info', JSON.stringify(user_info));
        
    },

    [types.SET_USERJOB]: (state, data) => {
        localStorage.setItem('evaluate_user_job', data);
    },

    [types.COUNT_TESTTIME]: (state) => {
        clearInterval(state.timer)
        state.timer = setInterval( ()=> {
            let hour = 0;
            let min = 0;
            let sec = parseInt(state.rest_time);

            if(sec <= 0){
                clearInterval(state.timer)
            }else{

                if(sec > 60) {
                    min = parseInt(sec / 60);
                    sec = parseInt(sec % 60);
                    if(min > 60) {
                        hour = parseInt(min / 60);
                        min = parseInt(min % 60);
                    }
                }
                (hour + '').length < 2 ? hour = '0' + hour : hour = hour;
                (min + '').length < 2 ? min = '0' + min : min = min;
                (sec + '').length < 2 ? sec = '0' + sec : sec = sec;
        
                state.countdown_hour = hour;
                state.countdown_min = min;
                state.countdown_sec = sec;
            }
            state.rest_time--;
        },1000);
    },

    [types.SET_TEST]: (state, data) => {
        let test = {
            test_name: data.test_name,
            test_type: data.test_type,
            test_id: data.test_id,
            test_qid: data.test_qid,
            test_user_answer: data.test_user_answer,
            test_create_time: data.test_createtime
        }
        localStorage.setItem('evaluate_now_test', JSON.stringify(test));         
    },

    [types.SET_USER_ANSWER]: (state, data) => {
        let evaluate_now_answer = JSON.parse(localStorage.getItem('evaluate_now_answer')) || [];
        let flag = false;
        evaluate_now_answer.forEach((item, index, arr)=>{
            if(item.hasOwnProperty(data[0])){
                flag = true;
                arr[index][data[0]] = data[1];       
            }
        })
        
        if(!flag) {
            let tmp = {};
            tmp[data[0]] = data[1];
            console.log(evaluate_now_answer)
            evaluate_now_answer.push(tmp);
        }
    
        localStorage.setItem('evaluate_now_answer', JSON.stringify(evaluate_now_answer));        
    },

    [types.SET_TEST_STATUS]: (state, data) => {
        let index = data[0];
        let status = data[1];
        let evaulate_now_status = JSON.parse(localStorage.getItem('evaluate_now_status')) || [];
        evaulate_now_status[index] = status;
        localStorage.setItem('evaluate_now_status',JSON.stringify(evaulate_now_status));
    },

// separate marked question from above test_status, sorry,so long time code this project,tired to build standard
    [types.SET_STATUSLIST]: (state, data) => {
        let evaluate_now_list = JSON.parse(localStorage.getItem('evaluate_now_list')) || [];
        let tmp = evaluate_now_list[data[0]] || {}
        let key = data[1];
        let value = data[2];
        tmp[key] = value;
        evaluate_now_list[[data[0]]] = tmp;
        state.list = evaluate_now_list;
        localStorage.setItem('evaluate_now_list', JSON.stringify(evaluate_now_list));
    },

    [types.GET_STATUSLIST]: (state) => {
        state.list = JSON.parse(localStorage.getItem('evaluate_now_list'));
    },

    [types.INIT_STATUSLIST]: (state) => {
        if(JSON.parse(localStorage.getItem('evaluate_now_list'))){
            state.list = JSON.parse(localStorage.getItem('evaluate_now_list'));
        }else{
            let test_flag = [];
            let length = JSON.parse(localStorage.getItem('evaluate_now_test')).test_qid.length;
            for(let i = 0;i<length;i++) {
                test_flag.push({'finsihed': false, 'marked': false});
            }
            state.list = test_flag
            localStorage.setItem('evaluate_now_list', JSON.stringify(test_flag))
        }
    },

    [types.INIT_ANALYSISLIST]: (state, data) => {
        console.log('data',data)
        state.analysis_list = data;
    },

    [types.SET_COUNT]: (state, data) => {
        state.count = data;
        localStorage.setItem('evaluate_now_count', data);
    },

    [types.SET_TESTTIME]: (state, data) => {
        state.rest_time = data;
    },
}