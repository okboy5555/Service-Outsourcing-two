<template>
    <div>
        <v-topbar></v-topbar>
        <v-nav></v-nav>
        <v-content v-scroll-record v-finger:swipe="swipe">
            <template>
            <div class="learn-box" v-if="user.recentUnfinishedTest">
                <div class="learn-title"><i class="iconfont icon-hot1"></i>尚未完成</div>
                <div class="learn-content">
                    <div class="learn-push">您上次的{{ user.recentUnfinishedTest.test_name }} 尚未完成</div>
                </div>
                <button @click="testById(user.recentUnfinishedTest._id)">继续答题</button>
            </div>
            <div class="clear"></div>
            <div class="learn-box">
                <div class="learn-title"><i class="iconfont icon-hot1"></i>日常推送</div>
                <div class="learn-content">
                    <div class="learn-push">我们为您准备了一份 {{ user.job }} 的试卷，快来测验一下吧</div>
                </div>
                <button @click="testByJob">前往测评</button>
            </div>
                <div class="clear"></div>
                <div class="learn-title"><i class="iconfont icon-rank"></i>职业考试</div>
                <div class="learn-job">
                    <select v-model="job">
                        <option :value="item.name" v-for="item in jobs">{{ item.name }}</option>
                    </select>
                    <button @click="testBySpecifyJob">前往测评</button>
                </div>
                <div class="clear"></div>
                <div class="learn-title"><i class="iconfont icon-jianpan"></i>语言练习</div>
                <div class="learn-vector">
                    <template v-for="(item, index) in lans">
                        <div class="learn-item" @click="testByTag(item.language)">
                            <div>
                                <i :class="[common,item.icon]"></i>
                            </div>
                            <span>{{item.text}}</span>
                        </div>
                    </template>
                    <div class="clear"></div>
                </div>
                <div class="learn-title"><i class="iconfont icon-xitizuicon"></i>专项练习</div>
                <div class="learn-vector">
                    <template v-for="(item, index) in points ">
                        <div class="learn-item" @click="testByTag(item.name)">
                            <div>
                                <i :class="[common,item.icon]"></i>
                            </div>
                            <span>{{item.text}}</span>
                        </div>
                    </template>
                    <div class="clear"></div>
                </div>
                <div class="learn-title"><i class="iconfont icon-bussinessman"></i>公司套题</div>
                <div class="learn-vector learn-bottom">
                    <template v-for="(item, index) in companies ">
                        <div class="learn-item" @click="testByTag(item.company)">
                            <div>
                                <i :class="[common,item.icon]"></i>
                            </div>
                            <span>{{item.text}}</span>
                        </div>
                    </template>
                    <div class="clear"></div>
                </div>
            </template>
        </v-content>  
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
    data: function () {
        return {
            common: 'iconfont',
            job:  '',
            lans: [
                {
                    text: 'HTML5',
                    language: 'html',
                    icon: 'icon-html-copy'
                },
                {
                    text: 'C++',
                    language: 'c++',
                    icon: 'icon-c'
                },
                {
                    text: 'Java',
                    language: 'java',
                    icon: 'icon-java'
                },
                {
                    text: 'Python',
                    language: 'python',
                    icon: 'icon-python1'
                },
                {
                    text: 'JavaScript',
                    language: 'javascript',
                    icon: 'icon-javascript'
                },
                {
                    text: '更多',
                    language: 'more',
                    icon: 'icon-more'
                }
            ],
            points: [
                {
                    text: '数据结构',
                    name: 'dataStructure',
                    icon: 'icon-zhinengsuanfa'
                },
                {
                    text: '网络基础',
                    name: 'internet',
                    icon: 'icon-wangluo1'
                },
                {
                    text: 'Linux',
                    name: 'linux',
                    icon: 'icon-linux'
                },
                {
                    text: 'Android',
                    name: 'android',
                    icon: 'icon-anzhuo'
                },
                {
                    text: 'IOS',
                    name: 'ios',
                    icon: 'icon-ios3'
                },
                {
                    text: '软件测试',
                    name: 'softwareTest',
                    icon: 'icon-ruanjianceshi'
                },
                {
                    text: '数据库',
                    name: 'database',
                    icon: 'icon-suyaniconchanpinleibufenzuodaohangbufen84'
                },
                {
                    text: '操作系统',
                    name: 'os',
                    icon: 'icon-caozuoxitong'
                },
                {
                    text: '智力题',
                    name: '',
                    icon: 'icon-zhili'
                },
            ],
            companies: [
                {
                    text: '百度',
                    company: '百度',
                    icon: 'icon-baidu01'
                },
                {
                    text: '腾讯',
                    company: '腾讯',
                    icon: 'icon-tengxunQbi'
                },
                {
                    text: '阿里',
                    company: '阿里',
                    icon: 'icon-alibaba'
                },
                {
                    text: '网易',
                    company: '网易',
                    icon: 'icon-wangyi'
                },
                {
                    text: '滴滴',
                    company: '滴滴',
                    icon: 'icon-didi'
                },
                {
                    text: '蘑菇街',
                    company: 'baidu',
                    icon: 'icon-mogujie'
                },
                {
                    text: '华为',
                    company: '华为',
                    icon: 'icon-huawei'
                },
                {
                    text: '携程',
                    company: '携程',
                    icon: 'icon-xiecheng'
                },
                {
                    text: '小米',
                    company: '小米',
                    icon: 'icon-xiaomi'
                },

            ]
        };
    },
    created () {
        console.log(this.$store.state)
        this.getUserJob();
        api.getEvalMsg().then(({ data }) => {
            if(data.errno) {
                return utils.toast(data.data);
            }else{
                this.set_jobs(data.data)
            }
        })
    },
    methods: {
        ...mapActions(['set_userjob','set_test','set_jobs','set_user']),
        testByJob () {
            if(!JSON.parse(localStorage.getItem('evaluate_user_info'))) {
                utils.toast('请重新登录');
                return this.$router.push({ path: '/' });  
            }
            if(!this.user.job) {
                utils.toast('请先完善个人信息');
                return this.$router.push({ path: '/guide' });  
            }
            // let user_id = JSON.parse(localStorage.getItem('evaluate_user_info'))._id;
            let job = this.user.job;
            api.getTestByJob({job})
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }
                this.set_test(data.data);
                utils.toast('开始测验');
                return this.$router.push({ path: '/test' });  
                
            })
        },
        testBySpecifyJob () {
            if(!this.job) {
                return utils.toast('您没有选择职业')
            }
             let job = this.job;
            api.getTestByJob({job})
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }
                this.set_test(data.data);
                utils.toast('开始测验');
                return this.$router.push({ path: '/test' });  
                
            })
        },
        testById (id) {
            api.getTestById(id)
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }
                this.set_test(data.data);
                utils.toast('继续测验');
                return this.$router.push({ path: '/test' });    
            })
        },
        testByTag (tags) {
            var tags = [tags]
            api.getSelfCreateTest({tags}).then(({data}) => {
                if (data.errno) {
                    return utils.toast(data.data)
                }
                this.set_test(data.data);
                utils.toast('继续测验');
                return this.$router.push({ path: '/test' });    
            })
        },
        getUserJob () {
            api.getUserData().then( ({data})=> {
                if(data.data.errno) {
                    return util.toast('无用户信息，请重新登录')
                }
                this.set_user(data.data);
            }).catch((err) => {
                return utils.toast('无用户信息，请重新登录',3000);
            })
        },
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.push('/community')
        }
    }
}
</script>

