const { Telegraf } = require("telegraf");
const TOKEN = "CHANGE with your token";
const bot = new Telegraf(TOKEN);
const Redis = require('ioredis');

const web_link = "CHANGE with your host";



bot.start((ctx) => {
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  });
  
  const redisClient = new Redis();
  redisClient.subscribe('message_channel');
  redisClient.on('message', (channel, message) => {
    const parsedMessage = JSON.parse(message);
    const { text } = parsedMessage;
    bot.telegram.sendMessage(ctx.chat.id, text);
  });
});





bot.launch();