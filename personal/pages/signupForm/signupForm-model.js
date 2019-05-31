import {Base} from "../../../utils/base.js"

class SignupForm extends Base{

    constructor(){
        super()
    }
    getForm(param,callback) {
        var allParams = {
            type:'post',
            url:'/wxactivity/enter/activity',
            data:param,
            sCallback:function(res) {
                callback && callback(res.entry)
            }
        }
        this.request(allParams)
    }
}

export {SignupForm};