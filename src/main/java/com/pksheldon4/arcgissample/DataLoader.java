package com.pksheldon4.arcgissample;

import com.pksheldon4.arcgissample.models.Point;
import com.pksheldon4.arcgissample.models.Shape;
import com.pksheldon4.arcgissample.repositories.ShapeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ShapeRepository repository;


    public DataLoader(ShapeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        createPoint();
        createLine();
        createPolygon();

    }

    private void createPolygon() {
        Point point1 = Point.builder()
                .latitude(33.78)
                .longitude(-84.381856)
                .build();
        Point point2= Point.builder()
                .latitude(33.78)
                .longitude(-84.400)
                .build();
        Point point3 = Point.builder()
                .latitude(33.79)
                .longitude(-84.400)
                .build();
        Point point4 = Point.builder()
                .latitude(33.79)
                .longitude(-84.381856)
                .build();
        List<Point> points = new LinkedList<>();
        points.add(point1);
        points.add(point2);
        points.add(point3);
        points.add(point4);
        Shape shape = Shape.builder()
                .shape("Polygon")
                .points(points)
                .build();

        repository.save(shape);
    }

    private void createLine() {
        Point point1 = Point.builder()
                .latitude(33.80)
                .longitude(-84.35)
                .build();
        Point point2 = Point.builder()
                .latitude(33.76)
                .longitude(-84.38)
                .build();
        List<Point> points = new ArrayList<>();
        points.add(point1);
        points.add(point2);
        Shape shape = Shape.builder()
                .shape("Line")
                .points(points)
                .build();

        repository.save(shape);
    }

    private void createPoint() {
        Point point = Point.builder()
                .latitude(33.8084163)
                .longitude(-84.381856)
                .build();
        Shape shape2 = Shape.builder()
                .shape("Point")
                .point(point)
                .build();

        repository.save(shape2);
    }
}
