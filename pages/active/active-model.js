import {Base} from '../../utils/base.js'

class Active extends Base{

    constructor(){
        super()
    }
    getActivityList(callback) {
        var params = {
            url:'/wxactivity/activitylist',
            sCallback:function(res) {
                callback && callback(res.entry)
            }
        }
        this.request(params)
    }
}

export {Active};