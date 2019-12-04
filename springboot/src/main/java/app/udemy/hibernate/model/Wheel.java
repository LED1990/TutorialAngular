package app.udemy.hibernate.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
public class Wheel implements Serializable {
    private int size;
    private String manufacturer;
}
