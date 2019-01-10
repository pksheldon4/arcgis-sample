package com.pksheldon4.arcgissample;

import com.pksheldon4.arcgissample.models.Point;
import com.pksheldon4.arcgissample.models.Shape;
import com.pksheldon4.arcgissample.repositories.ShapeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader implements CommandLineRunner {

    private final ShapeRepository repository;


    public DataLoader(ShapeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        createVolumeData();
    }

    private void createVolumeData() {

        for (int i = 0; i < 4; i++) {
            double latMin = 00; //-180.0;
            double latMax = 64;//180.0;
            double lonMin = 10;//-90;
            double lonMax = 44;//90;

            for (int j = 0; j < 50; j++) {
                Random r = new Random();
                double randomLat1 = latMin + (latMax - latMin) * r.nextDouble();
                double randomLon1 = lonMin + (lonMax - lonMin) * r.nextDouble();
                double randomLat2 = randomLat1 + .6;
                double randomLon2 = randomLon1 + .6;

                List<Point> points = new LinkedList<>();

                points.add(createPoint(randomLat1, randomLon1));
                points.add(createPoint(randomLat2, randomLon1));
                points.add(createPoint(randomLat2, randomLon2));
                points.add(createPoint(randomLat1, randomLon2));
                points.add(createPoint(randomLat1, randomLon1));

                repository.save(createShape(points));

            }
        }
    }

    private Point createPoint(double latitude, double longitude) {
        return Point.builder()
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
    private Shape createShape(List<Point> points) {
        return Shape.builder()
                .shape("Polygon")
                .points(points)
                .build();
    }

}
