import {Base} from "../../../utils/base.js"

class ActivityForm extends Base{

    constructor(){
        super()
    }
    getForm(param,callback) {
        var allParams = {
            type:'post',
            url:'/wxactivity/foundactivity',
            data:param,
            sCallback:function(res) {
                callback && callback(res.entry)
            }
        }
        this.request(allParams)
    }
}

export {ActivityForm};