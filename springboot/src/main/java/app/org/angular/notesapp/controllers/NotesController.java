package app.org.angular.notesapp.controllers;

import app.org.angular.notesapp.model.Note;
import app.org.angular.notesapp.services.interfaces.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController
public class NotesController {

    private NoteService noteService;

    @PutMapping("/api/note/new")
    public ResponseEntity<Note> addNewNote(@RequestBody Note note){
        return ResponseEntity.ok(noteService.addNewNote(note));
    }

    @GetMapping("/api/note/getall")
    public ResponseEntity<Set<Note>> getAllNotesInfo(){
        return ResponseEntity.ok(noteService.getAllNotesInfo());
    }

    @Autowired
    public void setNoteService(NoteService noteService) {
        this.noteService = noteService;
    }
}
