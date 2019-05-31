import {Base} from '../../utils/base.js'

class Index extends Base{

    constructor(){
        super()
    }
    getBannerData(callback) {
        var params = {
            url:'banner/1',
            sCallback:function(res) {
                callback && callback(res)
            }
        }
        this.request(params)
    }
}

export {Index};