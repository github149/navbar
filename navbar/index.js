const hashMap = JSON.parse(localStorage.getItem('array')) || [{ logo: "R", url: "https://www.ruanyifeng.com/" }]
let $addCard = $('#siteList .addCard')
let $siteList = $('#siteList').find('ul')
    //根据表单渲染页面

let render = () => {
    //移除原来的元素
    $('#siteList').find('li:not(.addCard)').remove()
    hashMap.forEach((item, index) => {
        $li = $(`<li>
        <a href="javascript:void(0)" class="cardList">
            <div id="logo">${item.logo.toUpperCase()}</div>
            <div id="text">
                ${cutUrl(item.url)}
            </div>
            
            <svg class="icon close">
                <use xlink:href="#icon-guanbi"></use>
            </svg>
        </a>
    </li>`)
        $addCard.before($li)
        $li.click(function(e) {
            window.open(item.url)
        })
        $li.on('click', '.close', function(e) {
            hashMap.splice(index, 1)
            render()
            e.stopPropagation()

        })

    })
}
let cutUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
}


render()


//键盘按键输入网址
$(document).on('keydown', (e) => {
        const { key } = e
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url)
            }
        }
    })
    //关闭

$addCard.on('click', () => {
    let res = window.prompt('请输入要添加的网址？')
    if (!res) {
        return
    }
    hashMap.push({
        logo: cutUrl(res)[0],
        url: res
    })
    render()
})

window.onbeforeunload = () => {
    //清理搜索框中文字
    $('#searchInput').val('')
    localStorage.setItem('array', JSON.stringify(hashMap))
    render()
}
let changeImg = () => {
    if ($(window).width() > 580) {
        let num = parseInt(Math.random() * 4 + 1)
        document.body.style.background = `url('./images/${num}.jpg')`
    } else {
        document.body.style.background = '#ddd'
    }
}
window.onload = function() {
    changeImg()
}
window.onresize = function() {
    changeImg()

}