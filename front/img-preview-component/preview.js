//先创建一个构造函数(oriWidth与oriHeight指的是父区域的宽高，也就是图片要跟该宽高进行比较的值。)
function DealPic(width,height){
    this.oriWidth = width;
    this.oriHeight = height;
}

//实现一个getObjectURL，干嘛的呢，如果支持file对象支持files，就返回只包含url的一个对象，如果是IE9以及低版本浏览器返回的对象中还包括滤镜图片的原始大小。
//在IE低版本浏览器为什么要这样处理呢，如果我们要得到滤镜图片的元素大小，首先得创建一个img元素，然后通过IE浏览器的document.selection.createRange().text得到图片路径，然后给这个img元素进行设置，这儿关键得用到filter的sizingMethod属性。

//sizingMethod属性：可选值，设置或检索的方式来显示一个图像在对象边界显示方式。有三个值：crop裁剪图像以适应对象的尺寸；image，默认值，扩大或减少对象的边界,以适应图像的尺寸；scale，伸展或收缩图像填充对象的边界；

//这儿使用image才能得到滤镜图片的原始大小。然后返回。如果一开始只是把这个url返回回去，没有返回滤镜图片的实际大小，就不能达到自适应的效果。

//当然上面获取图片的url用到的是window.createObjectURL，也可以用FileReader.readAsDataURL读取指定Blob或File的内容。
DealPic.prototype.getObjectURL = function(fileObj){
    var result = {} ;
    var file;
    if(fileObj.files){
        file = fileObj.files[0];
        if (window.createObjectURL!=undefined) { // basic
            result.url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // mozilla(firefox)
            result.url = window.URL.createObjectURL(file) ;
        }else if (window.webkitURL!=undefined) { // webkit or chrome
            result.url = window.webkitURL.createObjectURL(file) ;
        }
    }else{
       var hiddenAlphaImageWidth,hiddenAlphaImageHeight;
        var hiddenAlphaImage = document.createElement('img');
        document.body.appendChild(hiddenAlphaImage);
        fileObj.select();
        fileObj.blur();
        result.url = document.selection.createRange().text;
        hiddenAlphaImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)";
        hiddenAlphaImage.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = result.url;
        //但是当滤镜使用的图片超过10M大小，使用上面的代码页面会报错，说hiddenAlphaImage出现未指明的错误；
        //解决办法就是使用下面的注释的方式，注释上面的两行代码
        //使用下面代码滤镜图片超过10M后本地预览不了，通过这个滤镜得到的图片的宽高始终是28*30
        //hiddenAlphaImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + result.url + "\")"; 
        
        result.width = hiddenAlphaImage.offsetWidth;
        result.height = hiddenAlphaImage.offsetHeight;
        if(hiddenAlphaImage.parentNode){
            hiddenAlphaImage.parentNode.removeChild(hiddenAlphaImage);
        }
    }
    return result;
}
//替代方案
//if (input.files && input.files[0]) {
//    var reader = new FileReader();
//    reader.onload = function (e) { 
 //       var showImg = document.getElementById('showViewImg');
//        showImg.src = e.target.result;
//        showImg.style.width = '150px';
//        showImg.style.height = '80px';        
//    };
 //   reader.readAsDataURL(input.files[0]);
//}
//这儿得到的url是base64编码的字符串

//图片自适应的比较方法：
DealPic.prototype.getPicResult = function(targetWidth,targetHeight,callback){
    if(this.oriWidth / this.oriHeight > targetWidth / targetHeight){
        var th = this.oriHeight;
        var tw = this.oriHeight / targetHeight * targetWidth; 
    }else{
       var tw = this.oriWidth;
       var th = this.oriWidth / targetWidth * targetHeight;
    }
    if(callback){
        callback(tw,th);
    }
}

//绑定到file按钮上的change事件
function getCurrFile(){
    var fileObj = document.getElementById('filePath');
    var showImgObj = document.getElementById('showViewImg');
    var newPicObj = new DealPic(150,150);
    var resultFileObj = newPicObj.getObjectURL(fileObj);
    if(fileObj.files){
        var newImg = new Image();
        newImg.onload = function(){
            newPicObj.getPicResult(newImg.width,newImg.height,function(tw,th){
                showImgObj.style.width = tw + 'px';
                showImgObj.style.height = th + 'px';
            });    
        }
        newImg.src = resultFileObj.url;
        showImgObj.setAttribute('src',resultFileObj.url);
    }else{
        showImgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        showImgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = resultFileObj.url;
        //IE9低版本不设置图片src会显示裂图，所以设置一个透明图片或者base64的透明图片
        showImgObj.setAttribute('src','./images/transparent.png');
        //showImgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        newPicObj.getPicResult(resultFileObj.width,resultFileObj.height,function(resw,resh){
            showImgObj.style.width = resw + 'px';
            showImgObj.style.height = resh + 'px';
        });    
    }   
}  
