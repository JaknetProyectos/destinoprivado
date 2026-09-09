"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LegalEs() {
    return (
        <div className="legal-container">
            <style dangerouslySetInnerHTML={{
                __html: `
        .legal-container {
          color: #1a1a1a;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3048ab; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
        .legal-container section { margin-bottom: 3rem; }
      `}} />

            <section>
                <h1>Términos y Condiciones</h1>

                <p>
                    El presente documento establece los términos bajo los cuales{' '}<strong>HABITA TRAVEL S.A. DE C.V.</strong>{' '}(en adelante,
                     “<strong>Destino Privado</strong>”), presta sus servicios turísticos en México
                    bajo la marca comercial{' '}<strong>Destino Privado</strong>.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}se encuentra legalmente constituida en México y
                    tiene su domicilio en{' '}<strong>
                        Avenida Insurgentes Sur N°730, Piso 1, Oficina 234, Colonia del Valle
                        Centro, Alcaldía Benito Juárez, C.P. 03100, Ciudad de México
                    </strong>,
                    siendo su correo oficial de contacto
{' '}<strong>hola@destinoprivado.com</strong>.
                </p>

                <p>
                    A través de este portal y de sus canales de comunicación autorizados,
{' '}<strong>Destino Privado</strong>{' '}facilita al viajero un catálogo de experiencias,
                    tours, excursiones y actividades diseñadas para acercar al público nacional
                    e internacional a la riqueza cultural, histórica, gastronómica y natural de
                    nuestro país.
                </p>

                <h2>Condiciones generales de uso del sitio web</h2>

                <p>
                    El acceso al sitio web de{' '}<strong>Destino Privado</strong>{' '}implica que el usuario
                    acepta utilizarlo única y exclusivamente para fines lícitos relacionados con
                    la planeación y reservación de experiencias turísticas.
                </p>

                <p>
                    El usuario se compromete a no emplear el portal para fines fraudulentos,
                    especulativos, de reventa no autorizada o que pudieran alterar la seguridad
                    de la plataforma.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}podrá, en cualquier momento, suspender el acceso
                    a usuarios que incumplan estas condiciones, así como cancelar reservaciones
                    que se hayan realizado mediante prácticas indebidas, sin responsabilidad
                    alguna más allá de la devolución de los montos legítimamente pagados en los
                    casos en que corresponda.
                </p>

                <h2>Servicios turísticos ofrecidos</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}ofrece un amplio portafolio de{' '}<strong>
                        tours, excursiones, experiencias gastronómicas y actividades culturales y
                        de aventura
                    </strong>,
                    todas ellas cuidadosamente seleccionadas para garantizar estándares de
                    calidad y seguridad.
                </p>

                <p>
                    Entre los servicios que se ponen a disposición del viajero destacan:
                </p>

                <ol>
                    <li>
{' '}<strong>
                            Excursiones guiadas en distintas ciudades y regiones de México
                        </strong>,
                        que incluyen visitas a zonas arqueológicas, recorridos por pueblos
                        mágicos, rutas históricas, tours culturales y caminatas interpretativas,
                        siempre acompañadas por guías certificados bilingües que brindan
                        información veraz, actualizada y culturalmente relevante.
                    </li>

                    <li>
{' '}<strong>Experiencias en destinos de playa y naturaleza</strong>,
                        tales como paseos en catamarán, snorkel en arrecifes protegidos,
                        avistamiento de fauna marina (delfines, tortugas, ballenas), visitas a
                        parques eco-arqueológicos, caminatas por reservas naturales y recorridos
                        en áreas de alta biodiversidad, todos organizados bajo criterios de
                        respeto al medio ambiente y con protocolos de seguridad para los
                        participantes.
                    </li>

                    <li>
{' '}<strong>Tours gastronómicos y culturales</strong>
{' '}                        que buscan acercar al viajero a la esencia de la cocina mexicana y a sus
                        tradiciones vivas. Estos recorridos incluyen degustaciones en mercados
                        tradicionales, visitas a talleres artesanales (alebrijes, barro negro,
                        textiles), experiencias de cocina local, catas de bebidas emblemáticas
                        como tequila y mezcal, así como espectáculos culturales en plazas,
                        recintos históricos o espacios naturales.
                    </li>

                    <li>
{' '}<strong>Actividades de aventura y recreación</strong>,
                        como paseos en globo aerostático sobre Teotihuacán, caminatas por montañas
                        y cascadas, recorridos en camello en Los Cabos, senderismo por playas
                        escondidas en el Pacífico, paseos en barco transparente, liberación de
                        tortugas y otras experiencias que combinan adrenalina, naturaleza y
                        contacto auténtico con los destinos.
                    </li>
                </ol>

                <p>
                    Cada tour o experiencia se describe en el sitio web con detalle de incluidos
                    y no incluidos, horarios, duración, precios, políticas específicas y
                    recomendaciones de participación (ejemplo: condición física necesaria, edad
                    mínima, equipo requerido).
                </p>

                <p>
                    El cliente es responsable de revisar dicha información antes de confirmar su
                    compra.
                </p>

                <h2>Reservaciones, disponibilidad y confirmación</h2>

                <p>
                    Las reservaciones podrán realizarse directamente a través del Sitio Web
{' '}<strong>Destino Privado</strong>, mediante los formularios en línea y las
                    pasarelas de pago autorizadas.
                </p>

                <p>
                    Una vez que el cliente elija la experiencia de su interés, complete sus
                    datos y efectúe el pago,{' '}<strong>Destino Privado</strong>{' '}verificará
                    disponibilidad con sus proveedores locales y, en caso de confirmarse,
                    enviará al cliente un comprobante electrónico que servirá como constancia
                    oficial de su reservación.
                </p>

                <p>
                    Dicho comprobante deberá presentarse el día de la actividad. En casos donde
                    no se pueda confirmar disponibilidad,{' '}<strong>Destino Privado</strong>{' '}notificará
                    al cliente y ofrecerá alternativas de fechas, actividades similares o la
                    devolución del monto pagado.
                </p>

                <h2>Precios, moneda e impuestos</h2>

                <p>
                    Todos los precios publicados en el Sitio Web se expresan en pesos mexicanos
                    (MXN) e incluyen el Impuesto al Valor Agregado (IVA) del 16%, salvo que
                    expresamente se indique lo contrario.
                </p>

                <p>
                    Los precios están sujetos a cambios sin previo aviso debido a variaciones en
                    costos de operación, tarifas de acceso a recintos, impuestos locales u otros
                    factores ajenos al control de{' '}<strong>Destino Privado</strong>.
                </p>

                <p>
                    No obstante, los precios confirmados al momento de la reserva serán
                    respetados en todo caso.
                </p>

                <h2>Pagos y medios aceptados</h2>

                <p>
                    El pago de las experiencias podrá realizarse mediante
{' '}<strong>tarjetas bancarias de crédito o débito</strong>
{' '}                    (Visa, Mastercard u otras autorizadas) y a través de pasarelas de pago
                    seguras.
                </p>

                <p>
                    El inicio del proceso de confirmación queda condicionado a la aceptación del
                    cargo por parte de la institución emisora.
                </p>

                <p>
                    En caso de que la transacción sea rechazada,
{' '}<strong>Destino Privado</strong>{' '}no garantiza que el servicio seleccionado
                    mantenga disponibilidad para una nueva fecha.
                </p>

                <p>
                    El cliente reconoce que el incumplimiento en el pago implica la cancelación
                    automática de la reservación sin responsabilidad para
{' '}<strong>Destino Privado</strong>.
                </p>

                <h2>Cambios solicitados por el cliente</h2>

                <p>
                    Si el cliente desea modificar la fecha de su reservación, cambiar el nombre
                    de los participantes o realizar cualquier otro ajuste, deberá solicitarlo
                    con al menos{' '}<strong>48 horas de anticipación</strong>{' '}a la realización del
                    tour.
                </p>

                <p>
                    Dichas modificaciones estarán sujetas a la disponibilidad de los proveedores
                    y, en su caso, al pago de cargos adicionales derivados de reprogramaciones,
                    boletos ya emitidos o servicios confirmados con terceros.
                </p>

                <p>
                    Una vez iniciado el servicio, no habrá posibilidad de realizar cambios ni de
                    reclamar devoluciones por servicios no utilizados.
                </p>

                <h2>Cancelaciones y reembolsos</h2>

                <p>
                    Las políticas de cancelación varían dependiendo del tipo de experiencia
                    contratada; sin embargo, de manera general se establece lo siguiente:
                </p>

                <ul>
                    <li>
                        Cancelaciones realizadas con
{' '}<strong>72 horas o más de anticipación</strong>
{' '}                        a la fecha del servicio podrán generar un reembolso parcial,
                        descontando gastos administrativos y comisiones bancarias.
                    </li>

                    <li>
                        Cancelaciones con
{' '}<strong>menos de 72 horas de anticipación</strong>
{' '}                        no serán reembolsables, salvo que la suspensión del servicio sea imputable
                        a{' '}<strong>Destino Privado</strong>{' '}o al proveedor local.
                    </li>

                    <li>
                        Si la cancelación es consecuencia de causas de fuerza mayor (ejemplo:
                        desastres naturales, cierre de recintos, decisiones de autoridad),
{' '}<strong>Destino Privado</strong>{' '}podrá ofrecer alternativas de reprogramación o
                        un reembolso parcial según corresponda.
                    </li>
                </ul>

                <p>
                    Los reembolsos se efectuarán al mismo medio de pago utilizado por el cliente
                    (tarjeta bancaria o transferencia), sujeto a los tiempos de procesamiento de
                    la institución financiera emisora, los cuales pueden variar de 5 a 30 días
                    hábiles.
                </p>

                <h2>Responsabilidades del viajero</h2>

                <p>
                    El cliente se obliga a llegar puntualmente al punto de encuentro señalado,
                    portar identificación oficial, llevar consigo el comprobante electrónico de
                    su reservación y cumplir con los requisitos específicos de cada actividad
                    (edad mínima, estado de salud, equipo sugerido).
                </p>

                <p>
                    Asimismo, deberá seguir las instrucciones de los guías y respetar tanto las
                    normas de seguridad como el entorno natural, cultural y social de los
                    destinos.
                </p>

                <p>
                    Cualquier omisión en estas obligaciones libera a
{' '}<strong>Destino Privado</strong>{' '}de responsabilidad sobre la experiencia.
                </p>

                <h2>Responsabilidad limitada de Destino Privado</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}actúa como intermediario entre el cliente y los
                    proveedores locales (transportistas, guías, recintos, restaurantes,
                    operadores de actividades), por lo que no será responsable por
                    eventualidades fuera de su control, tales como retrasos ocasionados por
                    tráfico, condiciones climáticas adversas, accidentes imputables a terceros,
                    huelgas, cierres de sitios turísticos o decisiones gubernamentales.
                </p>

                <p>
                    En ningún caso la responsabilidad de{' '}<strong>Destino Privado</strong>{' '}excederá el
                    monto efectivamente pagado por el cliente por la experiencia contratada.
                </p>

                <h2>Confidencialidad y datos personales</h2>

                <p>
                    La información personal que el cliente proporcione será tratada de manera
                    confidencial y conforme al{' '}<strong>Aviso de Privacidad</strong>{' '}disponible en
                    el Sitio Web.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}adopta medidas administrativas, técnicas y
                    físicas razonables para proteger los datos personales, comprometiéndose a no
                    divulgarlos a terceros salvo en los casos permitidos por la ley o
                    autorizados expresamente por el cliente.
                </p>

                <h2>Legislación aplicable y jurisdicción</h2>

                <p>
                    Los presentes Términos y Condiciones se regirán e interpretarán bajo las
                    leyes de los{' '}<strong>Estados Unidos Mexicanos</strong>.
                </p>

                <p>
                    Para la solución de controversias, las partes se someten a los tribunales
                    competentes de la{' '}<strong>Ciudad de México</strong>, renunciando a cualquier
                    otro fuero que pudiera corresponderles en razón de su domicilio presente o
                    futuro.
                </p>
            </section>
        </div>
    );
}

