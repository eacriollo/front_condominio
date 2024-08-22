import { funHttp } from "./Http"

export default {

    funListar() {
        return funHttp().get("/persona");
    },

    funIngresar(datos) {
        return funHttp().post("/persona", datos);
    },

    funMostrar(id) {
        return funHttp().get("/persona/" + id);
    },

    funActualizar(datos, id) {
        return funHttp().put("/persona/" + id, datos);
    },

    funEliminar(id) {
        return funHttp().delete("/persona/" + id);
    }

}