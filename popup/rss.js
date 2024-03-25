async function main(){

    let all_feeds = []

    let all_data = await browser.storage.local.get(null);

    if(all_data.feeds) all_feeds = all_data.feeds
    
    all_feeds.reverse()

    const list = document.getElementById('feeds')

    all_feeds.forEach(i => {

        
        const link = document.createElement('a')
        link.href = i.url
        link.innerText = i.title.toLowerCase()
        
        const feed = document.createElement('li')

        feed.appendChild(link)
        list.appendChild(feed)

    })

    document.addEventListener('click', function(ev){
        ev.preventDefault();
        if(ev.target.tagName == 'A') browser.tabs.create({ url: ev.target.href });
    })


}

main()
