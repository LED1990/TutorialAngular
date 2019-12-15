package app.udemy.hibernate.controllers;

import app.udemy.hibernate.dao.interfaces.CarDao;
import app.udemy.hibernate.model.Body;
import app.udemy.hibernate.model.Car;
import app.udemy.hibernate.model.Wheel;
import app.udemy.hibernate.model.enums.BodyType;
import app.udemy.hibernate.model.enums.Color;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/hibernate")
public class CarsController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CarDao carDao;

    @PutMapping("/addcar/transactional/persist")
    public String persistTransactional() {
        carDao.persistNewCarWithTransactional(mockNewCar(0));
        return "Persisted";
    }

    @PutMapping("/addcar/notransactional/persist")
    public String persistWithoutTransactional() {
        carDao.persistNewCarWithoutTransactional(mockNewCar(0));
        return "Persisted";
    }

    @PutMapping("/addcar/save")
    public String saveNewCar() {
        Long newCarId = carDao.saveNewCar(mockNewCar(0));
        logger.debug("new car saved: " + newCarId);
        return "New car ID by save method: " + newCarId;
    }

    @GetMapping("/car")
    public Car getSingleCar(@RequestParam Long id) {
        logger.debug("Getting car");
        return carDao.getCarById(id);
    }

    @PutMapping("/addcar/persist")
    public String persistNewCar() {
        carDao.persistNewCar(mockNewCar(0));
        logger.debug("new car persisted");
        return "New car persisted";
    }

    @PutMapping("/addcar/persist/jpabatch")
    public String persistMultipleCarsWithJpaBatching() {
        List<Car> toSave = new ArrayList<>();
        for (int i = 0; i < 10; i++){
            toSave.add(mockNewCar(i));
        }
        carDao.saveMultipleCarsJpa(toSave);
        return "All cars persisted";
    }

    private Car mockNewCar(int number) {
        Car newCarMock = new Car();
        newCarMock.setDriverName("driver name " + number);
        newCarMock.setInfo("car info " + number);
        newCarMock.setName("AUDI " + number);

        Body mockBody = new Body();
        mockBody.setAdditionalInfo("body info " + number);
        mockBody.setNumberOfDoors(5);
        mockBody.setBodyType(BodyType.SEDAN);
        mockBody.setBodyColor(Color.GREEN);

        Wheel wheel = new Wheel();
        wheel.setSize(20);
        wheel.setManufacturer("Wheel " + number);

        Wheel wheel1 = new Wheel();
        wheel1.setSize(40);
        wheel1.setManufacturer("Wheel1 " + number);

        mockBody.setCar(newCarMock);
        newCarMock.addWheel(wheel);
        newCarMock.addWheel(wheel1);
        newCarMock.setBody(mockBody);
        return newCarMock;
    }
}
