import yt_dlp
import sys


def FilterData(ctx):
    title = ctx["title"]
    thumbnail = ctx["thumbnail"]

    formats = ctx["formats"]
    videosFormat = [f for f in formats if (f["vcodec"] != "none" and f["acodec"] != "none")]
    audiosFormat = [f for f in formats if (f["vcodec"] == "none" and f["acodec"] != "none")]
    videosFormatFiltered = []
    audiosFormatFiltered = []

    for v in videosFormat:
        a = dict()
        a["filesize"] = v["filesize"] if v["filesize"]!="none" else v["filesize_approx"]
        a["url"] = v["url"]
        a["resolution"] = v["resolution"]
        a["ext"] = v["ext"]
        videosFormatFiltered.append(a)

    for v in audiosFormat:
        a = dict()
        a["filesize"] = v["filesize"] if v["filesize"]!="none" else v["filesize_approx"]
        a["url"] = v["url"]
        a["ext"] = v["ext"]
        a["abr"] = v["abr"]
        audiosFormatFiltered.append(a)

    return {
        'title': title,
        'thumbnail': thumbnail,
        'videos' : videosFormatFiltered,
        'audios' : audiosFormatFiltered,
    }


def GetDownloadOptions(url):
    ydl_opts = {}
    info = ""
    baseData = ""
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        baseData=FilterData(info)
    print(baseData)
    return baseData


if __name__=="__main__":
    GetDownloadOptions(sys.argv[1])