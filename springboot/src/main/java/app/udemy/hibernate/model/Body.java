package app.udemy.hibernate.model;

import app.udemy.hibernate.model.enums.BodyType;
import app.udemy.hibernate.model.enums.Color;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "carbody")//because table name different from class unqualified name
@Getter
@Setter
@NoArgsConstructor
public class Body implements Serializable {
    /**
     * NO! @GeneratedValue annotation because this ID is also FK for Car table (MapsBy)
     */
    @Id
    private Long id;
    @Enumerated
    @Column(columnDefinition = "smallint", name = "bodycolor")
    private Color bodyColor;
    @Enumerated
    @Column(columnDefinition = "smallint", name = "bodytype")
    private BodyType bodyType;
    @NotNull
    @Column(name = "numberofdoors")// nullable = false works only when hibernate creates table!
    private Integer numberOfDoors;
    @Column(name = "additionalinfo")
    private String additionalInfo;
    /**
     * '@JoinColumn(name = "id")' by default hibernate would look for 'car_id' column not 'id' in car table
     * '@MapsId' with this Body ID will be FK and PK together based on Car ID
     */
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @MapsId
    private Car car;

}
