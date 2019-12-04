package app.udemy.hibernate.dao.interfaces;

import app.udemy.hibernate.model.Car;

public interface CarDao {
    void persistNewCarWithTransactional(Car car);
    void persistNewCarWithoutTransactional (Car car);

    Long saveNewCar(Car car);
    void persistNewCar(Car car);

}
