package com.pksheldon4.arcgissample.controllers;

import com.pksheldon4.arcgissample.models.Shape;
import com.pksheldon4.arcgissample.repositories.ShapeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shapes")
public class ShapeController {

    private final ShapeRepository repository;

    public ShapeController(ShapeRepository repository) {
        this.repository = repository;
    }


    @GetMapping
    public Iterable<Shape> shapes() {
        return repository.findAll();
    }
}
