var openid = 48734;
//获取openid;
function getParam(){
    var url=location.search.substr(1);
    var obj={};
    if(!url) return false;
    var  arr= url.split("&");
    for(var i=0,len=arr.length;i<len;i++){
        var params=arr[i].split("=");
        obj[params[0]]=decodeURI(params[1]);
    }
    return obj;
}

(function(){
    var code=getParam();
    openid=code.code;
    $("#abc").text(location)
})()
//输入框聚焦弹层效果
$("#numr").on("focus", function () {
        $("#link").css("margin-bottom", "400px");
        $("#main").scrollTop(250);
        $("#mes").css("opacity", "1")
    }).on("blur", function () {
        $("#link").css("margin-bottom", "0px");
        $("#main").scrollTop(0);
        $("#mes").css("opacity", "0")
    })
    //首页点击进入游戏
$("#go").click(function () {
        $.ajax({
            url: "http://192.168.218.199/CodeIgniter/index.php/api/Game/status?openid=" + openid + "",
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                if (data.status == 0) {
                    $(".tt").hide()
                    $(".second").show();
                } else if (data.status == 1) {
                    $(".tt").hide();
                    $(".no").show();
                    times = data.times;
                    if (times == 0) {
                        $("#nobtn").text("游戏已结束");
                        $("#alert").show();
                        $("#ms").show();
                    }
                    $("#nobtn").text("还有" + txtarr[times] + "次机会");
                    return times;
                } else if (data.status == 2) {
                    $(".tt").hide();
                    $(".yes").show();
                    prize = ls.getItem("prize");
                    $("#prize").text(prize);
                }
            }
        })
    })
    //所有图片拼接的数组
var imgarr1 = [98911, 17275, 96868, 72622, 96521, 12353, 70302, 36802, 89765, 92837, 62536, 98952, 92323, 23871, 83362, 78967, 12325, 12205, 12005, 97676],
    imgarr2 = [62536, 98952, 92323, 23871, 83362, 78967, 12325, 12205, 12005, 97676, 98911, 17275, 96868, 72622, 96521, 12353, 70302, 36802, 89765, 92837],
    times = 5,
    num1, idx, num2;
//点击所有问号图片
$("#imgall").one("click", "li", function () {
        idx = Math.round(Math.random() * 19);
        num1 = imgarr1[idx];
        num2 = imgarr2[idx];
        $.ajax({
            url: "http://192.168.218.199/CodeIgniter/index.php/api/Game/log?openid=" + openid + "&code=" + num1 + "",
            type: "get",
            dataType: "jsonp"
        })
        $("#numl").text(num1);
        $(this).find("img").attr("src", "./img/" + num1 + ".png");
        $("#imgl").attr("src", "./img/" + num1 + ".png");
        $("#imgr").attr("src", "./img/" + num2 + ".png");
    })
    //输入数字验证
$("#numr").on("input propertychange", function () {
        var value = $.trim($(this).val());
        if (value.length >= 5) {
            $(this).val(value.substr(0, 5));
            $.ajax({
                url: "http://192.168.218.199/CodeIgniter/index.php/api/Game/Verifycode/code1/" + num1 + "/openid/" + openid + "/code2/" + value + "",
                type: "get",
                dataType: "jsonp",
                success: function (obj) {
                    if (obj.status) {
                        $("#mes").show().text("匹配正确，点击提交进入游戏！")
                        times = obj.times;
                    } else {
                        $("#mes").show().text("输入错误，请您重新输入！")
                    }
                }
            })
        } else {
            $("#mes").hide()
        }
    })
    //点击提交按钮
$("#tijiao").on("click", function () {
        if ($("#mes").is(":visible") && $("#mes").text().length > 12) {
            $(".tt").hide();
            $(".third").show();
        }
    })
    //点击开始按钮
var txtarr = ["", "一", "二", "三", "四"],
    prize = "1224356",
    ls = window.localStorage;

$("#start").on("tap", function () {
        $.ajax({
            url: "http://192.168.218.199/CodeIgniter/index.php/api/Game/prize?openid=" + openid + "",
            type: "get",
            dataType: "jsonp",
            success: function (res) {
                if (res.status) {
                    $(".tt").hide();
                    $("#yes").show();
                    prize = res.prize;
                    $("#prize").text(prize);
                    ls.setItem("prize", prize);
                } else {
                    $(".tt").hide();
                    $("#no").show();
                    times--;
                    if (times == 0) {
                        $("#nobtn").text("游戏已结束");
                        setTimeout(function () {
                            $("#alert").show();
                            $("#ms").show();
                        }, 700)
                        return;
                    }
                    $("#nobtn").text("还有" + txtarr[times] + "次机会")
                }
            }
        })

    })
    //没中奖按钮
$("#nobtn").on("tap", function () {
    if ($(this).text() == "游戏已结束") {
        return false;
    }
    $(".tt").hide();
    $("#third").show();
})