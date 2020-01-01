package app.org.angular.notesapp.model;

import app.org.angular.notesapp.model.enums.NoteType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Note implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_id_seq")
    @SequenceGenerator(name = "note_id_seq", sequenceName = "note_id_seq", allocationSize = 1)
    private Long id;
    @NotNull
    @Enumerated
    @Column
    private NoteType noteType;
    @NotNull
    @Length(max = 100)
    @Column
    private String noteTopic;
    @NotNull
    @Length(max = 2000, message = "max text for note is 2000 characters")
    @Column
    private String noteText;
}
