package app.udemy.hibernate.model;

import app.udemy.hibernate.model.enums.BodyType;
import app.udemy.hibernate.model.enums.Color;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Body {
    private Long id;
    private Color bodyColor;
    private BodyType bodyType;
    private Integer numberOfDoors;
    private String additionalInfo;

}
