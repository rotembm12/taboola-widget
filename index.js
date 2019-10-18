function init(){
    const d = document;
    fetchTaboolaData.then(response => {
        return response.json();
    }).then(data => {
        data.list.forEach(item => {
            console.log(item)
            const thumbnail = d.createElement('div');
            thumbnail.classList.add('thumbnail');
            // thumbnail.innerHTML = generateThumbnailContent(item);
            thumbnail.addEventListener('click',() => {
                location.href = item.url;
            });

            const img = d.createElement('img');
            img.src = item.thumbnail[0].url;
            img.classList.add('img-thumbnail');

            const brandingPara = d.createElement('p');
            brandingPara.innerText = item.branding;
            brandingPara.classList.add('branding-thumbnail');

            const titlePara = d.createElement('p');
            titlePara.innerText = item.description;
            titlePara.classList.add('title-thumbnail');
            
            const pWrap = d.createElement('div');
            pWrap.classList.add('title-wrap');
            pWrap.appendChild(titlePara);

            thumbnail.appendChild(img);
            thumbnail.appendChild(brandingPara);
            thumbnail.appendChild(pWrap);
            d.getElementById('root').appendChild(thumbnail);
            
            // while(titlePara.scrollHeight > pWrap.clientHeight){
            //     let text = titlePara.innerText;
            //     titlePara.innerText = text.substring(0, text.length - 5) + '...'
            // }
        })
    })
}

const fetchTaboolaData = fetch("https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init");

function outerHeight(el) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

const generateThumbnailContent = function(thumbnailObject) {
    const {name, branding, thumbnail} = thumbnailObject;
    return `<img src="${thumbnail[0].url}" class="img-thumbnail" />
            <h6 class="title-thumbnail">${thumbnailObject.description}</h6>
            <p class="branding-thumbnail">${branding}</p>`;
}
