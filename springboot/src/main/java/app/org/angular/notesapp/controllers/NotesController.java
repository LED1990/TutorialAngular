package app.org.angular.notesapp.controllers;

import app.org.angular.notesapp.model.Note;
import app.org.angular.notesapp.services.interfaces.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController
public class NotesController {

    private NoteService noteService;

    @PutMapping("/api/notes/new")
    public ResponseEntity<Note> addNewNote(@RequestBody Note note){
        return ResponseEntity.ok(noteService.addNewNote(note));
    }

    @GetMapping("/api/notes/getall")
    public ResponseEntity<Set<Note>> getAllNotesInfo(){
        return ResponseEntity.ok(noteService.getAllNotesInfo());
    }

    @GetMapping("/api/notes/note")
    public ResponseEntity<Note> getNote(@RequestParam(name = "id") String id){
        Optional<Note> result = noteService.getNote(Long.parseLong(id));
        if(result.isPresent()){
            return ResponseEntity.ok(result.get());
        }
        return ResponseEntity.ok(null);
    }

    /**
     * only PNG allowed (restriced on angular side)
     * Implementation could be changed to accept more image types
     * @param file new image
     * @param note new note
     * @return ret
     */
    @PutMapping("/api/notes/file")
    public ResponseEntity<Note> addNewFile(@RequestPart("img") MultipartFile file, @RequestPart("note") Note note){
        Optional<Note> result = noteService.saveNoteImage(file, note);
        if (result.isPresent()){
            return ResponseEntity.ok(result.get());
        }
        return ResponseEntity.ok(null);
    }

    @GetMapping("/api/notes/note/image")
    public ResponseEntity<Resource> getNoteImage(@RequestParam(name = "id") String id){
        Optional<byte[]> result = noteService.getNoteImage(Long.parseLong(id));
        ByteArrayResource resource;
        if(result.isPresent()){
            resource = new ByteArrayResource(result.get());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);
        }
        return ResponseEntity.ok(null);
    }

    @Autowired
    public void setNoteService(NoteService noteService) {
        this.noteService = noteService;
    }
}
