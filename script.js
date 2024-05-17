// array de musicas
let musicas = [
    {titulo: 'Agate', artista: 'Astrix, Ritmo', src:'musicas/Astrix feat. Ritmo - Agate.mp3', img: 'img/Agate_Astrix&Ritmo.jpg'},
    {titulo: 'Singularity', artista: 'Stephan Bodzin', src:'musicas/Stephan Bodzin - Singularity.mp3', img:'img/Singularity_StephanBodzin.jpg'},
    {titulo: 'World Hold On - (Vintage Culture & Dubdogz Extended Remix)', artista: 'Bob Sinclar, Vintage Culture, Dubdogz, Steve Ed', src:'musicas/Bob Sinclar & Steve Edwards - World Hold On (Vintage Culture & Dubdogz Extended Mix).mp3', img:'img/World_Hold_on_VintageCulture.jpg'}
];

let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

// Chama renderizarMusica na inicialização para carregar a primeira música
renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica = (indexMusica - 1 + musicas.length) % musicas.length;
    renderizarMusica(indexMusica);
    tocarMusica();
});
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica = (indexMusica + 1) % musicas.length;
    renderizarMusica(indexMusica);
    tocarMusica();
});

// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none'; 
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block'; 
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.value = (musica.currentTime / musica.duration) * 100;
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}




