package app.org.angular.notesapp.services.interfaces;

import app.org.angular.notesapp.model.Note;
import app.org.angular.notesapp.model.NoteImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;

public interface NoteService {
    Note addNewNote(Note note);
    Set<Note> getAllNotesInfo();
    Optional<Note> getNote(long id);
    Optional<Note> saveNoteImage(MultipartFile img, Note note);
    Optional<byte[]> getNoteImage(long id);
}
