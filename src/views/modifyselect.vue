<template>
    <div>
        <v-header :title="'修改'+ this.$route.query.title">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content v-finger:swipe="swipe">
            <div>
                <select v-if="this.$route.query.name=='job'" v-model="job">
                    <option value="">请选择意向职业</option>
                    <option :value="item.name" v-for="item in jobs" >{{ item.name }}</option>
                </select>
                <select v-if="this.$route.query.name=='time'" v-model="time">
                    <option value="">请设置测试时间</option>
                    <option :value="item.value" v-for="item in times">{{ item.text }}</option>
                </select>
                <select v-if="this.$route.query.name=='count'" v-model="count">
                    <option value="">请设置试卷题量</option>
                    <option :value="item.value" v-for="item in nums">{{ item.text }}</option>
                </select>            
            </div>
            <button @click="submit">保存设置</button>     
        </v-content>
    </div>
</template>

<script>
import api from '../axios'
import utils from '../utils/toast'
import {mapState, mapActions} from 'vuex'
export default {
    computed: mapState(
        {
            user: (state) => state.user
        }
    ),
    data () {
        return {
            title: '',
            name: '',
            job: '',
            time: null,
            times: [{text:'30分钟',value:30},{text:'60分钟',value:60},{text:'90分钟',value:90},{text:'120分钟',value:120}],
            jobs: '',
            count: null,
            nums: [{text:'5题',value:5},{text:'10题',value:10},{text:'20题',value:20},{text:'30题',value:30}],
        }
    },
    mounted () {
        this.initEvalMsg();
    },
    methods: {
        ...mapActions(['set_jobs','set_basic']),
        submit () {
            if(this.$route.query.name == 'job') {
                let job = this.job;
                console.log(this.job)
                if(!job) return utils.toast('请选择职业')
                api.saveUserJob({ job }).then(({data}) => {
                    if(data.errno == 0) {
                        this.user.job = job;
                    }
                    return utils.toast(data.data)
                })
            }

            if(this.$route.query.name == 'time') {
                let time = this.time;
                if(!time) return utils.toast('请选择时间')
                api.saveUserTime({ time}).then(({data}) => {
                    api.saveUserTime({ time }).then(({data}) => {
                        if(data.errno == 0) {
                            this.user.time = time;
                        }
                        return utils.toast(data.data)
                    })
                })
            }

            if(this.$route.query.name == 'count') {
                let count = this.count;
                if(!count) return utils.toast('请选择题量')
                api.saveUserCount({ count }).then(({data}) => {
                    api.saveUserCount({ count }).then(({data}) => {
                        if(data.errno == 0) {
                            this.user.count = count;
                        }
                        return utils.toast(data.data)
                    })
                })
            }
        },
        initEvalMsg () {
            if(JSON.parse(localStorage.getItem('evaluate_eval_jobs'))){
                this.jobs = JSON.parse(localStorage.getItem('evaluate_eval_jobs'));
            }
            api.getEvalMsg()
            .then(({ data }) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }else{
                    let jobs = data.data
                    this.set_jobs(data.data)
                }
            })
        },
           
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
    }
}
</script>

<style lang="stylus" scoped>
input
  margin: 0 auto
  width: 90%
  padding: .4rem
  border: .05rem solid #ddd 
  border-radius: .05rem
  line-height: 1.2rem 
  font-size: .7rem    
p
  padding: .5rem
  font-size: .8rem;
  color: #666
button
  display: block
  margin: 0 auto
  width: 90%
  height: 2.8rem
  border: .1rem solid #158cfb
  border-radius: .05rem
  font-size: 1rem
  color: #fff
  background: #158cfb
.icon-back1
  font-size: 1.5rem
select
  margin: 0 auto
  width: 90%
  height: 2rem
</style>