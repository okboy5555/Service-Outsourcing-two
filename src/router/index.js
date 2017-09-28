import App from '../App'
import Learn from '../views/learn'
import User from '../views/user'
import Login from '../views/login'
import Register from '../views/register'
import Guide from '../views/guide'
import Message from '../views/message'
import Community from '../views/community'
import Reset from '../views/reset'
import Test from '../views/test'
import Create from '../views/create'
import Topic from '../views/topic'
import Analysis from '../views/analysis'
import Settings from '../views/settings'
import ModifyName from '../views/modifyname'
import ModifySelect from '../views/modifyselect'
import Profile from '../views/profile'
import History from '../views/history'
import historyTopic from '../views/historyTopic'
import Wrong from '../views/wrong'

export default[{
      path: '/',
      component: App,
      children: [// true means need to login ,false means can get anytime,but i set true default in main.js 
        { path: '/login',name: 'login',meta: { auth: false }, component: Login },
        { path: '/user',name: 'user', meta: { auth: false }, component: User },
        { path: '/user/:id',name: 'profile', meta: { auth: false }, component: Profile },
        { path: '/learn',name: 'learn', meta: { auth: false }, component: Learn },
        { path: '/message',name: 'message', meta: { auth: false }, component: Message },
        { path: '/community',name: 'community', meta: { auth: false }, component: Community },
        { path: '/register',name: 'register', meta: { auth: false }, component: Register },
        { path: '/guide',name: 'guide', meta: { auth: false }, component: Guide },
        { path: '/reset',name: 'reset', meta: { auth: false }, component: Reset },
        { path: '/test',name: 'test', meta: { auth: false }, component: Test },
        { path: '/create',name: 'create', meta: { auth: false }, component: Create },
        { path: '/settings',name: 'settings', meta: { auth: false }, component: Settings },
        { path: '/settings/name',name: 'modifyname', meta: { auth: false }, component: ModifyName },
        { path: '/user/settings/select',name: 'modifyselect', meta: { auth: false }, component: ModifySelect },
        { path: '/analysis',name: 'analysis', meta: { auth: false }, component: Analysis, children: [{ path: '/analysis/:id', meta: { auth: false }, component: Analysis },] },
        { path: '/community/topic/:id',name: 'topic', meta: { auth: false }, component: Topic },
        { path: '/history',name: 'history', meta: { auth: false }, component: History },
        { path: '/historyTopic',name: 'historyTopic', meta: { auth: false }, component: historyTopic },
        { path: '/wrong',name: 'wrong', meta: { auth: false }, component: Wrong },
      ]
}]
