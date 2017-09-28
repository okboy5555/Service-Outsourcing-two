import api from '../axios'
import routeData from '../libs/index'
import utils from '../utils/toast'

const { history, location } = window;
const getPageKey = () => history.state == null ? location.href : history.state.key ;

export default {
    mixins: [routeData],
    routeData () {
        return {
            complete: false, // data loading completed ?
            loading: false, // is in request ?
            page: 1, 
            list: [],
        }
    },
    created () {
        console.log('created',getPageKey(),this.list.key)
        if(getPageKey() !== this.list.key) {// page forward
            if(this.page === 1) {// first load
                this.pullList();
                this.list.key = getPageKey();
            }else{
                this.reset();
            }
        }else{
            this.loading = false;
        }
    },
    watch: {
        $route () {
            if(getPageKey() !== this.list.key) {
                this.reset();
            }
        }
    },
    mounted () {
        this.loading = false;
    
    },
    methods: {
        reset () {
            Object.assign(this.$data, this.$options.routeData());
            console.log('reset',getPageKey(),this.list.key)
            this.$nextTick(() => {
                this.list.key = getPageKey();
                this.pullList(); 
                
            })
        },
        pullList () {
            if(this.complete || this.loading ) return;
            this.loading = true;
            var { url, data = {} } = this._pullList();
            api.getCommunity({ data }).then( ({data})=> {
                if(data.errno) {
                    return utils.toast('获取话题失败')
                }
                data.data.topic.forEach((item) => this.list.push(item));
                this.complete = true;
                this.page++;
                this.loading = false;
            })
        },
        // pullMsgList () {
        //     if(this.complete || this.loading ) return;
        //     this.loading = true;
        //     var { url, data = {} } = this._pullMsgList();
        //     api.getCommunity({ data }).then( ({data})=> {
        //         if(data.errno) {
        //             return utils.toast('获取消息失败')
        //         }
        //         data.data.forEach((item) => this.list.push(item));
        //         this.complete = true;
        //         this.page++;
        //         this.loading = false;
        //     })
        // },
        seeing () {
            if(this.page === 1) return;
            this.pullList();
        }
    }

}