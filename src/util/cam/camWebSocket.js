//开启webSocket
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

    strs = str.split(m_splitTag) //分割设备名称
    //alert(strs[1]);
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

    strs = str.split(m_splitTag) //分割设备名称
    configureDevInfo(strs)


  } else if (str.indexOf('ResoultionName') >= 0) {

    var strs = new Array()

    strs = str.split(m_splitTag) //分割分辨率
    configureRestionInfo(strs)

  } else if (str.indexOf('MediaName') >= 0) {

    var strs = new Array()

    strs = str.split(m_splitTag) //分割设备格式
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


