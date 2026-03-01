var musik;
var nyala = true;

window.onload = function () {

    musik = document.getElementById("musik");

    var tombolMusik = document.getElementById("musikTombol");
    if (tombolMusik) {
        tombolMusik.onclick = toggleMusik;
    }

    animasiScroll();
    loadUcapan(); // 🔥 load ucapan saat halaman dibuka
};


/* Tombol buka undangan */
function buka() {

    var cover = document.getElementById("cover");
    var isi = document.getElementById("isi");

    if (cover) cover.style.display = "none";
    if (isi) isi.style.display = "block";

    if (musik) {
        musik.currentTime = 0;
        musik.play().catch(function () {
            console.log("Autoplay diblok browser");
        });
    }

    var semua = document.querySelectorAll(".fade");
    semua.forEach(function (el) {
        el.classList.remove("muncul");
    });

    void document.body.offsetHeight;

    setTimeout(function () {
        animasiScroll();
    }, 200);
}


function toggleMusik() {

    if (!musik) return;

    if (nyala) {
        musik.pause();
        document.getElementById("musikTombol").innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        nyala = false;
    } else {
        musik.play();
        document.getElementById("musikTombol").innerHTML = '<i class="fa-solid fa-volume-high"></i>';
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

window.addEventListener("scroll", animasiScroll);


/* ========================= */
/* 🔥 FITUR UCAPAN DATABASE  */
/* ========================= */

function loadUcapan() {

    var daftarUcapan = document.getElementById("daftarUcapan");
    if (!daftarUcapan) return;

    fetch("/ucapan")
        .then(response => response.json())
        .then(data => {

            daftarUcapan.innerHTML = "";

            if (data.length === 0) {
                daftarUcapan.innerHTML = "Belum ada ucapan.";
                return;
            }

            data.forEach(function (item) {
                daftarUcapan.innerHTML += `
                    <p><strong>${item.nama}</strong><br>${item.pesan}</p>
                    <hr>
                `;
            });
        })
        .catch(function () {
            daftarUcapan.innerHTML = "Gagal memuat ucapan.";
        });
}


function kirimUcapan() {

    var namaInput = document.querySelector("#ucapan input");
    var pesanInput = document.querySelector("#ucapan textarea");

    if (!namaInput || !pesanInput) return;

    if (namaInput.value.trim() === "" || pesanInput.value.trim() === "") {
        alert("Nama dan pesan tidak boleh kosong!");
        return;
    }

    fetch("/ucapan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama: namaInput.value,
            pesan: pesanInput.value
        })
    })
        .then(response => response.json())
        .then(function () {
            namaInput.value = "";
            pesanInput.value = "";
            loadUcapan();
        })
        .catch(function () {
            alert("Gagal mengirim ucapan.");
        });
}


/* Hubungkan tombol kirim */
document.addEventListener("DOMContentLoaded", function () {
    var tombol = document.querySelector("#ucapan button");
    if (tombol) {
        tombol.onclick = kirimUcapan;
    }
});


/* ========================= */
/* COUNTDOWN */
/* ========================= */

function countdown() {

    var tanggalNikah = new Date("Oct 10 2026 10:00:00").getTime();
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