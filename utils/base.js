import { Config } from 'config.js';

class Base {
    constructor() {
        this.baseResUrl = Config.restUrl;
    }

    request(params) {
        var url=this.baseResUrl+params.url;
        if(!params.type){
            params.type='GET';
        }
        wx.request({
            url:url,
            data:params.data,
            method:params.type,
            header: {
                'content-type' : 'application/json'
            },
            success:function(res) {
                params.sCallback && params.sCallback(res.data)
            },
            fail:function(err) {
                console.log(err)
            }
        })
    }

    // 获得元素上的绑定的值
    getDataSet(event,key) {
        return event.currentTarget.dataset[key]
    }
}

export {Base}