import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// CONSTANTES DE CONFIGURACIÓN Y MARCA
// ==========================================
const BRAND_NAME = "Destino Privado";
const CONTACT_EMAIL = "hola@destinoprivado.com";
const WEBSITE_URL = "https://destinoprivado.com";
const LOGO_URL = `${WEBSITE_URL}/email.png`;
const BEACH_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop";

// Paleta de colores de la marca
const COLOR_RED = "#c50413";
const COLOR_GREEN = "#035020";
const COLOR_GOLD = "#FFD700";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      mensaje,
      servicioDeseado,
      presupuesto,
      asunto,
    } = body;

    const currentYear = new Date().getFullYear();

    // ==========================================
    // 1. EMAIL CLIENTE (TEMÁTICA VERDE)
    // ==========================================
    await resend.emails.send({
      from: `${BRAND_NAME} <${CONTACT_EMAIL}>`,
      to: [email],
      subject: `Recibimos tu solicitud ✨ · ${BRAND_NAME}`,
      html: `
      <div style="margin:0; padding:30px 15px; background:#f2f7f4; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1a1a1a;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #e1ebe3; box-shadow:0 12px 32px rgba(3,80,32,0.08);">
          
          <!-- BANNER HERO -->
          <div style="background-image:linear-gradient(rgba(3,80,32,0.88), rgba(3,80,32,0.95)), url('${BEACH_IMAGE}'); background-size:cover; background-position:center; padding:40px 30px; text-align:center; color:#ffffff;">
            <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="48" height="48" style="display:block; margin:0 auto 16px; border-radius:12px; background:rgba(255,255,255,0.2); padding:6px; border:1px solid rgba(255,255,255,0.3);" />
            <span style="color:${COLOR_GOLD}; text-transform:uppercase; font-size:11px; font-weight:800; letter-spacing:2px; display:block; margin-bottom:6px;">Solicitud Confirmada</span>
            <h1 style="margin:0; font-size:28px; font-weight:900; line-height:1.2;">¡Gracias por escribirnos, ${nombre}!</h1>
            <p style="margin:12px 0 0; color:rgba(255,255,255,0.9); font-size:15px; line-height:1.5;">Hemos recibido tu mensaje correctamente. Nuestro equipo revisará los detalles para responderte lo antes posible.</p>
          </div>

          <!-- CUERPO -->
          <div style="padding:30px;">
            <div style="background:#f0f7f2; border-left:4px solid ${COLOR_GREEN}; border-radius:12px; padding:18px 20px; margin-bottom:20px;">
              <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:${COLOR_GREEN}; tracking:1px; display:block; margin-bottom:4px;">Asunto</span>
              <p style="margin:0; font-size:17px; font-weight:700; color:#0f2918;">${asunto || "Consulta general"}</p>
            </div>

            ${
              servicioDeseado || presupuesto
                ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                ${
                  servicioDeseado
                    ? `
                <td style="padding:12px; background:#f8faf9; border-radius:12px; border:1px solid #e1ebe3; vertical-align:top;">
                  <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:#555; display:block; margin-bottom:2px;">Servicio</span>
                  <span style="font-size:14px; font-weight:700; color:#1a1a1a;">${servicioDeseado}</span>
                </td>
                `
                    : ""
                }
                ${servicioDeseado && presupuesto ? `<td width="10"></td>` : ""}
                ${
                  presupuesto
                    ? `
                <td style="padding:12px; background:#f0f7f2; border-radius:12px; border:1px solid #cce3d2; vertical-align:top;">
                  <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:${COLOR_GREEN}; display:block; margin-bottom:2px;">Presupuesto</span>
                  <span style="font-size:14px; font-weight:800; color:${COLOR_GREEN};">${presupuesto}</span>
                </td>
                `
                    : ""
                }
              </tr>
            </table>
            `
                : ""
            }

            ${
              mensaje
                ? `
            <div style="background:#ffffff; border:1px solid #e1e6e3; border-radius:12px; padding:18px 20px; margin-bottom:26px;">
              <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:#666; display:block; margin-bottom:6px;">Tu Mensaje</span>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#333; white-space:pre-line;">${mensaje}</p>
            </div>
            `
                : ""
            }

            <!-- BOTÓN CTA -->
            <div style="text-align:center; margin-top:10px;">
              <a href="${WEBSITE_URL}" style="display:inline-block; background:${COLOR_GREEN}; color:#ffffff; text-decoration:none; font-weight:800; font-size:14px; padding:14px 28px; border-radius:30px; box-shadow:0 4px 14px rgba(3,80,32,0.25);">
                Explorar ${BRAND_NAME}
              </a>
            </div>
          </div>

          <!-- FOOTER CON LOGO -->
          <div style="padding:20px 30px; background:#f8faf9; border-top:1px solid #e1ebe3; text-align:center;">
            <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="28" height="28" style="display:block; margin:0 auto 8px; opacity:0.8;" />
            <p style="margin:0; font-size:12px; color:#777;">© ${currentYear} ${BRAND_NAME} · Todos los derechos reservados.</p>
          </div>

        </div>
      </div>
      `,
    });

    // ==========================================
    // 2. EMAIL NEGOCIO (TEMÁTICA ROJA)
    // ==========================================
    await resend.emails.send({
      from: `Notificaciones Web <${CONTACT_EMAIL}>`,
      to: [CONTACT_EMAIL],
      subject: `⚡ Nuevo lead: ${nombre} · ${asunto || "Sin asunto"}`,
      html: `
      <div style="margin:0; padding:30px 15px; background:#fcf2f2; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1a1a1a;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #f2d6d8; box-shadow:0 12px 32px rgba(197,4,19,0.08);">
          
          <!-- BANNER HERO -->
          <div style="background-image:linear-gradient(rgba(197,4,19,0.92), rgba(150,3,14,0.96)), url('${BEACH_IMAGE}'); background-size:cover; background-position:center; padding:32px 30px; color:#ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="color:${COLOR_GOLD}; text-transform:uppercase; font-size:11px; font-weight:800; letter-spacing:2px; display:block; margin-bottom:4px;">Notificación Interna</span>
                  <h1 style="margin:0; font-size:24px; font-weight:900; line-height:1.2;">Nuevo cliente potencial</h1>
                </td>
                <td width="48" align="right">
                  <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="40" height="40" style="display:block; border-radius:10px; background:rgba(255,255,255,0.2); padding:4px;" />
                </td>
              </tr>
            </table>
          </div>

          <!-- CUERPO -->
          <div style="padding:28px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0; border:1px solid #f2d6d8; border-radius:14px; overflow:hidden;">
              <tr style="background:#fdf5f5;">
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:${COLOR_RED}; width:30%;">Cliente</td>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:15px; font-weight:800; color:#1a1a1a;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">Correo</td>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:${COLOR_RED};"><a href="mailto:${email}" style="color:${COLOR_RED}; text-decoration:none;">${email}</a></td>
              </tr>
              ${
                telefono
                  ? `
              <tr style="background:#fdf5f5;">
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">Teléfono</td>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:#1a1a1a;"><a href="tel:${telefono}" style="color:#1a1a1a; text-decoration:none;">${telefono}</a></td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">Asunto</td>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:#1a1a1a;">${asunto || "N/A"}</td>
              </tr>
              ${
                servicioDeseado
                  ? `
              <tr style="background:#fdf5f5;">
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">Servicio</td>
                <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:#1a1a1a;">${servicioDeseado}</td>
              </tr>
              `
                  : ""
              }
              ${
                presupuesto
                  ? `
              <tr>
                <td style="padding:12px 16px; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">Presupuesto</td>
                <td style="padding:12px 16px; font-size:15px; font-weight:900; color:${COLOR_GREEN};">${presupuesto}</td>
              </tr>
              `
                  : ""
              }
            </table>

            ${
              mensaje
                ? `
            <div style="margin-top:20px; background:#fdf5f5; border:1px solid #f2d6d8; border-radius:14px; padding:18px;">
              <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:${COLOR_RED}; display:block; margin-bottom:6px;">Mensaje Completo</span>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#222; white-space:pre-line;">${mensaje}</p>
            </div>
            `
                : ""
            }
          </div>

          <!-- FOOTER CON LOGO -->
          <div style="padding:20px 30px; background:#faf4f4; border-top:1px solid #f2d6d8; text-align:center;">
            <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="28" height="28" style="display:block; margin:0 auto 8px; opacity:0.8;" />
            <p style="margin:0; font-size:12px; color:#888;">Sistema automático de mensajes · ${BRAND_NAME}</p>
          </div>

        </div>
      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Correos enviados correctamente",
    });
  } catch (error) {
    console.error("Error al enviar correos:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error enviando correos",
      },
      {
        status: 500,
      }
    );
  }
}