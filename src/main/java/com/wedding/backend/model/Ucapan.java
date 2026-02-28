package com.wedding.backend.model;

import jakarta.persistence.*;

@Entity
public class Ucapan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nama;
    private String pesan;
    private String kehadiran;

    public Ucapan() {}

    public Ucapan(String nama, String pesan, String kehadiran) {
        this.nama = nama;
        this.pesan = pesan;
        this.kehadiran = kehadiran;
    }

    public Long getId() { return id; }
    public String getNama() { return nama; }
    public String getPesan() { return pesan; }
    public String getKehadiran() { return kehadiran; }

    public void setNama(String nama) { this.nama = nama; }
    public void setPesan(String pesan) { this.pesan = pesan; }
    public void setKehadiran(String kehadiran) { this.kehadiran = kehadiran; }
}