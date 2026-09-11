import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

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

// ==========================================
// INTERFACES
// ==========================================
interface CartTour {
  id: string;
  slug: string;
  title: string;
  title_english: string | null;
  description: string | null;
  description_english: string | null;
  price: number;
  image_url: string | null;
  destination: string;
  duration: string | null;
}

interface CartItem {
  tour: CartTour;
  adults: number;
  date?: string;
}

interface CheckoutBody {
  locale?: string;
  orderId: string;
  amount: number;
  total: string;
  couponCode?: string | null;
  discountPercent?: number;

  paymentResult?: {
    authorization?: string;
    responseCode?: string;
    status?: string;
  };

  items: CartItem[];

  customer: {
    nombre: string;
    firstName: string;
    lastName: string;
    email: string;
    telefono: string;

    city?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    direccion?: string;
    state?: string;
    cp?: string;
    country?: string;
  };
}

// ==========================================
// UTILIDADES
// ==========================================
function currency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

function renderItems(items: CartItem[], themeColor: string, t: any) {
  return items
    .map((item) => {
      const image = item.tour?.image_url || BEACH_IMAGE;
      const title = item.tour?.title || t("defaultExperience");
      const destination = item.tour?.destination || t("defaultDestination");
      const duration = item.tour?.duration || t("defaultDuration");
      const quantity = item.adults || 1;
      const total = (item.tour?.price || 0) * quantity;

      return `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e5e7eb;">
          <tr>
            <td width="140" style="vertical-align:top;">
              <img src="${image}" alt="${title}" style="width:100%; min-height:140px; object-fit:cover; display:block;" />
            </td>
            <td style="padding:20px; vertical-align:top;">
              <span style="display:inline-block; padding:4px 10px; background:#f3f4f6; color:#4b5563; border-radius:12px; font-size:10px; font-weight:800; text-transform:uppercase; margin-bottom:8px;">
                ${destination}
              </span>
              <h3 style="margin:0 0 12px 0; font-size:18px; color:#111827; font-weight:800;">${title}</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#6b7280; margin-bottom:12px;">
                <tr>
                  <td style="padding-bottom:4px;"><strong>${t("peopleLabel")}</strong> ${quantity}</td>
                  ${item.date ? `<td style="padding-bottom:4px; text-align:right;"><strong>${t("dateLabel")}</strong> ${item.date}</td>` : ""}
                </tr>
                <tr>
                  <td><strong>${t("durationLabel")}</strong> ${duration}</td>
                </tr>
              </table>
              
              <div style="border-top:1px solid #f3f4f6; padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
                <span style="color:#6b7280; font-size:14px;">${t("totalLabel")}</span>
                <strong style="color:${themeColor}; font-size:18px; font-weight:900;">${currency(total)}</strong>
              </div>
            </td>
          </tr>
        </table>
      `;
    })
    .join("");
}

