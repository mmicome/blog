//================================//
// ----- file upload preview -----//
//================================//

/* 
* program: one
* pramas: oInput.files[0]
* 图片上传
*/
function upload_preview_fileReader(file) {
  var fr = new fileReader();
  fr.readAsDataURL(file);
  
  fr.onload = function(e） {
    var result = e.target.result;
    var img = $("<img src'" + result + "'>");
    $('.preview').html("").append(img);
  }
}

/*
* program: two
* pramas：oInput.files[0]
* 图片上传， 视频上传
*/

function upload_preview_createObjectURL(file) {
  var blob = new Blob(file);
  var url = URL.createObjectURL(blob);
  
  if(/image/g.test(file.type)) {
    var img = $("<img src'" + url + "'>");
    img.onload = function() {
      URL.revokeObjectURL(url);
    }
    $('.preview').html("").append(img);
  } else {
    var video = $("<video controls src='"+ url +"'>");
    $('.preview').html("").append(video);
    video.onload = function() {
      URL.revokeObjectURL(url);
    }
  }
}
