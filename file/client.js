var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

String.format = function(src){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

function analyze() {
    var uploadFiles = el('file-input').files;
    if (uploadFiles.length != 1) 
		alert('请选择一个文件!');
	else {
		el('analyze-button').innerHTML = '分析中...';
		var xhr = new XMLHttpRequest();
		var loc = window.location
		xhr.open('POST', 'http://123.57.235.182:1573', true);
		xhr.onerror = function() {alert ('网络错误！');}
		xhr.onload = function(e) {
			if (this.readyState === 4) {
				var response = JSON.parse(e.target.responseText);
				if(response.result == 'Normal')
					var re = '正常';
				else if(response.result == 'Abnormal')
					var re = '异常';
				else
					alert ('图片格式错误！')
				var template = "结果为：{0}，且概率为{1}";
				var site = response.Probability;
				var msg = String.format(template, re, site);
				el('result-label').innerHTML = msg;
			}
			el('analyze-button').innerHTML = '分析';
		}
    }

    var fileData = new FormData();
    fileData.append('file', uploadFiles[0]);
    xhr.send(fileData);
}

