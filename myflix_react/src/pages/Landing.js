import ScenesCarousel from '../components/ScenesCarousel';


function Landing(){

    const imageData = [
        { src: './assets/AkiraScene.jpg', alt: 'Akira'},
        { src: './assets/GrandBudapestScene.jpeg', alt: 'Grand Budapest Hotel'},
        { src: './assets/IndianaJonesScene.jpg', alt: 'Indiana Jones'},
        { src: './assets/KungFuHustleScene.webp', alt: 'Kung Fu Hustle'},
        { src: './assets/PulpFictionScene.jpg', alt: 'Pulp Fiction'},
        { src: './assets/SpaceOdysseyScene.jpg', alt: 'Space Odyssey'},
        { src: './assets/SpiritedAwayScene.png', alt: 'Spirited Away'},
    ]

    return(
        <div>
            <ScenesCarousel images={imageData} />
        </div>
    )
}

export default Landing;