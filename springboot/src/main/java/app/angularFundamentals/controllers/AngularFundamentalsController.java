package app.angularFundamentals.controllers;

import app.angularFundamentals.model.Hero;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController
public class AngularFundamentalsController {

    private List<Hero> heroes;

    @GetMapping("/api/heroes")
    public List<Hero> returnAllHeroes(){
        //todo: add database management
        if (heroes == null || heroes.isEmpty()){
            return mockHeroes();
        }
        return heroes;
    }

    @GetMapping("/api/heroes/hero")
    public Hero returnHeroByid(@RequestParam(name = "heroID") String id){
        //todo: add database management
        if (heroes == null || heroes.isEmpty()){
            heroes = mockHeroes();
        }
        Optional<Hero> hero = heroes.stream().filter(x -> x.getId() == Integer.parseInt(id)).findFirst();
        return hero.orElse(null);
    }

    @PutMapping("/api/heroes/hero")
    public ResponseEntity<Hero> updateHero(@RequestBody Hero hero){
        //todo: add database management
        heroes.set(hero.getId(), hero);
        return ResponseEntity.ok(hero);
    }

    private List<Hero> mockHeroes(){
        if (heroes == null){
            heroes = new ArrayList<>();
        }
        for (int i = 0; i<10; i++ ){
            heroes.add(new Hero(i, "Hero number: " + i));
        }
        return heroes;
    }
}
