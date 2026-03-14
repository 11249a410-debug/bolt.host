let chart;

function generatePlan(){

let subjects=document.getElementById("subjects").value.split(",");

let hours=document.getElementById("hours").value;

let table=document.querySelector("#studyTable tbody");

table.innerHTML="";

let time=Math.floor(hours/subjects.length);

let subjectNames=[];

subjects.forEach(subject=>{

let clean=subject.trim();

subjectNames.push(clean);

let row=

`<tr>
<td>${clean}</td>
<td>${time} hrs</td>
<td><input type="checkbox" onclick="updateProgress()"></td>
</tr>`;

table.innerHTML+=row;

});

generateChart(subjectNames,time);

recommendations(hours);

localStorage.setItem("subjects",subjects);
localStorage.setItem("hours",hours);

}

function generateChart(subjects,time){

let ctx=document.getElementById("studyChart");

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{

type:'pie',

data:{

labels:subjects,

datasets:[{

data:Array(subjects.length).fill(time)

}]

}

});

}

function updateProgress(){

let boxes=document.querySelectorAll("input[type='checkbox']");

let total=boxes.length;

let completed=0;

boxes.forEach(box=>{

if(box.checked){
completed++;
}

});

let percent=Math.round((completed/total)*100);

document.getElementById("scoreBox").innerText=percent+"% Productive";

}

function recommendations(hours){

let message="";

if(hours<2){

message="Increase study hours for better progress.";

}

else if(hours<5){

message="Good schedule. Stay consistent.";

}

else{

message="Excellent dedication. Remember to take breaks.";

}

document.getElementById("advice").innerText=message;

}

function generateWeekly(){

let subjects=document.getElementById("subjects").value.split(",");

let hours=document.getElementById("hours").value;

let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

let plan="";

days.forEach(day=>{

plan+="<b>"+day+"</b><br>";

subjects.forEach(subject=>{

plan+=subject.trim()+" - "+(hours/subjects.length).toFixed(1)+" hrs<br>";

});

plan+="<br>";

});

document.getElementById("weeklyPlan").innerHTML=plan;

}

function toggleDark(){

document.body.classList.toggle("dark");

}

function downloadPlan(){

let element=document.getElementById("studyTable");

html2pdf().from(element).save("study_plan.pdf");

}

let time=1500;

let timer;

function startTimer(){

timer=setInterval(function(){

let minutes=Math.floor(time/60);

let seconds=time%60;

if(seconds<10){
seconds="0"+seconds;
}

document.getElementById("timer").innerHTML=minutes+":"+seconds;

time--;

if(time<=0){

clearInterval(timer);

alert("Study session completed!");

}

},1000);

}

function pauseTimer(){

clearInterval(timer);

}

function resetTimer(){

clearInterval(timer);

time=1500;

document.getElementById("timer").innerHTML="25:00";

}

window.onload=function(){

document.getElementById("subjects").value=
localStorage.getItem("subjects")||"";

document.getElementById("hours").value=
localStorage.getItem("hours")||"";

}
