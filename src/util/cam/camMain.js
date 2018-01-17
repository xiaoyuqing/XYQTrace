/* eslint-disable */
var timOut = 0
var ws = ''
var m_isConnectWS = false
var m_splitTag = '$*$'
var m_lastMessage = ''
var m_imageDataH = 0
var m_imageDataW = 0
var m_imageDataS = 0
var m_stopWait = false // 同步等待
var m_closed = false // 是否被关闭了
var base64 = ''

export function load(){
  StartWebSocket()
}

export function unload () {
  if (m_closed) {
    return
  }
  clearInterval()
  sendWsMessage('uinitSdk')
}

export function sendPreZoneSize () {
  var w = document.getElementById('myCanvas').width
  var h = document.getElementById('myCanvas').height
  sendWsMessage('PreZoneSize' + m_splitTag + String(w) + m_splitTag + String(h))
}

export function openDev () {
  if (m_closed) {
    StartWebSocket()
  }
  setTimeout(function () {
    sendPreZoneSize()
    sendWsMessage('OpenDevice' + m_splitTag + '0')
    timOut = setInterval(function () {
      ws.send('GetBuff')
    }, 200)
    sendWsMessage('GetDeviceCount')
    sendWsMessage('GetDeviceName')
  }, 500)
}

export function startShowUI () {
  var loadwaitUi = document.getElementById('ld')
  loadwaitUi.style.display = 'none'
  document.getElementById('mainUI').style.display = 'block'
}

export function showErrorUI (msg) {
  var loadwaitUi = document.getElementById('ld')
  loadwaitUi.style.display = 'none'
  document.getElementById('mainUI').style.display = 'block'
  document.getElementById('disp').value = msg
}

export function configureDevInfo (names) {
  //设备名字
  var objSelect = document.getElementById('device')
  objSelect.options.length = 0
  for (var i = 1; i < names.length; i++) {
    var op = new Option(names[i], i)
    objSelect.options[objSelect.length] = op
  }
  //设置设备
  objSelect.onchange = function () {
    sendWsMessage('OpenDevice' + m_splitTag + String(objSelect.selectedIndex))
  }
}

export function configureRestionInfo (names) {
  var objSelect = document.getElementById('resoultion')
  objSelect.options.length = 0
  for (var i = 1; i < names.length; i++) {
    if (names[i].length <= 0) {
      continue
    }
    var op = new Option(names[i], i)
    objSelect.options[objSelect.length] = op
  }
  //设置分辨率
  objSelect.onchange = function () {
    sendWsMessage('SetResolution' + m_splitTag + String(objSelect.selectedIndex))
  }
}

export function configureVideoStyle (names) {
  var objSelect = document.getElementById('videoStyle')
  objSelect.options.length = 0
  for (var i = 1; i < names.length; i++) {
    var op = new Option(names[i], i)
    objSelect.options[objSelect.length] = op
  }
  //设置视频格式
  objSelect.onchange = function () {
    sendWsMessage('SetMediaType' + m_splitTag + String(objSelect.selectedIndex))
  }
}

export function setCanvasImageSize (w, h, s) {
  m_imageDataH = h
  m_imageDataS = s
  m_imageDataW = w
}

function setCavasImage (bytearray) {
  var tempcanvas = document.getElementById('myCanvas')
  var imageheight = m_imageDataH
  var imagewidth = m_imageDataW
  var tempcontext = tempcanvas.getContext('2d')
  var imgdata = tempcontext.createImageData(imagewidth, imageheight)
  imgdata.data.set(bytearray)
  /*
     for(var i = 0 ;i < imageheight * imagewidth * 4; i ++)
     {
         imgdata.data[i] = bytearray[i];
     }
    /* for (var row = 0; row < imageheight; row++) {
         for (var col = 0; col < imagewidth; col++) {
              imgdata.data[((imagewidth * row) + col) * 4] = bytearray[((imagewidth * row) + col) * 4 + 2];
             imgdata.data[((imagewidth * row) + col) * 4 + 1] = bytearray[((imagewidth * row) + col) * 4 + 1];
             imgdata.data[((imagewidth * row) + col) * 4 + 2] = bytearray[((imagewidth * row) + col) * 4];
             imgdata.data[((imagewidth * row) + col) * 4 + 3] = 255;
             }
     }*/
  //tempcontext.drawImage(img,0,0,imagewidth,imageheight,0,0,tempcanvas.style.width,tempcanvas.style.height);
  tempcontext.putImageData(imgdata, 0, 0, 0, 0, imagewidth, imageheight)
}

export function Uint8ToString (u8a) {
  var CHUNK_SZ = 0x8000
  var c = []
  for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)))
  }
  return c.join('')
}

export function setImageWithBase64 (str) {
  var myimg = document.getElementById('myCanvas')
  myimg.src = 'data:image/png;base64,' + str
}

export function SetRotationStyle () {
  var objSelect = document.getElementById('rotationStyle')
  sendWsMessage('SetRotateMode' + m_splitTag + String(objSelect.selectedIndex))
}

export function SetCutStyle () {
  var objSelect = document.getElementById('cutStyle')
  sendWsMessage('SetCutMode' + m_splitTag + String(objSelect.selectedIndex))
}

