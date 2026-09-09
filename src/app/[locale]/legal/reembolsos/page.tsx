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
                <h1>Política de devoluciones y reembolsos</h1>

                <h2>Alcance de la política</h2>

                <p>
                    La presente política establece las condiciones bajo las cuales los clientes
                    de{' '}<strong>HABITA TRAVEL S.A. DE C.V.</strong>{' '}(en adelante,
                    “<strong>Destino Privado</strong>”), con domicilio en
{' '}<strong>
                        Avenida Insurgentes Sur N°730, Piso 1, Oficina 234, Colonia del Valle
                        Centro, Alcaldía Benito Juárez, C.P. 03100, Ciudad de México
                    </strong>,
                    podrán solicitar la cancelación de servicios turísticos y, en su caso, la
                    devolución parcial o total de las cantidades previamente pagadas.
                </p>

                <p>
                    Esta política aplica a todos los tours, excursiones, experiencias
                    gastronómicas y actividades culturales reservadas a través del sitio web
{' '}<strong>Destino Privado</strong>, del correo
{' '}<strong>hola@destinoprivado.com</strong>{' '}o mediante acuerdos directos con
{' '}<strong>Destino Privado</strong>.
                </p>

                <h2>Naturaleza de los servicios turísticos</h2>

                <p>
                    El cliente reconoce que los servicios ofrecidos por
{' '}<strong>Destino Privado</strong>{' '}implican la coordinación con múltiples
                    proveedores locales, incluyendo guías certificados, transportistas,
                    recintos turísticos, restaurantes y operadores de actividades.
                </p>

                <p>
                    Debido a esta naturaleza, la contratación de cada experiencia involucra
                    gastos previos de reservación, coordinación y logística que, en muchos
                    casos, no son recuperables.
                </p>

                <p>
                    Por ello, los reembolsos no son automáticos y estarán sujetos a los
                    términos de esta política, procurando siempre un equilibrio justo entre los
                    intereses del viajero y los compromisos de
{' '}<strong>Destino Privado</strong>{' '}con sus proveedores.
                </p>

                <h2>Cancelación por parte del cliente</h2>

                <ol>
                    <li>
{' '}<strong>Con al menos 72 horas de anticipación:</strong>
{' '}                        el cliente podrá solicitar la cancelación de su reservación, procediendo
                        un reembolso parcial del monto pagado, deduciendo los gastos
                        administrativos, comisiones bancarias y cualquier penalización impuesta
                        por el proveedor local.
                    </li>

                    <li>
{' '}<strong>Con menos de 72 horas de anticipación:</strong>
{' '}                        no habrá reembolso, salvo que se trate de casos excepcionales debidamente
                        justificados (enfermedad grave, imprevistos mayores), mismos que serán
                        analizados individualmente por{' '}<strong>Destino Privado</strong>.
                    </li>

                    <li>
{' '}<strong>No presentación el día del servicio (no show):</strong>
{' '}                        en caso de que el cliente no se presente en el punto y hora acordados sin
                        previo aviso, no habrá lugar a reembolso alguno.
                    </li>
                </ol>

                <h2>Cancelación por parte de Destino Privado o proveedores</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}se reserva el derecho de cancelar o reprogramar
                    un tour en los siguientes casos:
                </p>

                <ul>
                    <li>
                        Condiciones climáticas adversas que pongan en riesgo la seguridad de los
                        participantes.
                    </li>

                    <li>
                        Cierres de recintos turísticos, disposiciones de autoridades locales o
                        eventos de fuerza mayor.
                    </li>

                    <li>
                        Fallas logísticas imputables a los proveedores locales.
                    </li>
                </ul>

                <p>En tales situaciones, el cliente podrá optar por:</p>

                <ol>
                    <li>
                        Reprogramar la actividad para una nueva fecha sin costo adicional.
                    </li>

                    <li>
                        Recibir un reembolso total o parcial, dependiendo de la naturaleza del
                        servicio y los gastos ya incurridos.
                    </li>
                </ol>

                <h2>Procedimiento para solicitar cancelación o reembolso</h2>

                <p>
                    El cliente deberá enviar un correo electrónico a
{' '}<strong>hola@destinoprivado.com</strong>{' '}con el asunto
                    “Solicitud de Cancelación/Reembolso”, incluyendo:
                </p>

                <ul>
                    <li>Nombre completo y datos de la reservación.</li>
                    <li>Fecha y nombre del tour reservado.</li>
                    <li>Motivo de la cancelación.</li>
                </ul>

                <p>
{' '}<strong>Destino Privado</strong>{' '}acusará recibo de la solicitud y dará respuesta
                    en un plazo máximo de{' '}<strong>10 días hábiles</strong>, confirmando si
                    procede o no el reembolso.
                </p>

                <h2>Forma de devolución</h2>

                <p>Cuando proceda un reembolso, este se realizará mediante:</p>

                <ul>
                    <li>
{' '}<strong>Devolución a la misma tarjeta bancaria</strong>{' '}
                        (crédito o débito) con la que se realizó la compra, sujeto a los tiempos
                        de procesamiento de la institución emisora, los cuales pueden variar de 5
                        a 30 días hábiles.
                    </li>

                    <li>
{' '}<strong>Transferencia bancaria</strong>{' '}
                        a nombre del cliente titular de la reservación, siempre que este
                        proporcione la cuenta correspondiente.
                    </li>
                </ul>

                <p>
{' '}<strong>Destino Privado</strong>{' '}no será responsable por retrasos ocasionados
                    por bancos, pasarelas de pago u otros intermediarios financieros.
                </p>

                <h2>Situaciones en las que no aplica reembolso</h2>

                <p>No se otorgarán reembolsos en los siguientes supuestos:</p>

                <ul>
                    <li>
                        Cuando el cliente omita información relevante para la correcta prestación
                        del servicio (ejemplo: restricciones médicas, alergias, necesidades
                        especiales) y ello impida su participación.
                    </li>

                    <li>
                        Cuando el cliente incumpla las reglas de seguridad, puntualidad o
                        conducta establecidas por los guías y operadores.
                    </li>

                    <li>
                        Cuando se soliciten cambios de último minuto que no puedan ser cubiertos
                        por disponibilidad o logística.
                    </li>

                    <li>
                        Cuando el cliente haya iniciado o utilizado parcialmente el servicio.
                    </li>
                </ul>

                <h2>Contacto</h2>

                <p>
                    Para dudas, aclaraciones o solicitudes relacionadas con esta política, el
                    cliente podrá escribir al correo
{' '}<strong>hola@destinoprivado.com</strong>{' '}o acudir directamente al domicilio de
                    Destino Privado en
{' '}<strong>
                        Avenida Insurgentes Sur N°730, Piso 1, Oficina 234, Colonia del Valle
                        Centro, Alcaldía Benito Juárez, C.P. 03100, Ciudad de México
                    </strong>.
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
                <h1>Return and Refund Policy</h1>

                <h2>Scope of the Policy</h2>

                <p>
                    This policy establishes the conditions under which clients of
{' '}<strong>HABITA TRAVEL S.A. DE C.V.</strong>{' '}(hereinafter,
                    “<strong>Destino Privado</strong>”), with registered address at
{' '}<strong>
                        Avenida Insurgentes Sur No. 730, Floor 1, Office 234, Colonia del Valle
                        Centro, Benito Juárez Borough, ZIP Code 03100, Mexico City
                    </strong>,
                    may request the cancellation of tourism services and, where applicable, the
                    partial or total refund of previously paid amounts.
                </p>

                <p>
                    This policy applies to all tours, excursions, gastronomic experiences, and
                    cultural activities booked through the
{' '}<strong>Destino Privado</strong>{' '}website, via email at
{' '}<strong>hola@destinoprivado.com</strong>, or through direct agreements with
{' '}<strong>Destino Privado</strong>.
                </p>

                <h2>Nature of Tourism Services</h2>

                <p>
                    The customer acknowledges that the services offered by
{' '}<strong>Destino Privado</strong>{' '}involve coordination with multiple local
                    providers, including certified guides, transportation companies, tourist
                    venues, restaurants, and activity operators.
                </p>

                <p>
                    Due to this nature, the booking of each experience involves prior
                    reservation, coordination, and logistics costs that, in many cases, are
                    non-refundable.
                </p>

                <p>
                    Therefore, refunds are not automatic and will be subject to the terms of
                    this policy, always seeking a fair balance between the interests of the
                    traveler and the commitments of{' '}<strong>Destino Privado</strong>{' '}with its
                    providers.
                </p>

                <h2>Cancellation by the Customer</h2>

                <ol>
                    <li>
{' '}<strong>At least 72 hours in advance:</strong>
{' '}                        the customer may request the cancellation of their reservation, in which
                        case a partial refund of the amount paid may apply, deducting
                        administrative costs, banking commissions, and any penalties imposed by
                        the local provider.
                    </li>

                    <li>
{' '}<strong>Less than 72 hours in advance:</strong>
{' '}                        no refund will apply, except in duly justified exceptional cases (serious
                        illness, major unforeseen events), which will be individually reviewed by
{' '}<strong>Destino Privado</strong>.
                    </li>

                    <li>
{' '}<strong>No-show on the day of the service:</strong>
{' '}                        if the customer fails to appear at the agreed meeting point and time
                        without prior notice, no refund will be granted.
                    </li>
                </ol>

                <h2>Cancellation by Destino Privado or Providers</h2>

                <p>
{' '}<strong>Destino Privado</strong>{' '}reserves the right to cancel or reschedule a
                    tour in the following cases:
                </p>

                <ul>
                    <li>
                        Adverse weather conditions that may put participants’ safety at risk.
                    </li>

                    <li>
                        Closure of tourist venues, local authority regulations, or force majeure
                        events.
                    </li>

                    <li>
                        Logistical failures attributable to local providers.
                    </li>
                </ul>

                <p>In such situations, the customer may choose to:</p>

                <ol>
                    <li>
                        Reschedule the activity for a new date at no additional cost.
                    </li>

                    <li>
                        Receive a full or partial refund, depending on the nature of the service
                        and any expenses already incurred.
                    </li>
                </ol>

                <h2>Procedure to Request Cancellation or Refund</h2>

                <p>
                    The customer must send an email to
{' '}<strong>hola@destinoprivado.com</strong>{' '}with the subject line
                    “Cancellation/Refund Request”, including:
                </p>

                <ul>
                    <li>Full name and reservation details.</li>
                    <li>Date and name of the booked tour.</li>
                    <li>Reason for cancellation.</li>
                </ul>

                <p>
{' '}<strong>Destino Privado</strong>{' '}will acknowledge receipt of the request and
                    respond within a maximum period of
{' '}<strong>10 business days</strong>, confirming whether or not the refund
                    applies.
                </p>

                <h2>Refund Method</h2>

                <p>When applicable, refunds will be processed through:</p>

                <ul>
                    <li>
{' '}<strong>Refund to the same bank card</strong>
{' '}                        (credit or debit) used for the purchase, subject to the issuing
                        institution’s processing times, which may vary from 5 to 30 business
                        days.
                    </li>

                    <li>
{' '}<strong>Bank transfer</strong>
{' '}                        in the name of the customer who made the reservation, provided that the
                        corresponding account information is supplied.
                    </li>
                </ul>

                <p>
{' '}<strong>Destino Privado</strong>{' '}shall not be responsible for delays caused by
                    banks, payment gateways, or other financial intermediaries.
                </p>

                <h2>Situations Where Refunds Do Not Apply</h2>

                <p>Refunds will not be granted in the following cases:</p>

                <ul>
                    <li>
                        When the customer omits relevant information necessary for the proper
                        provision of the service (for example: medical restrictions, allergies,
                        special needs) and this prevents their participation.
                    </li>

                    <li>
                        When the customer fails to comply with the safety, punctuality, or
                        conduct rules established by guides and operators.
                    </li>

                    <li>
                        When last-minute changes are requested and cannot be accommodated due to
                        availability or logistical limitations.
                    </li>

                    <li>
                        When the customer has already started or partially used the service.
                    </li>
                </ul>

                <h2>Contact</h2>

                <p>
                    For questions, clarifications, or requests related to this policy, the
                    customer may contact
{' '}<strong>hola@destinoprivado.com</strong>{' '}or visit Destino Privado directly at
{' '}<strong>
                        Avenida Insurgentes Sur No. 730, Floor 1, Office 234, Colonia del Valle
                        Centro, Benito Juárez Borough, ZIP Code 03100, Mexico City
                    </strong>.
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