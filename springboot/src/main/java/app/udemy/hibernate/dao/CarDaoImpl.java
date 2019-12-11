package app.udemy.hibernate.dao;

import app.udemy.hibernate.dao.interfaces.CarDao;
import app.udemy.hibernate.model.Car;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CarDaoImpl extends CommonDaoImpl<Car> implements CarDao {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * with @Transactonal spring handles transaction (creating, commiting etc.) without it I have to handle transaction
     * under the hood using JPA EntityManager
     *
     * @param car new car
     */
    @Override
    @Transactional
    public void persistNewCarWithTransactional(Car car) {
        persistTransactional(car);
    }

    /**
     * NO transactional! I have to handle transaction by my self
     * under the hood using JPA EntityManager
     *
     * @param car new car
     */
    @Override
    public void persistNewCarWithoutTransactional(Car car) {
        persistWithoutTransactional(car);
    }

    //////////////////////////////////// TESTING HIBERNATE SESSION METHODS WITH @TRANSACTIONAL

    @Override
    @Transactional
    public Long saveNewCar(Car car) {
        return save(car);
    }

    @Override
    @Transactional
    public void persistNewCar(Car car) {
        persist(car);
    }

    @Override
    @Transactional
    public Car getCarById(Long id) {
        return getById(id, Car.class);
    }

    @Transactional
    @Override
    public void saveMultipleCarsJpa(List<Car> carsToSave) {
        persistWithBatch(carsToSave);
    }


}
