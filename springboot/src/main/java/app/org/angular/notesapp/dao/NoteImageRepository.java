package app.org.angular.notesapp.dao;

import app.org.angular.notesapp.model.NoteImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NoteImageRepository extends JpaRepository<NoteImage, Long>{

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Transactional
    @Query("SELECT img from NoteImage where noteId = :id")
    byte[] getImageByNoteId(@Param("id") long id);

}
