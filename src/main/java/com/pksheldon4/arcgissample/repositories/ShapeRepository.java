package com.pksheldon4.arcgissample.repositories;

import com.pksheldon4.arcgissample.models.Shape;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShapeRepository extends CrudRepository<Shape, String> {

}
