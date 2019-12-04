package app.udemy.hibernate.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class Car {
    private Long id;
    private String name;
    private Set<Wheel> wheels;
    private Body body;
}
