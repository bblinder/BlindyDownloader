
_afterBefore = "before";

// ========================= INITIALIZE =============================
document.addEventListener('DOMContentLoaded', (event) => {
    // document.getElementById("spiner").style.display = "none";
    // document.getElementById("cards").firstElementChild.style.display = "none";
    document.getElementById("after").style.setProperty('display', 'none', 'important');
    document.getElementById("before").style.setProperty('display', 'flex', 'important');
    document.getElementById("searchButton").addEventListener("click", function (event) {
        SendReq();
    });


});




// ========================= SEARCH =============================
function SendReq() {
    urlInput = document.getElementById("urlInput").value;

    if (urlInput.length == 0) {
        alert("Please enter a user or org name");
        return;
    }
    else {
        document.getElementById(_afterBefore).getElementsByClassName("spiner")[0].style.display = "block";
        document.getElementById(_afterBefore).getElementsByTagName("button")[0].style.display = "none";

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", '/dv', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            value: urlInput
        }));

        // //clear the cards
        // var cardParent = document.getElementById("cards");
        // let cardsCount = cardParent.children.length;
        // for (let i = 1; i < cardsCount; i++) {
        //     cardParent.children[1].remove();
        // }

        xhr.onload = function () {
            document.getElementById(_afterBefore).getElementsByClassName("spiner")[0].style.display = "none";
            document.getElementById(_afterBefore).getElementsByTagName("button")[0].style.display = "block";
            if (_afterBefore == "before") SwitchOptions("after");
            console.log(xhr.response);

            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                document.getElementById("noresult").style.display = "block";
            } else {




                video = xhr.response;
                var cardParent = document.getElementById("cards");
                var card = document.getElementsByClassName("card")[0];
                var clone = card.cloneNode(true);

                //clear the cards
                let cardsCount = cardParent.children.length;
                for (let i = 1; i < cardsCount; i++) {
                    cardParent.children[1].remove();
                }

                clone.style.display = "block";
                clone.getElementsByClassName("title")[0].innerHTML = video["title"];
                clone.getElementsByClassName("thumbnail0")[0].src = video["thumbnail"];

                videoButton = clone.getElementsByClassName("videoButton")[0];
                videoButton.style.setProperty("display", "none", "important");
                videosParent = clone.getElementsByClassName("videos")[0];
                for (let i = 0; i < video["videos"].length; i++) {
                    var v = videoButton.cloneNode(true);
                    v.style.setProperty("display", "inline-block", "important");
                    v.setAttribute("href", video["videos"][i]["url"] + "&title=%D8%A7%D9%84%D9%81%D9%8A%D9%84%D9%85%20%D8%A7%D9%84%D9%88%D8%AB%D8%A7%D8%A6%D9%82%D9%8A%20%7C%7C%20%D8%B1%D8%AD%D9%84%D8%A9%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B9%D8%B1");
                    v.innerHTML = video["videos"][i]["ext"] + "  " + video["videos"][i]["resolution"] + "  " + video["videos"][i]["filesize"];
                    videosParent.appendChild(v);
                }

                audioButton = clone.getElementsByClassName("audioButton")[0];
                audioButton.style.setProperty("display", "none", "important");
                audiosParent = clone.getElementsByClassName("audios")[0];
                for (let i = 0; i < video["audios"].length; i++) {
                    var a = audioButton.cloneNode(true);
                    a.style.setProperty("display", "inline-block", "important");
                    a.setAttribute("href", video["audios"][i]["url"]);
                    a.innerHTML = video["audios"][i]["ext"] + "  " + video["audios"][i]["abr"] + "  " + video["audios"][i]["filesize"];
                    audiosParent.appendChild(a);
                }
                cardParent.appendChild(clone);

            }
        }
    }
}


function SwitchOptions(afterBefore) {
    _afterBefore = afterBefore;
    afterBefore = afterBefore == "after" ? "before" : "after";
    document.getElementById(afterBefore).style.setProperty('display', 'none', 'important');
    document.getElementById(afterBefore).getElementsByTagName("button")[0].removeAttribute("id");
    document.getElementById(afterBefore).getElementsByTagName("input")[0].removeAttribute("id");
    afterBefore = afterBefore == "after" ? "before" : "after";
    document.getElementById(afterBefore).style.setProperty('display', 'flex', 'important');
    document.getElementById(afterBefore).getElementsByTagName("button")[0].setAttribute("id", "searchButton");
    document.getElementById(afterBefore).getElementsByTagName("input")[0].setAttribute("id", "urlInput");

    document.getElementById(afterBefore).getElementsByTagName("button")[0].addEventListener("click", function (event) {
        SendReq();
    });
}




function changediframe(val) {
    console.log(val);
    console.log("changediframe");
    var diframe = document.getElementById("diframe");
    diframe.src = "https://rr2---sn-oxfgv1-xcal.googlevideo.com/videoplayback?expire=1657642837&ei=9ErNYtOrPI-D-gbEhJnACg&ip=130.193.232.27&id=o-AEDsSLpJd16y0nNkmCKjhfms1N6Sz8Sss_ICFxpGYyCw&itag=22&source=youtube&requiressl=yes&mh=rK&mm=31%2C29&mn=sn-oxfgv1-xcal%2Csn-nv47lnl7&ms=au%2Crdu&mv=m&mvi=2&pl=21&initcwndbps=317500&vprv=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=768.255&lmt=1595589844889193&mt=1657620787&fvip=1&fexp=24001373%2C24007246&c=ANDROID&txp=5432432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgasIpfzIkTJn7ZPb6FfzURjpkJ0S6inro7rU9XklV33sCIQD-pZtjwFEyfceej86ylosel4_hXzuCgENXXnR853DEwQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhALwmDmvfA_v_XDRAk4v63k36zMsVforFy1-zqbiRfot9AiEAkcgq6ZfyqG-bjAAzEkNo0gc6PcOtwdOZ5fA95pXCjK0%3D";
}