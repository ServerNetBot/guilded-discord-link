import {Client} from 'guilded.js';
import {Client as DClient} from 'discord.js';
import { DTOKEN, TOKEN, DiscordID, GuildedID, RevoltChannelID, RTOKEN } from './config';
import {Client as RClient} from 'revchatapi';
const client = new Client({token: TOKEN});
const dclient = new DClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"]
});
const rclient = new RClient(RTOKEN);

client.on("ready", () => {
    console.log("Bot logged in!");
});

client.on("messageCreated", (message) => {
    if(message.author?.type == 0) return;
    if(message.channelId != GuildedID) return;
    const c = dclient.channels.cache.get(DiscordID)
    if(!c || c.type !== 0) return;

    c.send(message.content);
    rclient.sendToChannel(RevoltChannelID, {content: message.content});
});

dclient.on("messageCreate", (message) => {
    if(message.channelId !== DiscordID) return;
    if(message.author.bot) return;
    client.channels.fetch(GuildedID).then(channel => {
        console.log(channel.name);
        channel.send(message.content);
    }).catch(e => console.log(e));

    rclient.sendToChannel(RevoltChannelID, {content: message.content});
});

rclient.on("message", (message) => {
    if(message.channel.id !== RevoltChannelID) return;
    if(message.author.isBot) return;

    const c = dclient.channels.cache.get(DiscordID)
    if(!c || c.type !== 0) return;
    client.channels.fetch(GuildedID).then(channel => {
        console.log(channel.name);
        channel.send(message.content);
    }).catch(e => console.log(e));
    c.send(message.content);
})

client.login();
dclient.login(DTOKEN);