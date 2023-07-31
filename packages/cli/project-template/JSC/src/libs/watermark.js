let watermark = {}

let setWatermark = (str) => {
    let id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    can.width = 160
    can.height = 180

    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '14px Vedana'
    cans.fillStyle = 'rgba(185,185,185,0.4)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 16, can.height / 2)

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '70px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '100'
    div.style.width = document.documentElement.clientWidth - 10 + 'px'
    div.style.height = document.documentElement.clientHeight - 100 + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str)
        }
    }, 500)
    window.onresize = () => {
        setWatermark(str)
    }
}

export default watermark