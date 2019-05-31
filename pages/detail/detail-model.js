import {Base} from '../../utils/base.js'

class Detail extends Base{

    constructor(){
        super()
    }
    getDetailInfo(activityId,callback) {
        var params = {
            url:'/wxactivity/activity/details?activityId='+activityId,
            sCallback:function(res) {
                callback && callback(res.entry)
            }
        }
        this.request(params)
    }
}

export {Detail};