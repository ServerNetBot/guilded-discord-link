import {Client} from 'guilded.js';
import {Client as DClient} from 'discord.js';
import { DTOKEN, TOKEN, DiscordID, GuildedID } from './config';
const client = new Client({token: TOKEN});
const dclient = new DClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"]
})

client.on("ready", () => {
    console.log("Bot logged in!");
});

client.on("messageCreated", (message) => {
    if(message.author?.type == 0) return;
    if(message.channelId != GuildedID) return;
    const c = dclient.channels.cache.get(DiscordID)
    if(!c || c.type !== 0) return;

    c.send(message.content);
});

dclient.on("messageCreate", (message) => {
    if(message.channelId !== DiscordID) return;
    if(message.author.bot) return;
    client.channels.fetch(GuildedID).then(channel => {
        console.log(channel.name);
        channel.send(message.content);
    }).catch(e => console.log(e));
})

client.login();
dclient.login(DTOKEN);
