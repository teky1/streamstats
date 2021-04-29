const key_input = document.getElementById("api_key");
const generate_button = document.getElementById("generate_button");
const message1 = document.getElementById("message");
const message2 = document.getElementById("secondMessage");

generate_button.addEventListener("click", event => {
  let key = key_input.value;
  if(key.length!=36){
    message1.style.color = "red";
    message1.innerHTML = "<i>Invalid API Key</i>";
    return
  }
  $.getJSON("https://api.hypixel.net/key?key="+key, data => {
    if(!data.success){
      message1.style.color = "red";
      message1.innerHTML = "<i>Invalid API Key</i>";
    } else {
      message1.style.color = "green";
      message1.innerHTML = "<i>Valid API Key</i>";
      message2.innerHTML = "Use the following link in an OBS browser source<br><br>"+
      window.location.href+"source.html?"+key+"<br><br>"+
      "<i>Note: Make sure the dimensions are set to X x Y</i>";
    }
  });

});
