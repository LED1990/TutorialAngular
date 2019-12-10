package app.udemy.hibernate.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

////hibernate/JPA annotations
@Entity
@Table //default name for table is unqualified class - this case 'car'
//lombok annotations
@Setter
@Getter
@NoArgsConstructor
public class Car implements Serializable {
    @Id
//    @GeneratedValue to define strategy for generating id. Possible values:
//    AUTO - either identity column, sequence or table depending on the underlying DB - default
//    TABLE - table holding the id
//    IDENTITY - identity column
//    SEQUENCE - sequence
//    identity copy - the identity is copied from another entity
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_id_seq")
    @SequenceGenerator(name = "car_id_seq", sequenceName = "car_id_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Transient //todo later remove
    private Set<Wheel> wheels;// will be one to many

    /*
   this with @MapsId on child side doesnt require null values in Fk because child's FK and PK are shared
   if optional is set to true I cans save car without body
     */
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(mappedBy = "car", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    private Body body;//will be one to one
//    @Basic //allows to declare fetching strategy. All simple fields by default are EAGER
    private String info;//fields without annotation are persisted anyway with @Basic annotation! only @Transient are omitted
    @Column(name = "drivername")
    private String driverName;
}
