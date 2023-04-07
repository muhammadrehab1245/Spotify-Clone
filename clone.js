const songs=[
    {songname:'Jehda Nasha',songpath:'songs/1.mp3',songimg:'songimages/1.jpg',songmins:'3:42'},
    {songname:'Kesariya',songpath:'songs/2.mp3',songimg:'songimages/2.jpg',songmins:'4:28'},
    {songname:'Ghere',songpath:'songs/3.mp3',songimg:'songimages/3.jpg',songmins:'3:28'},
    {songname:'Apna-Bana-Le',songpath:'songs/4.mp3',songimg:'songimages/4.jpg',songmins:'3:24'},
    {songname:'Electric Katy Perry',songpath:'songs/5.mp3',songimg:'songimages/5.jpg',songmins:'3:13'},
    {songname:'Fake A Smile',songpath:'songs/6.mp3',songimg:'songimages/6.jpg',songmins:'2:48'},
    {songname:'Forget-Me',songpath:'songs/7.mp3',songimg:'songimages/7.jpg',songmins:'7:15'},
    {songname:'Ice-On-My-Baby',songpath:'songs/8.mp3',songimg:'songimages/8.jpg',songmins:'2:59'},
    {songname:'Khoya Khoya',songpath:'songs/9.mp3',songimg:'songimages/9.jpg',songmins:'5:17'},
    {songname:'Whoopty',songpath:'songs/10.mp3',songimg:'songimages/10.jpg',songmins:'2:03'}
]

// for iterating songs array to write text in htmlfile
songs.forEach((songobj,i) => {
    document.getElementsByClassName('namehead')[i].innerHTML=songobj.songname
    document.getElementsByClassName('imgsrc')[i].src=songobj.songimg
    document.getElementsByClassName('durationhead')[i].innerHTML=songobj.songmins
});

let playstatus=document.getElementById('playstatus')
let songslist=document.getElementById('songs-list')
let namehead=document.getElementsByClassName('namehead')
let songprogress=document.getElementById('songprogress')
let gif=document.getElementById('maingif')
let songindex=0;

let currentsong=new Audio(songs[0].songpath)
let currsong=document.getElementById('currsong')
currsong.innerHTML=songs[0].songname
let playicon=Array.from(document.getElementsByClassName('playicon'))
playicon[songindex].classList.add('currentplay')

// for icons change while changing the songs
const iconschange=(playstatus,songid,removing,adding,currplay)=>{
    if (currplay!==null) {
    songid.classList.add(currplay)
    }
    playstatus.classList.remove(`fa-${removing}-circle`)
    playstatus.classList.add(`fa-${adding}-circle`)
   songid.classList.remove(`fa-${removing}-circle-o`)
    songid.classList.add(`fa-${adding}-circle-o`)
}

// while switching to next/prev or other songs the prev icons should be change
const previcons=(icons)=>{
    icons.classList.remove("fa-pause-circle-o",'currentplay')
    icons.classList.add("fa-play-circle-o")
}

// playing(maybe first song in list) and playing/pause

playstatus.addEventListener('click',(e)=>{
    if (!currentsong.paused ) {
         iconschange(playstatus,playicon[songindex],"pause","play",null)
        currentsong.pause();
        gif.style.opacity=0;
    }
    else if(currentsong.paused || currentsong.currentTime >=0){
        iconschange(playstatus,playicon[songindex],"play","pause",null)
        currentsong.play();
        gif.style.opacity=1;
    }
})

// starting new songs
songslist.addEventListener('click',(e)=>{
    let element=e.target.parentElement.previousElementSibling
    if (e.target.classList.contains('playicon')) {
      let songid=e.target
      if (element.firstElementChild.innerText===currsong.innerText) {
             if (!currentsong.paused) {
            currentsong.pause();
            gif.style.opacity=0;
            iconschange(playstatus,songid,"pause","play",null)
        }
        else if(currentsong.paused || currentsong.currentTime >=0){
            currentsong.play();
            gif.style.opacity=1;
            iconschange(playstatus,songid,"play","pause",null)
        }
      }
      else if(element.firstElementChild.innerText!==currsong.innerText){
        for (let index = 0; index < songs.length; index++) {
            if (songs[index].songname===element.firstElementChild.innerText) {
                var targetsong=songs[index]
                songindex=index;
                break;
            }
        }
        for (const icons of playicon) {
            if (icons.classList.contains('currentplay')) {
                previcons(icons)
                break;
            }
        }
           currentsong.src=targetsong.songpath
           currsong.innerHTML=element.firstElementChild.innerText
            currentsong.play();
            iconschange(playstatus,songid,"play","pause",'currentplay')
            gif.style.opacity=1;
      }
    }
})

// next and prev
// next logic
document.getElementById('next').addEventListener('click',(e)=>{
    console.log(songindex)
   if (songindex < 9) {   
for (const icons of playicon) {
    if (icons.classList.contains('currentplay')) {
       previcons(icons)
                break;
    }
}
    songindex+=1;
    iconschange(playstatus,playicon[songindex],"play","pause",'currentplay')
   currsong.innerHTML=songs[songindex].songname
    currentsong.src=songs[songindex].songpath
    currentsong.play()

}

else{
    for (const icons of playicon) {
        if (icons.classList.contains('currentplay')) {
            previcons(icons)
            break;
        }
    }
    songindex=0;
        iconschange(playstatus,playicon[songindex],"play","pause",'currentplay')
   currsong.innerHTML=songs[songindex].songname
    currentsong.src=songs[songindex].songpath
    currentsong.play()
}

})

// previous logic

document.getElementById('prev').addEventListener('click',(e)=>{
    console.log(songindex)
   if (songindex > 0) {   
for (const icons of playicon) {
    if (icons.classList.contains('currentplay')) {
       previcons(icons)
       break;
    }
}
    songindex-=1;
        iconschange(playstatus,playicon[songindex],"play","pause",'currentplay')
   currsong.innerHTML=songs[songindex].songname
    currentsong.src=songs[songindex].songpath
    currentsong.play()

}

else{
    for (const icons of playicon) {
        if (icons.classList.contains('currentplay')) {
            previcons(icons)
                break;
        }
    }
    songindex=9;
        iconschange(playstatus,playicon[songindex],"play","pause",'currentplay')
   currsong.innerHTML=songs[songindex].songname
    currentsong.src=songs[songindex].songpath
    currentsong.play()
}
})

// for updating progress

songprogress.addEventListener('change',()=>{
    currentsong.currentTime=songprogress.value * currentsong.duration / 100
})

// for running progress

currentsong.addEventListener('timeupdate',()=>{
    songprogress.value=parseInt((currentsong.currentTime/currentsong.duration)*100)
})
