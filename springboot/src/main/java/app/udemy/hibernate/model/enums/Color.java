package app.udemy.hibernate.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Color {
    RED(1,"red"),
    GREEN(2, "green"),
    BLUE(3, "blue");

    private int index;
    private String value;
}