export function SetImageStyle () {
  var objSelect = document.getElementById('imagestyle')
  sendWsMessage('SetImageType' + m_splitTag + String(objSelect.selectedIndex))
}

export function viewFolder () {
  var fileDir = document.getElementById('saveText').value
  sendWsMessage('viewFolder' + m_splitTag + fileDir)
}

export function openFolder () {
  var fileDir = document.getElementById('saveText').value
  sendWsMessage('viewFolder' + m_splitTag + fileDir)
}

export function setSavePath (path) {
  document.getElementById('saveText').value = path
}

// 保存参数
export function SavePara () {
  var x = document.getElementById('dpix').value
  var y = document.getElementById('dpiy').value
  var jpg = document.getElementById('jpg').value
  var left = document.getElementById('left').value
  var right = document.getElementById('right').value
  var top = document.getElementById('top').value
  var bottom = document.getElementById('bottom').value
  sendWsMessage('SetImageDPI' + m_splitTag + x + m_splitTag + y) //DPI
  sendWsMessage('SetJPGQuanlity' + m_splitTag + jpg)   //JPG
  sendWsMessage('SetCusCropSize' + m_splitTag + left + m_splitTag + top + m_splitTag + right + m_splitTag + bottom) //Crop
}

export function Capture () {
  var fileDir = document.getElementById('saveText').value
  var fileStyle = document.getElementById('imagestyle').options[document.getElementById('imagestyle').selectedIndex].text
  SavePara()
  sendWsMessage('CaptureImage' + m_splitTag + fileDir + m_splitTag + fileStyle)
}

export function CaptureBase64 () {
  var fileDir = document.getElementById('saveText').value
  var fileStyle = document.getElementById('imagestyle').options[document.getElementById('imagestyle').selectedIndex].text
  SavePara()
  sendWsMessage('CaptureImageToBase64' + m_splitTag + fileDir + m_splitTag + fileStyle)
}

export function showBase64info (str) {
  // alert('Base64数据为：' + str)
  base64 = str
}

export function getBase64 () {
  return base64
}

export function closeDev () {
  sendWsMessage('camCloseDev')
}

// 开启webSocket
function StartWebSocket () {
  var url = 'ws://localhost:9000/'
  if ('WebSocket' in window) {
    ws = new WebSocket(url)
  }
  else if ('MozWebSocket' in window) {
    ws = new MozWebSocket(url)
  }
  ws.onopen = function () {
    ws.binaryType = 'arraybuffer'
    m_isConnectWS = true
    sendWsMessage('IsInit') //初始化
    m_closed = false
  }
  ws.onmessage = function (evt) {
    if (typeof(evt.data) == 'string') {
      var str = evt.data
      if (str.length <= 0) {
        return
      }
      if (str.indexOf('imageHWS') >= 0) {
        var strs = new Array() //定义一数组
        strs = str.split(m_splitTag) //字符分割
        setCanvasImageSize(strs[1], strs[2], strs[3])
      } else {
        handleEveryMessage(str)
        console.log(str)
      }
    } else {
      // var bytearray = new Uint8Array(evt.data);
      //setCavasImage(bytearray);
      // var b64encoded = btoa(Uint8ToString(bytearray));
      // setImageWithBase64(b64encoded);
    }
  }
  ws.onclose = function () {
    m_isConnectWS = false
    clearInterval(timOut)
    alert('连接中断')
  }
}

function sendWsMessage (msg) {
  ws.send(msg)
}

function handleEveryMessage (str) {
  if (str.indexOf('imageData') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag) // 分割设备名称
    // alert(strs[1]);
    setImageWithBase64(strs[1])
    return
  }
  if (str == 'IsInit_true') {
    alert('初始化成功')
  }
  else if (str == 'IsInit_false') {
    alert('初始化失败')
  }
  else if (str == 'open_true') {
    sendWsMessage('GetResolutionCount')
    sendWsMessage('GetResolution')
    sendWsMessage('GetMediaTypeCount')
    sendWsMessage('GetMedia')
    startShowUI()
  }
  else if (str.indexOf('DeviceName') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag) // 分割设备名称
    configureDevInfo(strs)
  } else if (str.indexOf('ResoultionName') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag) // 分割分辨率
    configureRestionInfo(strs)
  } else if (str.indexOf('MediaName') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag) // 分割设备格式
    configureVideoStyle(strs)
  } else if (str.indexOf('Base64Info') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag)
    showBase64info(strs[1])
  } else if (str.indexOf('CaptureSuccess') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag)
    alert(strs[1])
  } else if (str.indexOf('viewFolderSuccess') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag)
    setSavePath(strs[1])
  } else if (str.indexOf('Error') >= 0) {
    var strs = new Array()
    strs = str.split(m_splitTag) //处理错误
    console.log(strs[1])
  } else if (str == 'close_true') {
    alert('关闭成功')
  } else if (str == 'close_false') {
    alert('关闭失败')
  } else if (str == 'open_runing') {
    alert('我被关了')
    m_closed = true
    //window.close();
    ws.close()
  }
  else {
    //console.log(str);
  }
}
