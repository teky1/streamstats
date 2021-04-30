const api_key = window.location.search.substring(1,window.location.search.length);
const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
const scoreboard_color = "rgba(0, 0, 0, 0.333)";
const px = 5;
let uuid;
canvas.width = 650;
canvas.height = 375;

let ogWins, ogLosses, ogBeds, ogFinals;
let wins = 0;
let losses = 0;
let beds = 0;
let finals = 0;
let player = "";
let seconds = 0;
let formattedTime = "0:00:00"

$.getJSON("https://api.hypixel.net/key?key="+api_key, data => {
  uuid = data.record.owner;
  $.getJSON("https://api.hypixel.net/player?key="+api_key+"&uuid="+uuid, player_data => {
    player = player_data.player.displayname;
    ogWins = player_data.player.stats.Bedwars.wins_bedwars;
    ogLosses = player_data.player.stats.Bedwars.losses_bedwars;
    ogBeds = player_data.player.stats.Bedwars.beds_broken_bedwars;
    ogFinals = player_data.player.stats.Bedwars.final_kills_bedwars;
  });
});

function formatTime(){
  let h = 0;
  let m = 0;
  let s = 0;
  h = Math.floor(seconds/3600);
  m = Math.floor((seconds - h * 3600)/60);
  s = seconds-h*3600-m*60;
  formattedTime = h+":"+lz(2, m)+":"+lz(2, s);
}
// Leading zeroes
function lz(targetDigits, value){
  let x = value.toString();
  for(let i = 0; i < targetDigits - x.length; i++){
    x = "0"+x;
  }
  return x;
}

ctx.fillStyle = scoreboard_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = scoreboard_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = "#FCFF54";
  ctx.font = 10*px+"px Cascadia Mono";
  ctx.fillText("Stream Stats", 4*px, 13*px);
  // Labels
  ctx.fillStyle = "#FFFFFF";
  ctx.font = 9*px+"px Cascadia Mono";
  ctx.fillText("Player:", 7*px, 26*px);
  ctx.fillText("Wins:", 7*px, 38*px);
  ctx.fillText("Beds:", 7*px, 50*px);
  ctx.fillText("Tracking for:", 4*px, 62*px);
  ctx.fillText("Losses:", 64*px, 37*px);
  ctx.fillText("Finals:", 64*px, 50*px);

  // Values
  ctx.fillStyle = "#6CF97C";
  ctx.fillText(player, 47*px, 26*px);
  ctx.fillText(wins, 40*px, 38*px);
  ctx.fillText(beds, 40*px, 50*px);
  ctx.fillText(formattedTime, 76*px, 62*px);
  ctx.fillText(losses, 107*px, 37*px);
  ctx.fillText(finals, 107*px, 50*px);

  // Plug
  ctx.fillStyle = "#4F69FF";
  ctx.font = 6*px+"px Cascadia Mono";
  ctx.fillText("teky1.github.io/streamstats", 30*px, 72*px);

  seconds++;
  formatTime();
  if(seconds%3==0){
    $.getJSON("https://api.hypixel.net/player?key="+api_key+"&uuid="+uuid, player_data => {
      wins = player_data.player.stats.Bedwars.wins_bedwars-ogWins;
      losses = player_data.player.stats.Bedwars.losses_bedwars-ogLosses;
      beds = player_data.player.stats.Bedwars.beds_broken_bedwars-ogBeds;
      finals = player_data.splayer.stats.Bedwars.final_kills_bedwars-ogFinals;
    });
  }
}, 1000);
