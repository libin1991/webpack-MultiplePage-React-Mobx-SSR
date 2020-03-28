import Index from './index/app'
import IndexStore from './index/store/index'

import Home from './home/app'
import HomeStore from './home/store/index'

import Abort from './abort/app'
import AbortStore from './abort/store/index'

export default {
    '/index.html': { App: Index, Store: IndexStore },
    '/home.html': { App: Home, Store: HomeStore },
    '/abort.html': { App: Abort, Store: AbortStore }
}