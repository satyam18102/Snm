let img=document.querySelector(".img-1");
function white(){
    setTimeout(function h(){
    img.style.display="none";
},50);
setTimeout(function h(){
    img.style.display="flex";
},190);
}
setInterval(function ch(){
    white();
    img.src="/assets/nail.png";
},2500);
setInterval(function c(){
    white();
    img.src="/assets/ag.png";
},5000)