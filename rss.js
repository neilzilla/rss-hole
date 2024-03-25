

function main(){
    return {
        all_feeds: [],
        init_feeds: [],
        async init(){
            let all_data = await browser.storage.local.get(null);
            if(all_data.feeds) this.all_feeds = all_data.feeds

            console.log('feeds loaded', this.all_feeds)
            console.log('init feeds', this.init_feeds)

            this.init_feeds = JSON.stringify(this.all_feeds)

            this.find_wp_feeds()

            if(this.init_feeds !== JSON.stringify(this.all_feeds)){
                console.log('feeds updated, saving')
                await browser.storage.local.set({feeds: this.all_feeds});
            }

        },
        add_feed(title, url){
            console.log('adding feed', url)
            const found = this.all_feeds.find(i => i.url == url)
            if(found){
                console.log('feed already logged, return')
                return
            }
        
            this.all_feeds.push({
                title,
                url
            })
        },
        find_wp_feeds(){
            const feeds = document.querySelectorAll('link[type="application/rss+xml"]')
            feeds.forEach(i => this.add_feed(i.title, i.href))
        }
    }

}






window.rsshole = main()
window.rsshole.init()

