import * as terser from "terser";
import CleanCSS from "clean-css";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

console.log("Script iniciado");

// Configuración de Terser
const terserConfig = {
    compress: {
        drop_console: false,
    },
    mangle: true,
};

// Configuración de CleanCSS
const cleanCSSConfig = {
    level: 2,
};

// Función para minificar archivos JS
const minifyJS = async (file) => {
    const output = file.replace(/\.js$/, ".min.js");
    const code = fs.readFileSync(file, "utf8");
    const minified = await terser.minify(code, terserConfig);

    if (minified.error) {
        console.error(`Error minificando ${file}:`, minified.error);
        return;
    }

    if (!minified.code) {
        console.error(`Minificación fallida para ${file}: código minificado es undefined`);
        return;
    }

    fs.writeFileSync(output, minified.code);
};

// Función para minificar archivos CSS
const minifyCSS = (file) => {
    const output = file.replace(/\.css$/, ".min.css");
    const code = fs.readFileSync(file, "utf8");
    const minified = new CleanCSS(cleanCSSConfig).minify(code);

    if (minified.errors.length > 0) {
        console.error(`Error minificando ${file}:`, minified.errors);
        return;
    }

    fs.writeFileSync(output, minified.styles);
};

// Obtener todos los archivos .js y .css
fg(["src/public/js/**/*.js", "src/public/css/**/*.css"])
    .then((files) => {
        console.log("Iniciando fast-glob...");

        if (!files || files.length === 0) {
            console.log("No se encontraron archivos.");
            return;
        }

        console.log("Archivos encontrados:", files);

        // Filtrar archivos .js que no sean .min.js y archivos .css que no sean .min.css
        files = files.filter((file) => !file.endsWith(".min.js") && !file.endsWith(".min.css"));
        console.log("Archivos filtrados:", files);

        // Minificar cada archivo
        files.forEach(async (file) => {
            if (file.endsWith(".js")) {
                await minifyJS(file);
            } else if (file.endsWith(".css")) {
                minifyCSS(file);
            }
        });
        console.log("Proceso finalizado.");
    })
    .catch((err) => {
        console.error("Error al buscar archivos:", err);
    });
