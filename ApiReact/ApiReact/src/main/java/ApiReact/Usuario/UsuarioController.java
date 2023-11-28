package ApiReact.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialException;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class UsuarioController {

    @Autowired
    private UsuarioService usersService;

    @GetMapping()
    public ResponseEntity<Iterable<Usuario>> getUsers() {
        return ResponseEntity.ok(usersService.getUsersDb());
    }

    @PostMapping()
    public ResponseEntity<?> post(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usersService.insert(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<?> userAuth(@RequestBody UsuarioDTO loginAuth) throws CredentialException {
        return ResponseEntity.ok(usersService.getUserByLogin(loginAuth));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@RequestBody Usuario usuario, @PathVariable("id") Integer id) {
        usersService.update(usuario, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (usersService.delete(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
