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
    //no @GeneratedValue annotation because this ID is also FK for Car table
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carbody_id_seq")
    @SequenceGenerator(name = "carbody_id_seq", sequenceName = "carbody_id_seq", allocationSize = 1)
    private Long id;
    @Transient //todo remove soon
    private Color bodyColor;
    @Transient //todo remove soon
    private BodyType bodyType;
    @NotNull
    @Column(name = "numberofdoors")// nullable = false works only when hibernate creates table!
    private Integer numberOfDoors;
    @Column(name = "additionalinfo")
    private String additionalInfo;
    @JsonIgnore
    @OneToOne(mappedBy = "body")//mappedBy - dependent side notation
    private Car car;

}