function LegalEn() {
    return (
        <div className="legal-container">
            <style dangerouslySetInnerHTML={{
                __html: `
        .legal-container {
          color: #1a1a1a;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3048ab; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
      `}} />

            <section>
                <h1>Terms and Conditions</h1>

                <p>
                    This document establishes the terms under which
{' '}<strong>HABITA TRAVEL S.A. DE C.V.</strong>{' '}(hereinafter,
                    “<strong>Destino Privado</strong>”), provides its tourism services in Mexico
                    under the commercial brand{' '}<strong>Destino Privado</strong>.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}is legally incorporated in Mexico and has its
                    registered address at
{' '}<strong>
                        Avenida Insurgentes Sur No. 730, Floor 1, Office 234, Colonia del Valle
                        Centro, Benito Juárez Borough, ZIP Code 03100, Mexico City
                    </strong>,
                    with the official contact email address
{' '}<strong>hola@destinoprivado.com</strong>.
                </p>

                <p>
                    Through this website and its authorized communication channels,
{' '}<strong>Destino Privado</strong>{' '}provides travelers with a catalog of
                    experiences, tours, excursions, and activities designed to bring both
                    national and international visitors closer to the cultural, historical,
                    gastronomic, and natural richness of Mexico.
                </p>

                <h2>General Conditions for Website Use</h2>

                <p>
                    Access to the{' '}<strong>Destino Privado</strong>{' '}website implies that the user
                    agrees to use it solely for lawful purposes related to the planning and
                    booking of tourism experiences.
                </p>

                <p>
                    The user agrees not to use the platform for fraudulent, speculative,
                    unauthorized resale purposes, or for any activity that could compromise the
                    platform’s security.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}may, at any time, suspend access for users who
                    violate these conditions, as well as cancel reservations made through
                    improper practices, without any liability beyond refunding the amounts
                    legitimately paid when applicable.
                </p>

                <h2>Tourism Services Offered</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}offers a wide portfolio of
{' '}<strong>
                        tours, excursions, gastronomic experiences, and cultural and adventure
                        activities
                    </strong>,
                    all carefully selected to ensure quality and safety standards.
                </p>

                <p>
                    The services available to travelers include:
                </p>

                <ol>
                    <li>
{' '}<strong>
                            Guided excursions in different cities and regions of Mexico
                        </strong>,
                        including visits to archaeological sites, tours through magical towns,
                        historical routes, cultural tours, and interpretive walks, always
                        accompanied by certified bilingual guides who provide accurate,
                        up-to-date, and culturally relevant information.
                    </li>

                    <li>
{' '}<strong>Beach and nature experiences</strong>,
                        such as catamaran rides, snorkeling in protected reefs, marine wildlife
                        watching (dolphins, turtles, whales), visits to eco-archaeological parks,
                        hikes through natural reserves, and tours in highly biodiverse areas, all
                        organized under environmental respect criteria and safety protocols for
                        participants.
                    </li>

                    <li>
{' '}<strong>Gastronomic and cultural tours</strong>
{' '}                        aimed at bringing travelers closer to the essence of Mexican cuisine and
                        its living traditions. These tours include tastings in traditional
                        markets, visits to artisan workshops (alebrijes, black clay pottery,
                        textiles), local cooking experiences, tastings of iconic beverages such
                        as tequila and mezcal, as well as cultural performances in plazas,
                        historical venues, or natural spaces.
                    </li>

                    <li>
{' '}<strong>Adventure and recreational activities</strong>,
                        such as hot air balloon rides over Teotihuacán, hikes through mountains
                        and waterfalls, camel rides in Los Cabos, hiking on hidden Pacific
                        beaches, transparent boat rides, sea turtle release activities, and other
                        experiences that combine adrenaline, nature, and authentic contact with
                        destinations.
                    </li>
                </ol>

                <p>
                    Each tour or experience is described in detail on the website, including
                    inclusions and exclusions, schedules, duration, prices, specific policies,
                    and participation recommendations (for example: required physical condition,
                    minimum age, required equipment).
                </p>

                <p>
                    The customer is responsible for reviewing such information before
                    confirming their purchase.
                </p>

                <h2>Reservations, Availability, and Confirmation</h2>

                <p>
                    Reservations may be made directly through the
{' '}<strong>Destino Privado</strong>{' '}website using online forms and authorized
                    payment gateways.
                </p>

                <p>
                    Once the customer selects the desired experience, completes their details,
                    and makes the payment,{' '}<strong>Destino Privado</strong>{' '}will verify availability
                    with its local providers and, if confirmed, will send the customer an
                    electronic voucher serving as official proof of reservation.
                </p>

                <p>
                    Such voucher must be presented on the day of the activity. In cases where
                    availability cannot be confirmed,{' '}<strong>Destino Privado</strong>{' '}will notify
                    the customer and offer alternative dates, similar activities, or a refund
                    of the amount paid.
                </p>

                <h2>Prices, Currency, and Taxes</h2>

                <p>
                    All prices published on the Website are expressed in Mexican pesos (MXN)
                    and include the 16% Value Added Tax (VAT), unless expressly stated
                    otherwise.
                </p>

                <p>
                    Prices are subject to change without prior notice due to variations in
                    operating costs, entrance fees, local taxes, or other factors beyond the
                    control of{' '}<strong>Destino Privado</strong>.
                </p>

                <p>
                    However, prices confirmed at the time of booking will always be honored.
                </p>

                <h2>Payments and Accepted Methods</h2>

                <p>
                    Payment for experiences may be made using
{' '}<strong>credit or debit cards</strong>
{' '}                    (Visa, Mastercard, or other authorized cards) through secure payment
                    gateways.
                </p>

                <p>
                    The reservation confirmation process is subject to approval of the charge
                    by the issuing financial institution.
                </p>

                <p>
                    If the transaction is declined,{' '}<strong>Destino Privado</strong>{' '}does not
                    guarantee that the selected service will remain available for a new date.
                </p>

                <p>
                    The customer acknowledges that failure to complete payment results in the
                    automatic cancellation of the reservation without liability for
{' '}<strong>Destino Privado</strong>.
                </p>

                <h2>Changes Requested by the Customer</h2>

                <p>
                    If the customer wishes to modify the reservation date, change participant
                    names, or make any other adjustment, they must request it at least
{' '}<strong>48 hours in advance</strong>{' '}of the scheduled tour.
                </p>

                <p>
                    Such modifications will be subject to provider availability and, where
                    applicable, payment of additional charges resulting from rescheduling,
                    issued tickets, or services confirmed with third parties.
                </p>

                <p>
                    Once the service has started, no changes or refunds for unused services
                    will be allowed.
                </p>

                <h2>Cancellation and Refund Policy</h2>

                <p>
                    Cancellation policies vary depending on the type of experience booked;
                    however, the following general conditions apply:
                </p>

                <ul>
                    <li>
                        Cancellations made
{' '}<strong>72 hours or more in advance</strong>
{' '}                        of the service date may qualify for a partial refund, minus
                        administrative fees and banking commissions.
                    </li>

                    <li>
                        Cancellations made with
{' '}<strong>less than 72 hours’ notice</strong>
{' '}                        are non-refundable unless the suspension of the service is attributable
                        to{' '}<strong>Destino Privado</strong>{' '}or the local provider.
                    </li>

                    <li>
                        If the cancellation results from force majeure events (for example:
                        natural disasters, venue closures, or government decisions),
{' '}<strong>Destino Privado</strong>{' '}may offer rescheduling alternatives or a
                        partial refund as applicable.
                    </li>
                </ul>

                <p>
                    Refunds will be processed using the same payment method used by the
                    customer (bank card or bank transfer), subject to the processing times of
                    the issuing financial institution, which may vary from 5 to 30 business
                    days.
                </p>

                <h2>Traveler Responsibilities</h2>

                <p>
                    The customer agrees to arrive on time at the designated meeting point,
                    carry official identification, bring the electronic booking voucher, and
                    comply with the specific requirements of each activity (minimum age, health
                    condition, recommended equipment).
                </p>

                <p>
                    Likewise, the customer must follow the instructions of the guides and
                    respect both safety regulations and the natural, cultural, and social
                    environment of the destinations.
                </p>

                <p>
                    Any failure to comply with these obligations releases
{' '}<strong>Destino Privado</strong>{' '}from liability regarding the experience.
                </p>

                <h2>Limited Liability of Destino Privado</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}acts as an intermediary between the customer and
                    local providers (transportation companies, guides, venues, restaurants, and
                    activity operators) and therefore shall not be liable for events beyond its
                    control, such as delays caused by traffic, adverse weather conditions,
                    accidents attributable to third parties, strikes, closures of tourist
                    sites, or governmental decisions.
                </p>

                <p>
                    In no event shall the liability of{' '}<strong>Destino Privado</strong>{' '}exceed the
                    amount actually paid by the customer for the contracted experience.
                </p>

                <h2>Confidentiality and Personal Data</h2>

                <p>
                    The personal information provided by the customer will be treated
                    confidentially and in accordance with the
{' '}<strong>Privacy Notice</strong>{' '}available on the Website.
                </p>

                <p>
{' '}<strong>Destino Privado</strong>{' '}adopts reasonable administrative, technical, and
                    physical measures to protect personal data and undertakes not to disclose
                    such data to third parties except in cases permitted by law or expressly
                    authorized by the customer.
                </p>

                <h2>Applicable Law and Jurisdiction</h2>

                <p>
                    These Terms and Conditions shall be governed by and interpreted in
                    accordance with the laws of the
{' '}<strong>United Mexican States</strong>.
                </p>

                <p>
                    For the resolution of disputes, the parties submit to the competent courts
                    of{' '}<strong>Mexico City</strong>, waiving any other jurisdiction that may
                    correspond to them by reason of their present or future domicile.
                </p>
            </section>
        </div>
    );
}

export default function LegalPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                {locale === "es" ? <LegalEs /> : <LegalEn />}
            </main>
            <Footer />
        </div>
    );
}