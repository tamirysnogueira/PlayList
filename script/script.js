let imgFaixas = document.getElementById('imgFaixas')
let musica = document.getElementById('musica')
let musicasDisponiveis = document.getElementById('musicasDisponiveis')
let nomeMusicaPlayer = document.getElementById('nomeMusicaPlayer')
let duracaoInicial = document.getElementById('duracaoInicial')
let duracaoFinal = document.getElementById('duracaoFinal')
let imagemVolume = document.getElementById('imagemVolume')
let barra_volume = document.getElementById('barra_volume')
let tocandoAgora = document.getElementById('tocandoAgora')
let principal = document.getElementById('principal')
let audio = document.getElementById('audio')
let imgPause = document.getElementById('pause')
let pauseImg = document.getElementById('pauseImg')
var timer
let volume = document.getElementById('Volume')
let tempoMusica = document.getElementById('tempoMusica')

imagemVolume.addEventListener('mouseover', ()=>{
    barra_volume.style.opacity = 100
})

barra_volume.addEventListener('mouseleave', ()=> {
    barra_volume.style.opacity = 0
})

let infoFaixas = [
    {
        nomeMusica: 'Parents',
        nomeArtista: 'Yungblud',
        img: 'img/Parents.jpg',
        src: 'file:///E:/desenvolvimento/hotmart/playlist/audio/YUNGBLUD%20-%20Parents.mp3'
    },

    {
        nomeMusica: 'Whatever It Takes',
        nomeArtista: 'Imagine Dragons',
        img: 'img/ImagineDragonsEvolve.jpg',
        src: 'file:///E:/desenvolvimento/hotmart/playlist/audio/Imagine%20Dragons%20-%20Whatever%20it%20takes.mp3'
    }, 

    {
        nomeMusica: 'Cuthroat',
        nomeArtista: 'Imagine Dragons',
        img: 'img/mercury.png',
        src: 'file:///E:/desenvolvimento/hotmart/playlist/audio/Imagine%20Dragons%20-%20Cutthroat%20(Lyric%20Video).mp3'
    },

    {
        nomeMusica: 'Teeth',
        nomeArtista: '5 Seconds Of Summer',
        img: 'img/teeth.jpg',
        src: 'file:///E:/desenvolvimento/hotmart/playlist/audio/5%20Seconds%20of%20Summer%20%E2%80%92%20Teeth.mp3'
    },

    {
        nomeMusica: 'Pet Cheetah',
        nomeArtista: 'Twenty One Pilots',
        img: 'img/trench_.jpg',
        src: 'file:///E:/desenvolvimento/hotmart/playlist/audio/twenty%20one%20pilots%20-%20Pet%20Cheetah.mp3'
    }
]

for(let infoFaixa of infoFaixas){
        musicasDisponiveis.innerHTML += `
        <div class="faixas">
            <div class="imgFaixas" >
                <div class="${infoFaixa.nomeMusica}" onclick="iniciar(this)">
                    <img src="${infoFaixa.img}" alt="">
                </div>
            </div>
        
            <div class="infoFaixas">
                <p onclick="iniciar(this)" class="${infoFaixa.nomeMusica}">${infoFaixa.nomeMusica}</p>
                
                <p>${infoFaixa.nomeArtista}</p>
            </div>
        </div>
    `
}

function iniciar(musicaAtual) {
    musica.style.display = 'flex'
    principal.style.width = '1220px'

    let pegarMusica = musicaAtual.getAttribute('class')
    
    info(pegarMusica)

}

//inserir as informações da faixa no html de acordo 

function info(informacoes){
    for(let infoFaixa of infoFaixas){
        if(informacoes == infoFaixa.nomeMusica){
            nomeMusicaPlayer.innerHTML = `${infoFaixa.nomeMusica} - ${infoFaixa.nomeArtista}`
            tocandoAgora.innerHTML = `
                <img src="${infoFaixa.img}" alt="Album">
                <div id="infoAgora">
                    <h2>${infoFaixa.nomeMusica}</h2>
                    <p>${infoFaixa.nomeArtista}</p>
                </div>
            
            `
            audio.src = `${infoFaixa.src}`

            imgPause.src = 'img/pause.png'

            timer = setInterval(durationAudio, 1000)

            audio.play()
    
            
        }
        
    }

   
}

//pausar o audio, trocar a imagem entre o play e pause

function pause(isso){
    if(isso.src == 'file:///E:/desenvolvimento/hotmart/playlist/img/play-button-arrowhead.png'){
        
        audio.play()
        isso.src = 'img/pause.png'
        

    } else if(isso.src == 'file:///E:/desenvolvimento/hotmart/playlist/img/pause.png') {
        
        audio.pause()
        isso.src = 'img/play-button-arrowhead.png'
        
    }
}

function anterior(){
    infoFaixas.forEach((element, indice) => {
        if(element.src == audio.src){
            let retorno = infoFaixas[indice - 1]
            if(retorno == undefined){
                alert('Acabaram as músicas')
            } else {
                info(retorno.nomeMusica)
            }
        }
    });
}

function proximo(){
    var retorno = {}
    infoFaixas.forEach((element, indice) => {
        if(element.src == audio.src){
            retorno = infoFaixas[indice + 1]
            if(retorno == undefined){
                alert('Acabaram as músicas')
            } else {
                nomeMusicaPlayer.innerHTML = `${retorno.nomeMusica} - ${retorno.nomeArtista}`
                tocandoAgora.innerHTML = `
                    <img src="${retorno.img}" alt="Album">
                    <div id="infoAgora">
                        <h2>${retorno.nomeMusica}</h2>
                        <p>${retorno.nomeArtista}</p>
                    </div>
                    
                `
            }
        }
    });

    if(retorno != undefined){
        audio.src = ''
        audio.src = `${retorno.src}`
        audio.play()
    }
    
}

function durationAudio(){
    
    let minutes = Math.floor(audio.currentTime / 60)
    let seconds = Math.round(audio.currentTime % 60)
    let minutesTotal = Math.floor(audio.duration / 60)
    let secondsTotal = Math.round(audio.duration % 60)

    tempoMusica.value = audio.currentTime

    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (seconds < 10){
        seconds = "0" + seconds
    }
    if (minutesTotal < 10){
        minutesTotal = "0" + minutesTotal
    }
    if (secondsTotal < 10){
        secondsTotal = "0" + secondsTotal
    }

    if(imgPause.src == 'file:///E:/desenvolvimento/hotmart/playlist/img/play-button-arrowhead.png'){
        clearInterval(timer)
    } else {
        timer = setInterval(durationAudio, 1000)
    }

    duracaoInicial.innerHTML =  minutes + ":" + seconds
    duracaoFinal.innerHTML =  minutesTotal + ":" + secondsTotal
}

//controlar a barra de progresso

tempoMusica.addEventListener('input', ()=>{
    tempoMusica.max = audio.duration
    audio.currentTime = tempoMusica.value
})

//volume do audio

configVolume.addEventListener("input", ()=>{
    audio.volume = volume.value/100;

    if(audio.volume == 0){
        imagemVolume.src = 'img/fluent_speaker-mute-20-filled.png'
    } else {
        imagemVolume.src = 'img/ferramenta-de-audio-com-alto-falante.png'
    }
});

    




