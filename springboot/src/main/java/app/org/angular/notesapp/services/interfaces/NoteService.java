package app.org.angular.notesapp.services.interfaces;

import app.org.angular.notesapp.model.Note;

import java.util.Set;

public interface NoteService {
    Note addNewNote(Note note);
    Set<Note> getAllNotesInfo();
}
