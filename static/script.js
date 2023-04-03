
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
                    v.setAttribute("href", video["videos"][i]["url"] + "&title=" + encodeURIComponent(video["title"]));
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
    diframe.src = val;
}