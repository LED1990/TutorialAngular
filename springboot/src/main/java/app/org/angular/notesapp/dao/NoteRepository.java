package app.org.angular.notesapp.dao;

import app.org.angular.notesapp.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Transactional
    @Query("SELECT id, noteType, noteTopic from Note")
    Set<Object[]> getAllNotesInfo();
}
