package app.org.angular.notesapp.controllers;

import app.org.angular.notesapp.model.Note;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController("/notes")
public class NotesController {

    @RequestMapping("/save")
    public Note addNewNote(@RequestBody Note note){
         return null;
    }
}
