import json
import re
from bs4 import BeautifulSoup
import requests

urls = [
    'https://gobeyondtravel.com.mx/tours/excursion-a-isla-holbox/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-monte-alban-y-cuilapam/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-las-cascadas-magicas-de-copalitilla/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-hierve-el-agua-copy/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-hierve-el-agua/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-monte-alban-arrazola-y-san-bartolo-coyotepec/',
    'https://gobeyondtravel.com.mx/tours/excursion-todo-incluido-a-xcaret-desde-cancun/',
    'https://gobeyondtravel.com.mx/tours/snorkel-en-el-santuario-de-tortugas-de-cozumel/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-isla-mujeres-en-catamaran/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-cozumel/',
    'https://gobeyondtravel.com.mx/tours/excursion-nocturna-a-chichen-itza-con-show-de-luz-y-sonido/',
    'https://gobeyondtravel.com.mx/tours/crucero-nocturno-con-cena-y-espectaculo/',
    'https://gobeyondtravel.com.mx/tours/excursion-a-majahuitas-y-yelapa/',
    'https://gobeyondtravel.com.mx/tours/autobus-turistico-de-puerto-vallarta/',
    'https://gobeyondtravel.com.mx/tours/senderismo-por-playas-escondidas-snorkel-en-colomitos/',
    'https://gobeyondtravel.com.mx/tours/liberacion-de-tortugas-en-los-cabos/',
    'https://gobeyondtravel.com.mx/tours/entrada-al-santuario-animal-y-aqua-park/',
    'https://gobeyondtravel.com.mx/tours/snorkel-en-los-cabos/',
    'https://gobeyondtravel.com.mx/tours/paseo-en-camello-por-el-desierto-y-playa/',
    'https://gobeyondtravel.com.mx/tours/paseo-en-barco-transparente-por-los-cabos/',
    'https://gobeyondtravel.com.mx/tours/taller-de-alebrijes-en-san-martin-tilcajete/',
    'https://gobeyondtravel.com.mx/tours/tour-a-puebla-y-valquirico/',
    'https://gobeyondtravel.com.mx/tours/espectaculo-de-mariachis-en-la-plaza-garibaldi/',
    'https://gobeyondtravel.com.mx/tours/espectaculo-de-lucha-libre-en-arena-mexico/',
    'https://gobeyondtravel.com.mx/tours/paseo-en-globo-sobre-teotihuacan-con-visita-a-la-basilica-de-guadalupe/',
    'https://gobeyondtravel.com.mx/tours/tour-al-vinedo-de-san-miguel-de-allende/',
    'https://gobeyondtravel.com.mx/tours/tour-al-cerro-del-cubilete-y-monumento-a-cristo-rey/',
    'https://gobeyondtravel.com.mx/tours/tour-nocturno-con-la-tuna-de-guanajuato/',
    'https://gobeyondtravel.com.mx/tours/tour-por-guanajuato-museo-de-las-momias/',
    'https://gobeyondtravel.com.mx/tours/tour-privado-por-guanajuato/',
    'https://gobeyondtravel.com.mx/tours/excursion-por-los-pueblos-de-la-independencia-mexicana/'
]



# Cabecera para simular un navegador real y evitar bloqueos (403)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def clean_text(text):
    """Limpia espacios en blanco, tabulaciones y saltos de línea repetidos."""
    if not text:
        return ""
    # Reemplazar múltiples espacios o saltos de línea por uno solo, y quitar extremos
    return re.sub(r"\s+", " ", text).strip()


def parse_description_to_markdown(html_block):
    """Extrae el texto de la descripción y le da formato Markdown buscando

    palabras clave como Incluye, No incluye, Importante, etc.
    """
    if not html_block:
        return ""

    # Obtenemos las líneas de texto limpias del contenedor
    lines = [clean_text(line) for line in html_block.stripped_strings if line]

    markdown_lines = []

    for line in lines:
        # Detectar palabras clave para ponerlas en negrita o crear encabezados/listas
        line_lower = line.lower()

        if line_lower.startswith("incluye:"):
            # Reemplazar por formato Markdown en negrita
            markdown_lines.append(f"\n**Incluye:** {line[8:].strip()}")
        elif line_lower.startswith("no incluye:"):
            markdown_lines.append(f"\n**No incluye:** {line[11:].strip()}")
        elif line_lower.startswith("importante:"):
            markdown_lines.append(f"\n### Importante:\n{line[11:].strip()}")
        elif "duración" in line_lower:
            markdown_lines.append(f"\n*{line}*")
        else:
            # Párrafo normal
            markdown_lines.append(line)

    # Unir todo con saltos de línea adecuados
    return "\n".join(markdown_lines).strip()


# Diccionario principal para almacenar los resultados
tours_data = {}

for index, url in enumerate(urls, start=1):
    print(f"Scrapeando ({index}/{len(urls)}): {url}")
    try:
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            print(f"Error al acceder a la URL: Código {response.status_code}")
            continue

        soup = BeautifulSoup(response.text, "html.parser")

        # --- Obtención del Título ---
        title_div = soup.select_one("div.tf-head-title h1")
        title = clean_text(title_div.text) if title_div else "No encontrado"

        # --- Obtención del Precio ---
        # Buscamos el texto dentro del párrafo ignorando el 'Desde' si está en un span
        price_div = soup.select_one("div.tf-booking-price p")
        if price_div:
            # Reemplazamos el texto del span 'Desde' para quedarnos solo con el número
            span_text = (
                price_div.span.text if price_div.span else "Desde"
            )  # Por si cambia el idioma
            raw_price = price_div.text.replace(span_text, "")
            price = clean_text(raw_price)
        else:
            price = "No encontrado"

        # --- Obtención de la Duración ---
        duration_div = soup.select_one("div.tf-feature-block-details p")
        duration = (
            clean_text(duration_div.text) if duration_div else "No encontrado"
        )

        # --- Obtención de la Descripción en Markdown ---
        description_div = soup.select_one("div.tf-trip-description")
        description_md = parse_description_to_markdown(description_div)

        # Guardar en la estructura del diccionario usando el slug o título como clave
        slug = url.split("/tours/")[1].replace("/", "")
        tours_data[slug] = {
            "url": url,
            "titulo": title,
            "precio": price,
            "duracion": duration,
            "descripcion_markdown": description_md,
        }

    except Exception as e:
        print(f"Ocurrió un error con la URL {url}: {e}")

# 2. Guardar el diccionario en formato JSON
output_filename = "resultado_tours.json"
with open(output_filename, "w", encoding="utf-8") as json_file:
    json.dump(tours_data, json_file, ensure_ascii=False, indent=4)

print(f"\n¡Proceso terminado! Datos guardados en '{output_filename}'")