const frames = {
    currentIndex: 0,
    maxIndex: 480,
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let imgLoaded = 0;

const Images = [];

function preloadImages() {
    for(let i = 1; i <= frames.maxIndex; i++) {
        const img = new Image();
        img.src = `./img/frame_${i.toString().padStart(4, '0')}.jpeg`;

        img.onload = () => {
            imgLoaded++;
            if(imgLoaded === frames.maxIndex) {
                loadImg(frames.currentIndex);
                animation();
            }
        }

        Images.push(img);
    }
}

console.log(Images);


function loadImg(index) {      
    if(index >= 0 && index <= frames.maxIndex) {
        const img = Images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, x, y, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function animation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            scrub: 3,
            trigger: ".canvasPraent",
            start: "top top",
        }
    });

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function() {
            loadImg(Math.floor(frames.currentIndex));
        }

    })
    
}


preloadImages();