// ==========================================
// PLANTILLA: CLIENTE (VERDE)
// ==========================================
function customerEmailTemplate(data: CheckoutBody, t: any) {
  const customerName = data.customer?.firstName || data.customer?.nombre || t("defaultCustomerName");
  const currentYear = new Date().getFullYear();

  return `
  <div style="margin:0; padding:30px 15px; background:#f2f7f4; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1a1a1a;">
    <div style="max-width:640px; margin:auto; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #e1ebe3; box-shadow:0 12px 32px rgba(3,80,32,0.08);">
      
      <!-- HERO -->
      <div style="background-image:linear-gradient(rgba(3,80,32,0.88), rgba(3,80,32,0.95)), url('${BEACH_IMAGE}'); background-size:cover; background-position:center; padding:40px 30px; text-align:center; color:#ffffff;">
        <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="48" height="48" style="display:block; margin:0 auto 16px; border-radius:12px; background:rgba(255,255,255,0.2); padding:6px; border:1px solid rgba(255,255,255,0.3);" />
        <span style="color:${COLOR_GOLD}; text-transform:uppercase; font-size:11px; font-weight:800; letter-spacing:2px; display:block; margin-bottom:6px;">${t("bookingConfirmed")}</span>
        <h1 style="margin:0; font-size:32px; font-weight:900; line-height:1.2;">${t("greeting", { customerName })}</h1>
        <p style="margin:12px auto 0; max-width:480px; color:rgba(255,255,255,0.9); font-size:15px; line-height:1.6;">
          ${t("bookingMessage")}
        </p>
      </div>

      <!-- CONTENIDO -->
      <div style="padding:30px;">
        
        <!-- RESUMEN DE PAGO -->
        <div style="background:#f0f7f2; border:1px solid #cce3d2; border-radius:16px; padding:20px; margin-bottom:24px; text-align:center;">
          <span style="font-size:12px; font-weight:800; text-transform:uppercase; color:${COLOR_GREEN}; display:block; margin-bottom:6px;">${t("totalPaidLabel")}</span>
          <h2 style="margin:0; font-size:36px; font-weight:900; color:#0f2918;">${data.total}</h2>
          ${data.couponCode ? `<p style="margin:8px 0 0; font-size:13px; color:#555;">${t("couponApplied", { couponCode: data.couponCode })}</p>` : ""}
          ${(data.discountPercent ?? 0) > 0 ? `<p style="margin:4px 0 0; font-size:13px; color:#555;">${t("discountLabel", { discountPercent: data.discountPercent })}</p>` : ""}
        </div>

        <!-- ITEMS -->
        <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:#111827;">${t("yourExperiences")}</h3>
        ${renderItems(data.items, COLOR_GREEN, t)}

        <!-- INFO VIAJERO -->
        <div style="margin-top:24px; border:1px solid #e5e7eb; border-radius:16px; padding:20px;">
          <h3 style="margin:0 0 16px 0; font-size:16px; font-weight:800; color:#111827;">${t("contactInfo")}</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            <tr><td style="padding-bottom:8px; color:#6b7280; width:90px;">${t("nameLabel")}</td><td style="padding-bottom:8px; font-weight:600; color:#111827;">${data.customer.nombre}</td></tr>
            <tr><td style="padding-bottom:8px; color:#6b7280;">${t("emailLabel")}</td><td style="padding-bottom:8px; font-weight:600; color:#111827;">${data.customer.email}</td></tr>
            ${data.customer.telefono ? `<tr><td style="padding-bottom:8px; color:#6b7280;">${t("phoneLabel")}</td><td style="padding-bottom:8px; font-weight:600; color:#111827;">${data.customer.telefono}</td></tr>` : ""}
            ${data.customer.direccion ? `<tr><td style="color:#6b7280; vertical-align:top;">${t("addressLabel")}</td><td style="font-weight:600; color:#111827; line-height:1.4;">${data.customer.direccion}</td></tr>` : ""}
          </table>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="padding:20px 30px; background:#f8faf9; border-top:1px solid #e1ebe3; text-align:center;">
        <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="28" height="28" style="display:block; margin:0 auto 8px; opacity:0.8;" />
        <p style="margin:0; font-size:13px; color:#555; font-weight:600;">${t("thanksTrust", { brandName: BRAND_NAME })}</p>
        <p style="margin:4px 0 0; font-size:11px; color:#888;">${t("rightsReserved", { currentYear })}</p>
      </div>

    </div>
  </div>
  `;
}

