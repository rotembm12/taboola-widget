function init(){
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident|Edge\//.test(ua);
    var d = document;
    var itemCounter = 1;
    var xhr = new XMLHttpRequest()
    xhr.open('GET','https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init')
    xhr.onload = function (){
        var response = JSON.parse(xhr.response);
        var data = response.list;
        data.forEach(function(item) {
            console.log(item)
            var thumbnail = d.createElement('div');
            thumbnail.classList.add('thumbnail');

            var img = d.createElement('img');
            img.src = item.thumbnail[0].url;
            img.classList.add('img-thumbnail');

            var brandTitle = d.createElement('h5');
            brandTitle.innerText = item.branding;
            brandTitle.classList.add('branding-thumbnail');

            var titlePara = d.createElement('p');
            titlePara.innerText = item.name;
            titlePara.classList.add('title-thumbnail');
            
            var clampSpan = d.createElement('span');
            clampSpan.classList.add('clamp');
            clampSpan.innerText = "...";
            clampSpan.style.visibility = 'hidden';

            var pWrap = d.createElement('div');
            pWrap.classList.add('title-wrap');

            pWrap.appendChild(clampSpan);
            pWrap.appendChild(titlePara);
            
            thumbnail.appendChild(img);
            if(item.categories[0]){
                var categories = d.createElement('h5');
                categories.innerText = item.categories.join(', ');
                categories.classList.add("category");
                thumbnail.appendChild(categories);
            }
            
            thumbnail.appendChild(pWrap);
            thumbnail.appendChild(brandTitle);
            thumbnail.addEventListener('click',function() {
                location.href = item.url;
            });

            
            
            if ( isIE ) {
            //IE & Edge specific code goes here
            thumbnail.classList.add('grid-item');
            thumbnail.id = "cell" + itemCounter;
            itemCounter++;
            } else{
                var observer = new ResizeObserver (function() {
                    if(titlePara.scrollHeight > pWrap.clientHeight){
                        if(clampSpan.style.visibility !== "visible"){
                            clampSpan.style.visibility = "visible";
                            console.log('changed the visibility');
                        }
                    } else {
                        if(clampSpan.style.visibility !== "hidden") {
                            clampSpan.style.visibility = "hidden"
                        }
                    }
                })
                observer.observe(pWrap);
            }

            d.getElementById('root').appendChild(thumbnail);         
            if(titlePara.scrollHeight > pWrap.clientHeight){
                clampSpan.style.visibility = "visible";
            }
        })
    }
    xhr.send()
}


