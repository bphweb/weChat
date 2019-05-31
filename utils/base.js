class Base {
    constructor() {
        this.baseResUrl = 'http://test-knock.qqiaoqiao.com/knock/';
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
                params.sCallback && params.sCallback(res)
            },
            fail:function(err) {
                console.log(err)
            }
        })
    }
}

export {Base}