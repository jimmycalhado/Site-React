package ApiReact.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.security.auth.login.CredentialException;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usersRep;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Iterable<Usuario> getUsersDb() {
        return usersRep.findAll();
    }

    public boolean getUserByLogin(UsuarioDTO loginAuth) throws CredentialException {
        Optional<Usuario> usuarioOptional = usersRep.findByEmail(loginAuth.getEmail());
        if (!isValidEmail(loginAuth.getEmail())) throw new IllegalArgumentException("Email Inválido");

        if (usuarioOptional.isPresent() && passwordEncoder.matches(loginAuth.getSenha(), usuarioOptional.get().getSenha())) {
            return true;
        } else {
            throw new CredentialException("Credenciais Inválidas");
        }
    }

    public Usuario insert(Usuario usuario) {
        Optional<Usuario> emailUser = usersRep.findByEmail(usuario.getEmail());
        Assert.isNull(usuario.getId(), "Não foi possível inserir usuario");
        if (!emailUser.isPresent() && isValidEmail(usuario.getEmail())) {
            String senhaCrip = passwordEncoder.encode(usuario.getSenha());
            usuario.setSenha(senhaCrip);
            return usersRep.save(usuario);
        } else {
            throw new RuntimeException("Email Inválido ou já cadastrado");
        }
    }

    public Usuario update(Usuario usuario, Integer id) {
        Optional<Usuario> user = usersRep.findById(id);

        if (user.isPresent()) {
            String senhaCrip = passwordEncoder.encode(usuario.getSenha());
            Usuario db = user.get();
            db.setUsername(usuario.getUsername());
            db.setEmail(usuario.getEmail());
            db.setSenha(senhaCrip);

            usersRep.save(db);
            return db;
        }
        throw new RuntimeException("Carro não Atualizado");
    }

    public boolean delete(Integer id) {
        Optional<Usuario> user = usersRep.findById(id);
        if (user.isPresent()) {
            usersRep.deleteById(id);
            return true;
        } else {
            return false;
        }

    }

    public static boolean isValidEmail(String email) {
        // Verifica se o endereço de e-mail está vazio
        if (email == null || email.isEmpty()) {
            return false;
        }

        // Verifica se o endereço de e-mail contém o caractere `@`
        if (!email.contains("@")) {
            return false;
        }
        // Verifica se o domínio do endereço de e-mail é válido
        int index = email.lastIndexOf("@");
        String dominio = email.substring(index + 1);
        return dominio.matches("[a-zA-Z0-9-]+\\.[a-zA-Z]+");
    }

}
