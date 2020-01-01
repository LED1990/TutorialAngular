package app.udemy.hibernate.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

////hibernate/JPA annotations
@Entity
@Table //default name for table is unqualified class - this case 'car'
//lombok annotations
@Setter
@Getter
@NoArgsConstructor
public class Car implements Serializable {

    /**
     * '@GeneratedValue' to define strategy for generating id. Possible values:
     *  AUTO - either identity column, sequence or table depending on the underlying DB - default
     *  TABLE - table holding the id
     *  IDENTITY - identity column
     *  SEQUENCE - sequence
     *  identity copy - the identity is copied from another entity
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_id_seq")
    @SequenceGenerator(name = "car_id_seq", sequenceName = "car_id_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false)
    private String name;
    /**
     * this one to many is good as long as I dont have to much wheels. With big collection app may have problems with performance
     * to avoid performance issues it would be better to use queries to manage wheels
     */
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "car")
    private Set<Wheel> wheels;// will be one to many

    /**
     * this with @MapsId on child side doesnt require null values in Fk because child's FK and PK are shared
     * if optional is set to true I cans save car without body
     */
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(mappedBy = "car", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)//without cascade I would need to save body first
    private Body body;//will be one to one
    /**
     * allows to declare fetching strategy. All simple fields by default are EAGER
     * fields without annotation are persisted anyway with @Basic annotation! only @Transient are omitted
     */
    //    @Basic
    private String info;
    @Column(name = "drivername")
    private String driverName;

    /**
     * both methods (addWheel, removeWheel) added for data synchronization in bidirectional one to many
     * @param wheel new wheel
     */
    public void addWheel(Wheel wheel){
        if (wheels == null){
            wheels = new HashSet<>();
        }
        wheels.add(wheel);
        wheel.setCar(this);
    }
    public void removeWheel(Wheel wheel){
        if (wheels == null || wheels.isEmpty()){
            return;
        }
        wheels.remove(wheel);
        wheel.setCar(null);
    }
}
