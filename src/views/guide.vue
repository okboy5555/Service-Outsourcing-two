<template>
    <div class="guide" >
        <div class="header" flex="main:center">
            完善个人信息
        </div>
        <div class="content" flex="main:center">{{ user.nickname || '游客'}}，{{ info }}，完善个人信息以助于我们生成您的考卷。</div>
        <div class="guide-content" flex="main:center">
            <div>
                <select v-model="job">
                    <option value="">请选择职业</option>
                    <option :value="item.name" v-for="item in jobs">{{ item.name }}</option>
                </select>
                <select v-model="time">
                    <option value="">请选择测试时间</option>
                    <option :value="item.value" v-for="item in times">{{ item.text }}</option>
                </select>      
                <p>您可以稍后在个人中心进一步完善或修改...</p>
                <button @click="submit(job, time)" >前往社区</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import api from '../axios'
import utils from '../utils/toast'
export default {
    computed: mapState({ 
        user: (state) => state.user,
        jobs: (state) => state.eval_jobs,
    }),
    data () { 
        return {
            job: '',
            times: [{text:'30分钟',value:30},{text:'60分钟',value:60},{text:'90分钟',value:90},{text:'120分钟',value:120}],
            time: '',
            nickname: '游客',
            info: '',
        }
    },
    mounted () {
        this.initEvalMsg();
        this.hello();
    },
    methods: {  
        ...mapActions(['set_jobs','set_basic']),
        hello () {
            let now = parseInt(new Date().getHours());
            if(0<= now&& now < 11) {
                this.info = '早上好';
            }
            if(11 < now && now < 13) {
                this.info = '中午好';
            }
            if(now >= 13 && now < 18) {
                this.info = '下午好';
            }
            if(18<=now && now < 24){
                this.info = '晚上好';
            }
        },
        initEvalMsg () {
            if(JSON.parse(localStorage.getItem('evaluate_user_info')).nickname){
                this.nickname = JSON.parse(localStorage.getItem('evaluate_user_info')).nickname;
            }
            api.getEvalMsg()
            .then(({ data }) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }else{
                    let msg = data.data
                    this.set_jobs(data.data)
                }
            })
        },
        submit (job, time) {
            
            if(!job) {
                return utils.toast('请选择意向职业');
            }

            if(!time) {
                return utils.toast('请选择测试时间');
            }

            
            api.saveUserBasic( {job, time} )
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                } 
                this.set_basic([job, time]);
                this.$router.push('/learn');
              
            })
        }

    }
}    
</script>

<style lang="stylus" scoped>
body
  color: #666
button
  margin-top: 5rem
  width: 20rem
  height: 2.8rem
  border: .1rem solid #158cfb;
  border-radius: 4px;
  text-decoration: none;
  letter-spacing: 0.3rem
  font-size: 1rem
  color: #fff
  background: #158cfb
select
  display: block
  margin: 1rem auto
  padding: 0.5rem  
  width: 18rem
  height: 2rem 
option
  padding: 0 
  width: 10rem
.content
  text-indent: 2em


  
</style>