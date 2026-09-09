"use client";

import { useState } from "react";

// import {
//   useLocale,
//   useTranslations,
// } from "next-intl";

interface ContactData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  servicioDeseado?: string;
  presupuesto?: string;
  asunto: string;
}

export function useContact() {
  const [isLoading, setIsLoading] =
    useState(false);


  const locale = "es"

  const sendContactForm = async (
    data: ContactData
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/${locale ?? "es"}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "fallo xd"
        );
      }



      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "eerror desconocido"



      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendContactForm,
    isLoading,
  };
}


/**
{
  "Contact": {
    "alerts": {
      "success": {
        "title": "¡Mensaje enviado!",
        "message": "Gracias por contactarnos. Un especialista de Softvora te responderá pronto.",
        "confirmText": "Excelente"
      },
      "errors": {
        "title": "Error de envío",
        "sendFailed": "No se pudo enviar el mensaje",
        "unknown": "Ocurrió un error inesperado",
        "confirmText": "Reintentar"
      }
    }
  }
}

{
  "Contact": {
    "alerts": {
      "success": {
        "title": "Message sent!",
        "message": "Thank you for contacting us. A Softvora specialist will reach out to you shortly.",
        "confirmText": "Great"
      },
      "errors": {
        "title": "Sending error",
        "sendFailed": "Failed to send the message",
        "unknown": "An unexpected error occurred",
        "confirmText": "Retry"
      }
    }
  }
}
 */