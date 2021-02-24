import FrontPage from "./lib/FrontPage/FrontPage";

export default async function HelpHandle (msg: any) {
    let embed = FrontPage.getFrontHelpPageEmbed()
    msg.channel.send({ embed: embed })
    return true
}