package app.org.angular.notesapp.services;

import app.org.angular.notesapp.dao.NoteRepository;
import app.org.angular.notesapp.model.Note;
import app.org.angular.notesapp.model.enums.NoteType;
import app.org.angular.notesapp.services.interfaces.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;

    @Override
    public Note addNewNote(Note note) {
        return noteRepository.save(note);
    }

    /**
     * getting all info about available notes, but not getting every data about note (text and picture not required)
     *
     * @return ret
     */
    @Override
    public Set<Note> getAllNotesInfo() {
        Set<Object[]> result = noteRepository.getAllNotesInfo();
        return convertToNote(result);
    }

    @Autowired
    public void setNoteRepository(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    private Set<Note> convertToNote(Set<Object[]> arr) {
        Set<Note> result = new HashSet<>();
        for (Object[] o : arr
        ) {
            result.add(new Note((Long) o[0], (NoteType) o[1], (String) o[2], null));
        }
        return result;
    }
}
