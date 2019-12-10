package app.udemy.hibernate.controllers;

import app.udemy.hibernate.dao.interfaces.CarDao;
import app.udemy.hibernate.model.Body;
import app.udemy.hibernate.model.Car;
import app.udemy.hibernate.model.enums.BodyType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hibernate")
public class CarsController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CarDao carDao;

    @PutMapping("/addcar/transactional/persist")
    public String persistTransactional() {
        carDao.persistNewCarWithTransactional(mockNewCar());
        return "Persisted";
    }

    @PutMapping("/addcar/notransactional/persist")
    public String persistWithoutTransactional() {
        carDao.persistNewCarWithoutTransactional(mockNewCar());
        return "Persisted";
    }

    @PutMapping("/addcar/save")
    public String saveNewCar() {
        Long newCarId = carDao.saveNewCar(mockNewCar());
        logger.debug("new car saved: " + newCarId);
        return "New car ID by save method: " + newCarId;
    }

    @GetMapping("/car")
    public Car getSingleCar(@RequestParam Long id ){
        logger.debug("Getting car");
        return carDao.getCarById(id);
    }

    @PutMapping("/addcar/persist")
    public String persistNewCar() {
        carDao.persistNewCar(mockNewCar());
        logger.debug("new car persisted");
        return "New car persisted";
    }

    private Car mockNewCar() {
        Car newCarMock = new Car();
        newCarMock.setDriverName("driver name");
        newCarMock.setInfo("car info");
        newCarMock.setName("AUDI");
        newCarMock.setId(1L);//ID will be calculated by sequence correctly

        Body mockBody = new Body();
        mockBody.setAdditionalInfo("body info");
        mockBody.setNumberOfDoors(5);
        mockBody.setBodyType(BodyType.SEDAN);

        mockBody.setCar(newCarMock);
        newCarMock.setBody(mockBody);
        return newCarMock;
    }
}
