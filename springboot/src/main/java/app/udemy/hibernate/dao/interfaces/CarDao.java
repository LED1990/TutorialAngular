package app.udemy.hibernate.dao.interfaces;

import app.udemy.hibernate.model.Car;

import java.util.List;

public interface CarDao {
    void persistNewCarWithTransactional(Car car);
    void persistNewCarWithoutTransactional (Car car);

    Long saveNewCar(Car car);
    void persistNewCar(Car car);
    Car getCarById(Long id);

    void saveMultipleCarsJpa(List<Car> carsToSave);

}