// ==========================================
// PLANTILLA: NEGOCIO (ROJA)
// ==========================================
function businessEmailTemplate(data: CheckoutBody, t: any) {
  const currentYear = new Date().getFullYear();

  return `
  <div style="margin:0; padding:30px 15px; background:#fcf2f2; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1a1a1a;">
    <div style="max-width:640px; margin:auto; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #f2d6d8; box-shadow:0 12px 32px rgba(197,4,19,0.08);">
      
      <!-- HERO -->
      <div style="background-image:linear-gradient(rgba(197,4,19,0.92), rgba(150,3,14,0.96)), url('${BEACH_IMAGE}'); background-size:cover; background-position:center; padding:32px 30px; color:#ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="color:${COLOR_GOLD}; text-transform:uppercase; font-size:11px; font-weight:800; letter-spacing:2px; display:block; margin-bottom:4px;">${t("salesNotification")}</span>
              <h1 style="margin:0; font-size:24px; font-weight:900; line-height:1.2;">${t("newPurchaseReceived")}</h1>
              <p style="margin:6px 0 0; color:rgba(255,255,255,0.8); font-size:13px; font-family:monospace;">${t("orderIdLabel", { orderId: data.orderId })}</p>
            </td>
            <td width="48" align="right">
              <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="40" height="40" style="display:block; border-radius:10px; background:rgba(255,255,255,0.2); padding:4px;" />
            </td>
          </tr>
        </table>
      </div>

      <!-- CONTENIDO -->
      <div style="padding:30px;">
        
        <!-- INFO CLIENTE -->
        <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:#111827;">${t("customerData")}</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0; border:1px solid #f2d6d8; border-radius:14px; overflow:hidden; margin-bottom:24px;">
          <tr style="background:#fdf5f5;">
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:${COLOR_RED}; width:30%;">${t("nameLabel")}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:15px; font-weight:800; color:#1a1a1a;">${data.customer.nombre}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">${t("emailLabel")}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:${COLOR_RED};"><a href="mailto:${data.customer.email}" style="color:${COLOR_RED}; text-decoration:none;">${data.customer.email}</a></td>
          </tr>
          ${data.customer.telefono ? `
          <tr style="background:#fdf5f5;">
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:12px; font-weight:800; text-transform:uppercase; color:#666;">${t("phoneLabel")}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #f2d6d8; font-size:14px; font-weight:700; color:#1a1a1a;">${data.customer.telefono}</td>
          </tr>` : ""}
          ${data.customer.direccion ? `
          <tr>
            <td style="padding:12px 16px; font-size:12px; font-weight:800; text-transform:uppercase; color:#666; vertical-align:top;">${t("addressLabel")}</td>
            <td style="padding:12px 16px; font-size:13px; font-weight:600; color:#1a1a1a; line-height:1.4;">${data.customer.direccion}</td>
          </tr>` : ""}
        </table>

        <!-- ITEMS -->
        <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:#111827;">${t("purchasedExperiences")}</h3>
        ${renderItems(data.items, COLOR_RED, t)}

        <!-- ESTADO DE PAGO -->
        <div style="margin-top:24px; background:#1a1a1a; color:#ffffff; border-radius:16px; padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            <tr>
              <td style="padding-bottom:12px; color:#aaa;">${t("processedTotal")}</td>
              <td style="padding-bottom:12px; text-align:right; font-size:18px; font-weight:900; color:${COLOR_GOLD};">${data.total}</td>
            </tr>
            ${data.paymentResult?.authorization ? `
            <tr>
              <td style="padding-bottom:12px; color:#aaa;">${t("authorizationLabel")}</td>
              <td style="padding-bottom:12px; text-align:right; font-weight:700;">${data.paymentResult.authorization}</td>
            </tr>` : ""}
            <tr>
              <td style="color:#aaa;">${t("statusLabel")}</td>
              <td style="text-align:right; font-weight:700; color:#4ade80;">${data.paymentResult?.status || t("approvedStatus")}</td>
            </tr>
          </table>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="padding:20px 30px; background:#faf4f4; border-top:1px solid #f2d6d8; text-align:center;">
        <img src="${LOGO_URL}" alt="${BRAND_NAME}" width="28" height="28" style="display:block; margin:0 auto 8px; opacity:0.8;" />
        <p style="margin:0; font-size:11px; color:#888;">${t("automaticSalesSystem", { currentYear, brandName: BRAND_NAME })}</p>
      </div>

    </div>
  </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const locale = body.locale || "es";

    if (!body.customer?.email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }

    const t = await getTranslations({ locale, namespace: "Emails.checkoutEmail" });

    // 1. Correo al Cliente (Verde)
    await resend.emails.send({
      from: `${BRAND_NAME} <${CONTACT_EMAIL}>`,
      to: [body.customer.email],
      subject: t("clientSubject", { orderId: body.orderId }),
      html: customerEmailTemplate(body, t),
    });

    // 2. Correo al Negocio (Rojo)
    await resend.emails.send({
      from: `Notificaciones de Venta <${CONTACT_EMAIL}>`,
      to: [CONTACT_EMAIL],
      subject: t("businessSubject", { orderId: body.orderId }),
      html: businessEmailTemplate(body, t),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correos de checkout:", error);

    return NextResponse.json(
      { error: "Error enviando correos" },
      { status: 500 }
    );
  }
}