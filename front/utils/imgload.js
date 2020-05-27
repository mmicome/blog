//异步加载图片
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image('400', '200') // 生成image实例对象，宽高
        image.onload = () => {
            resolve(image) // 加载成功时候，返回image对象
        }
        image.onerror = () => {
            reject(new Error(`could not load image at ${url}`)) // 加载失败是报错
        }
        image.src = url // 请求的图片地址
    })
}

/*
loadImage('http://pic.7y7.com/201410/2014102458431393_600x0.jpg')
    .then(res => {
        console.log(res.src) // 拿到image对象的src 属性
        this.setState({
            images: res
        }, () => {
            console.log(this.state.images)
        })
    }, () => {
        // rejected状态下的回掉函数
    })
*/
