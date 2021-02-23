export default abstract class AbstractEmbed {
    title: string
    description: string
    color: string | number
    thumbnail: any
    
    getDiscordEmbed () {
        return { 
            embed: this
        }
    }
}