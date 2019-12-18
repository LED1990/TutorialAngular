package app.org.angular.notesapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "note_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoteImage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_image_id_seq")
    @SequenceGenerator(name = "note_image_id_seq", sequenceName = "note_image_id_seq", allocationSize = 1)
    private Long id;
    @NotNull
    @Column
    private Long noteId;
    @NotNull
//    @Lob
    @Column
    private byte[] img;
}
