package com.wedding.backend.controller;

import com.wedding.backend.model.Ucapan;
import com.wedding.backend.repository.UcapanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/ucapan")
public class UcapanController {

    @Autowired
    private UcapanRepository repository;

    @PostMapping
    public Ucapan tambahUcapan(@RequestBody Ucapan ucapan) {
        return repository.save(ucapan);
    }

    @GetMapping
    public List<Ucapan> getSemuaUcapan() {
        return repository.findAll();
    }
}