<style lang="stylus" scoped>
select
  display: block
  margin: 1rem auto
  padding: 0.5rem  
  width: 18rem
  height: 2rem 
button
  float: right
  text-align: center
  border: .1rem solid #158cfb
  border-radius: 4px;
  width: 6rem
  height: 2rem
  font-size: 0.7rem
  font-weight: 900
  background: none
  color: #333
  letter-spacing: 1px
.learn-box
  width: 100%
.learn-content
  margin: 0 auto
  width: 70%
  font-size: 0.7rem
.learn-title
  margin-top: 1rem
  height: 3rem
  text-align: center
  color: #333
  line-height: 3rem
  .iconfont
    font-size: 1rem
    margin-left: 0.5rem
    margin-right: 0.5rem
.clear
  clear: both
.iconfont
    font-size: 2rem
.learn-vector
  margin-top: 1rem
  .learn-item
    float: left
    width: 33%
    height: 6rem
    text-align: center
    span
      display: block
      padding-top: .4rem
      margin: 0 auto
.icon-ios3
  font-size: 2.5rem
  color: rgb(163,163,163)
.icon-caozuoxitong
  font-size: 1.5rem
.icon-suyaniconchanpinleibufenzuodaohangbufen84
  font-size: 2rem
.icon-ruanjianceshi
  font-size: 2.2rem
.icon-linux
  font-size: 2.2rem
.icon-huawei
  font-size: 2.5rem
.icon-xiecheng
  font-size: 2.8rem
.learn-bottom
  margin-bottom: 4rem
.icon-html-copy
  color: rgb(254,131,28)
.icon-anzhuo
  color: rgb(166,187,56)
.icon-java
  font-size: 2.2rem
  color: rgb(234,18,0)
.icon-javascript
  color: rgb(249,216,25)
.icon-python1
  color: rgb(51,110,157)
.icon-baidu01
  color: rgb(35,25,220)
.icon-tengxunQbi
  color: rgb(0,158,223)
.icon-huawei
  color: rgb(239,10,0)
.icon-alibaba
  color: rgb(225,123,24)
.icon-wangyi
  color: rgb(233,29,28)
.icon-didi
  color: rgb(246,145,10)
.icon-xiaomi
  color: rgb(245,121,33)
.icon-xiecheng
  color: rgb(34,121,151)
.icon-mogujie
  color: rgb(255,0,118)
.icon-zhinengsuanfa
  color: #6666ff
.icon-ruanjianceshi
  color: #ff0000
.icon-zhili
  color: #ff9966
</style>
