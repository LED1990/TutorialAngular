package app.udemy.hibernate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Wheel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wheel_id_seq")
    @SequenceGenerator(name = "wheel_id_seq", sequenceName = "wheel_id_seq", allocationSize = 1)
    private Long id;
    @Column
    private int size;
    @Column
    private String manufacturer;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    /**
     *  before persisting ID is null, after persisting ID is not null so HasCode is different and entity cannot be found
     *  this is why HasCode is returning const val. we are using ID to define entities equality
     * @return return
     */
    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj){
            return true;
        }
        if (!(obj instanceof Wheel)){
            return false;
        }
        return id != null && id.equals(((Wheel) obj).getId());
    }
}
