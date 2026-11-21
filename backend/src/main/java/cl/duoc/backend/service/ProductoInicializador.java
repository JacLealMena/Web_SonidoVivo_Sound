package cl.duoc.backend.service;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import cl.duoc.backend.model.EnumCategoria;
import cl.duoc.backend.model.Producto;
import cl.duoc.backend.repository.ProductoRepository;

@Component
public class ProductoInicializador implements ApplicationRunner {

    private final ProductoRepository productoRepository;
    private final JdbcTemplate jdbcTemplate;

    public ProductoInicializador(ProductoRepository productoRepository, JdbcTemplate jdbcTemplate) {
        this.productoRepository = productoRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments arguments) {
        jdbcTemplate.execute("ALTER TABLE productos MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT");
        crear("GA001","Guitarra Acústica Folk","Yamaha","F310",8,129990,"Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",EnumCategoria.GUITARRAS_ACUSTICAS);
        crear("GA002","Guitarra Acústica Dreadnought","Fender","CD-60S",5,189990,"Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.",EnumCategoria.GUITARRAS_ACUSTICAS);
        crear("GA003","Guitarra Acústica Clásica 4/4","Yamaha","C40",10,89990,"Nailon, tapa de abeto. Ideal para estudio y flamenco.",EnumCategoria.GUITARRAS_ACUSTICAS);
        crear("GA004","Guitarra Electroacústica","Takamine","GN20CE",3,349990,"Pickup integrado, afinador incorporado.",EnumCategoria.GUITARRAS_ACUSTICAS);
        crear("GA005","Guitarra 3/4 Niños","Yamaha","JR1",6,79990,"Tamaño reducido para niños de 6 a 10 años.",EnumCategoria.GUITARRAS_ACUSTICAS);
        crear("GE001","Guitarra Eléctrica Stratocaster","Squier","Affinity Strat",5,249990,"Cuerpo de álamo, mástil de arce, pastillas SSS.",EnumCategoria.GUITARRAS_ELECTRICAS);
        crear("GE002","Guitarra Eléctrica Les Paul","Epiphone","Les Paul Std",4,329990,"Cuerpo caoba, tapa arce, pastillas humbucker.",EnumCategoria.GUITARRAS_ELECTRICAS);
        crear("GE003","Guitarra Eléctrica SG","Epiphone","SG Standard",3,319990,"Cuerpo caoba, mástil caoba, 2 humbuckers.",EnumCategoria.GUITARRAS_ELECTRICAS);
        crear("GE004","Guitarra Eléctrica Telecaster","Squier","Affinity Tele",4,239990,"Cuerpo álamo, clavijero vintage, 2 pastillas single.",EnumCategoria.GUITARRAS_ELECTRICAS);
        crear("GE005","Guitarra Eléctrica Semi-hollow","Epiphone","ES-335",2,549990,"Semi-hueca, 2 humbuckers, ideal para jazz y blues.",EnumCategoria.GUITARRAS_ELECTRICAS);
        crear("BA001","Bajo Eléctrico 4 Cuerdas","Squier","Affinity PJ",5,299990,"Pickup PJ, cuerpo álamo, mástil arce.",EnumCategoria.BAJOS_ELECTRICOS);
        crear("BA002","Bajo Eléctrico Jazz Bass","Fender","Player Jazz",2,699990,"Alder body, 2 Alnico V Jazz single-coil.",EnumCategoria.BAJOS_ELECTRICOS);
        crear("BA003","Bajo Acústico 4 Cuerdas","Yamaha","APX700II",2,429990,"Electroacústico, afinador incorporado.",EnumCategoria.BAJOS_ELECTRICOS);
        crear("BT001","Batería Acústica 5 piezas","Pearl","Roadshow",2,599990,"Incluye stands, platillos y pedal de bombo.",EnumCategoria.BATERIAS);
        crear("BT002","Batería Electrónica 8 pads","Roland","TD-02KV",2,799990,"Módulo TD-02, 8 pads de goma, pedal hi-hat.",EnumCategoria.BATERIAS);
        crear("BT003","Caja Snare 14\"","Pearl","STE1450",4,89990,"Acero, 14x5\", 10 tensores.",EnumCategoria.BATERIAS);
        crear("BT004","Platillo Hi-Hat 14\"","Zildjian","A Series",3,149990,"Latón B20, sonido brillante y claro.",EnumCategoria.BATERIAS);
        crear("BT005","Platillo Crash 16\"","Zildjian","A Series",3,129990,"Latón B20, ataque rápido.",EnumCategoria.BATERIAS);
        crear("TC001","Teclado Digital 61 teclas","Yamaha","PSR-E373",4,249990,"61 teclas sensibles al tacto, 622 voces.",EnumCategoria.TECLADOS_Y_PIANOS);
        crear("TC002","Piano Digital 88 teclas","Yamaha","P-45",2,499990,"88 teclas pesadas, 10 voces, pedal sustain incluido.",EnumCategoria.TECLADOS_Y_PIANOS);
        crear("TC003","Sintetizador 49 teclas","Arturia","MiniLab MKII",5,129990,"MIDI controller, 49 mini teclas.",EnumCategoria.TECLADOS_Y_PIANOS);
        crear("TC004","Teclado MIDI 88 teclas","M-Audio","Hammer 88",2,399990,"88 teclas martillo, sin sonidos propios.",EnumCategoria.TECLADOS_Y_PIANOS);
        crear("AM001","Amplificador Guitarra 15W","Fender","Frontman 15G",5,99990,"15W, distorsión incorporada, entrada auxiliar.",EnumCategoria.AMPLIFICADORES);
        crear("AM002","Amplificador Guitarra 40W","Marshall","MG40GFX",3,299990,"40W, 4 canales, efectos digitales integrados.",EnumCategoria.AMPLIFICADORES);
        crear("AM003","Amplificador Bajo 100W","Hartke","HD100",2,449990,"100W, tweeter integrado, ecualizador de 4 bandas.",EnumCategoria.AMPLIFICADORES);
        crear("AM004","Amplificador Acústico 40W","Fishman","Loudbox Mini",2,499990,"60W, 2 canales, reverb y chorus incorporados.",EnumCategoria.AMPLIFICADORES);
        crear("MI001","Micrófono Dinámico Cardioide","Shure","SM58",8,149990,"Estándar industria para voz en vivo.",EnumCategoria.MICROFONOS);
        crear("MI002","Micrófono Dinámico Instrumento","Shure","SM57",6,139990,"Ideal para captura de instrumentos y amplificadores.",EnumCategoria.MICROFONOS);
        crear("MI003","Micrófono Condensador","Audio-Tech.","AT2020",4,199990,"Cardioide, XLR, ideal para grabación en estudio.",EnumCategoria.MICROFONOS);
        crear("MI004","Micrófono USB de Condensador","Blue","Yeti",5,299990,"USB, 4 patrones polares, ideal para streaming y podcast.",EnumCategoria.MICROFONOS);
        crear("PE001","Pedal Distorsión","Boss","DS-1",7,79990,"Clásico pedal de distorsión, 3 controles.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("PE002","Pedal Reverb","Boss","RV-6",4,179990,"8 modos de reverb, control de shimmer.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("PE003","Pedal Multi-efectos","Boss","ME-80",2,349990,"Diseño tipo pedalboard, 8 efectos simultáneos.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("PE004","Pedal Tuner Cromático","Boss","TU-3",8,89990,"Afinador cromático, indicador de tono.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("PE005","Pedal Delay","MXR","Carbon Copy",4,179990,"Delay analógico cálido, tiempo 600ms.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("PE006","Pedal Overdrive","Ibanez","TS9",6,99990,"Tube Screamer clásico, sonido suave y orgánico.",EnumCategoria.PEDALES_DE_EFECTOS);
        crear("AC001","Cuerdas Guitarra Eléctrica 09-42","Ernie Ball","Super Slinky",25,8990,"Juego 6 cuerdas, calibre ligero.",EnumCategoria.ACCESORIOS);
        crear("AC002","Cuerdas Guitarra Acústica 12-53","Ernie Ball","Earthwood",20,10990,"Bronce fósforo, sonido cálido.",EnumCategoria.ACCESORIOS);
        crear("AC003","Cuerdas Bajo 45-105","Ernie Ball","Regular Slinky",12,14990,"Cuerdas de níquel enrollado, set 4 cuerdas.",EnumCategoria.ACCESORIOS);
        crear("AC004","Púas de Guitarra x10 (0.73mm)","Fender","351",50,3990,"Celulosa, grosor medio.",EnumCategoria.ACCESORIOS);
        crear("AC005","Capotraste Guitarra","Dunlop","Trigger",15,12990,"Capotraste de resorte, compatible 6 cuerdas.",EnumCategoria.ACCESORIOS);
        crear("AC006","Afinador de Clip","Snark","SN-5",20,8990,"Afinador cromático de clip, pantalla giratoria.",EnumCategoria.ACCESORIOS);
        crear("AC007","Cable Instrumento 3m","Monster","S100-I-3",15,12990,"Cable trenzado, conectores dorados, 3 metros.",EnumCategoria.ACCESORIOS);
        crear("AC008","Cable Instrumento 6m","Monster","S100-I-6",10,17990,"Cable trenzado, conectores dorados, 6 metros.",EnumCategoria.ACCESORIOS);
        crear("AC009","Soporte Guitarra de Piso","Hercules","GS302B",12,22990,"Soporte plegable con enganche automático.",EnumCategoria.ACCESORIOS);
        crear("AC010","Soporte Guitarra de Pared","Hercules","WAH-202",10,18990,"Montaje a pared, enganche automático.",EnumCategoria.ACCESORIOS);
        crear("ES001","Interfaz de Audio 2x2 USB","Focusrite","Scarlett Solo",4,149990,"1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.",EnumCategoria.ESTUDIO_Y_GRABACION);
        crear("ES002","Auriculares de Estudio","Audio-Tech.","ATH-M20x",6,79990,"Circumaurales, respuesta 15Hz-20kHz.",EnumCategoria.ESTUDIO_Y_GRABACION);
        crear("ES003","Auriculares de Estudio Pro","Audio-Tech.","ATH-M50x",4,219990,"Referencia de industria, sonido neutro y detallado.",EnumCategoria.ESTUDIO_Y_GRABACION);
        crear("ES004","Monitor de Estudio 5\"","Yamaha","HS5",2,349990,"Altavoz activo, respuesta plana, ideal mezcla.",EnumCategoria.ESTUDIO_Y_GRABACION);
        crear("ES005","Pop Filter para Micrófono","Sennheiser","MZP 40",8,14990,"Doble malla, brazo flexible con clip.",EnumCategoria.ESTUDIO_Y_GRABACION);
    }

    private void crear(String codigo, String nombre, String marca, String modelo, int stock, int precio,
                       String descripcion, EnumCategoria categoria) {
        if (productoRepository.findByCodigo(codigo) != null) return;
        Producto producto = new Producto();
        producto.setCodigo(codigo);
        producto.setNombre(nombre);
        producto.setMarca(marca);
        producto.setModelo(modelo);
        producto.setStock(stock);
        producto.setStockCritico(Math.max(1, stock / 4));
        producto.setPrecio(precio);
        producto.setDescripcion(descripcion);
        producto.setCategoria(categoria);
        producto.setImagen(imagenCategoria(categoria));
        productoRepository.save(producto);
    }

    private String imagenCategoria(EnumCategoria categoria) {
        return switch (categoria) {
            case GUITARRAS_ACUSTICAS, GUITARRAS_ELECTRICAS, BAJOS_ELECTRICOS ->
                    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80";
            case BATERIAS ->
                    "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80";
            case TECLADOS_Y_PIANOS ->
                    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80";
            case AMPLIFICADORES ->
                    "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80";
            case MICROFONOS ->
                    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
            case PEDALES_DE_EFECTOS ->
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80";
            case ACCESORIOS ->
                    "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80";
            case ESTUDIO_Y_GRABACION ->
                    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80";
        };
    }
}
