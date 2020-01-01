package app.org.angular.notesapp.services;

import app.org.angular.notesapp.dao.NoteImageRepository;
import app.org.angular.notesapp.dao.NoteRepository;
import app.org.angular.notesapp.model.Note;
import app.org.angular.notesapp.model.NoteImage;
import app.org.angular.notesapp.model.enums.NoteType;
import app.org.angular.notesapp.services.interfaces.NoteService;
import org.aspectj.weaver.ast.Not;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.IOException;
import java.nio.file.OpenOption;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class NoteServiceImpl implements NoteService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private NoteRepository noteRepository;
    private NoteImageRepository noteImageRepository;

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

    @Override
    public Optional<Note> getNote(long id) {
        return noteRepository.findById(id);
    }

    @Override
    public Optional<Note> saveNoteImage(MultipartFile img, Note note) {
        byte[] imgArray = null;

        if (img != null && img.getSize() > 0){
            imgArray = new byte[(int) img.getSize()];
            try {
                imgArray = img.getBytes();
            } catch (IOException e) {
                logger.error("", e);
            }
        }
        if(imgArray != null && imgArray.length > 0){//todo maby some refactor
            Note newNote = noteRepository.save(note);
            NoteImage noteImage = new NoteImage();
            noteImage.setImg(imgArray);
            noteImage.setNoteId(newNote.getId());
            noteImageRepository.save(noteImage);//todo error control?
            return Optional.of(newNote);
        }

        return Optional.empty();
    }

    @Override
    public Optional<byte[]> getNoteImage(long id) {
        byte[] result = noteImageRepository.getImageByNoteId(id);
        if (result != null && result.length > 0){
            return Optional.of(result);
        }
        return Optional.empty();
    }

    @Autowired
    public void setNoteRepository(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Autowired
    public void setNoteImageRepository(NoteImageRepository noteImageRepository) {
        this.noteImageRepository = noteImageRepository;
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
