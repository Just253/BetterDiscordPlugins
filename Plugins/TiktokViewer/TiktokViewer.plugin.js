/**
 * @name TiktokViewer
 * @author Just253
 * @description You can watch tiktok on discord by clicking the links inside the embeds
 * @version 0.0.1
 * @authorId 328640767415418893
 * @authorLink https://github.com/Just253
 * @source https://github.com/Just253/BetterDiscordPlugins/tree/main/Plugins/TiktokViewer
 * @updateUrl https://raw.githubusercontent.com/Just253/BetterDiscordPlugins/main/Plugins/TiktokViewer/TiktokViewer.plugin.js
 */

const request = require("request");
async function getNumber(link,div){
    options = {
        "url":`https://linkunshorten.com/api/link?url=${link}`,// you can modify this with another link expander api
        "headers":{
            "user-agent": "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
        }
    }
    if(link.startsWith("https://vm.tiktok.com")) return get(options,div) // if it returns error simply nothing happens
    return embed(div,link.match(/\d{19}/g)[0])
}
async function get(o,div){
        await request.get(o, (error, response, body) => {
            if(error && !body) return BdApi.alert(`ERROR`,error)
            embed(div,body.match(/\d{19}/g)[0])
        });
}
async function embed(div,id){
    var html_tiktok = `<blockquote class="tiktok-embed" cite="" data-video-id="${id}" ><section> <a target="_blank" title="" href="https://www.tiktok.com/@user">   </a> <a target="_blank" title="" href="https://www.tiktok.com/tag/title"> </a> <a target="_blank" title="" href="https://www.tiktok.com/music/XXXXX"> </a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`
    const iframe = document.createElement("iframe");
    iframe.setAttribute("class", "TiktokViewer");
    iframe.setAttribute("srcdoc", html_tiktok);
    iframe.setAttribute("width", "340rem");
    iframe.setAttribute("height", "810rem");
    iframe.setAttribute("id","TiktokViewer")
    div.appendChild(iframe) 
}

module.exports = class TiktokViewer {
                event(e) {
                    if(!e.target.href) return;
                    if(e.target.localName == "a" && e.target.href.includes("tiktok.com") && e.target.href != "https://www.tiktok.com") {
                        let url = e.target.href
                        var div = e.target.closest(`div[class^="embedWrapper"]`);
                        if(!div) return console.log("Not embed");
                        e.preventDefault();
                        getNumber(url,div)
                    }
                }
                start() {
                    document.addEventListener("click", this.event);
                }
                stop() {
                    document.removeEventListener("click", this.event);
                }
            }
        
