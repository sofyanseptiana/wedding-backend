var musik;
var nyala = true;

window.onload = function () {

    musik = document.getElementById("musik");
    /* tombol musik aktif */
    document.getElementById("musikTombol").onclick = toggleMusik;

    // Jalankan animasi untuk cover
    animasiScroll();

}


/* Tombol buka undangan */
function buka() {

    var cover = document.getElementById("cover");
    var isi = document.getElementById("isi");

    // Sembunyikan cover
    cover.style.display = "none";

    // Tampilkan isi
    isi.style.display = "block";


    /* Jalankan musik */
    if (musik) {

        musik.currentTime = 0;

        musik.play().catch(function () {

            console.log("Autoplay diblok browser");

        });

    }


    /* Reset animasi */
    var semua = document.querySelectorAll(".fade");

    semua.forEach(function (el) {

        el.classList.remove("muncul");

    });


    /* Paksa browser refresh */
    void document.body.offsetHeight;


    /* Jalankan animasi */
    setTimeout(function () {

        animasiScroll();

    }, 200);

}

function toggleMusik() {

    if (nyala) {

        musik.pause();

        document.getElementById("musikTombol").innerHTML = "🔇";

        nyala = false;

    }

    else {

        musik.play();

        document.getElementById("musikTombol").innerHTML = "🔊";

        nyala = true;

    }

}



/* Animasi scroll */
function animasiScroll() {

    var semua = document.querySelectorAll(".fade");

    var tinggiLayar = window.innerHeight;

    semua.forEach(function (el) {

        var posisi = el.getBoundingClientRect().top;

        if (posisi < tinggiLayar - 100) {

            el.classList.add("muncul");

        }

    });

}



/* Event scroll */
window.addEventListener("scroll", animasiScroll);



/* Countdown */
function countdown() {

    var tanggalNikah =
        new Date("Oct 10 2026 10:00:00").getTime();

    var sekarang = new Date().getTime();

    var selisih = tanggalNikah - sekarang;

    var hari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    var jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    var menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));

    var detik = Math.floor((selisih % (1000 * 60)) / 1000);

    var el = document.getElementById("countdown");

    if (el) {

        el.innerHTML =
            hari + " Hari " +
            jam + " Jam " +
            menit + " Menit " +
            detik + " Detik";

    }

}

setInterval(countdown, 1000);