### $.ajax需要注意的一些地方：

  1. data主要方式有三种，html拼接的，json数组，form表单经serialize()序列化的
  2. $.ajax只提交form以文本方式，如果异步提交包含<file>上传是传不过去,需要使用jquery.form.js的$.ajaxSubmit
