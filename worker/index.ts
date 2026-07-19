export interface Env {
  TURNSTILE_SECRET_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  RESEND_API_KEY: string;
}

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  turnstileToken?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function validateTurnstile(
  token: string,
  secret: string,
  remoteip?: string | null,
) {
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);

  const resp = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  return resp.json<{
    success: boolean;
    "error-codes"?: string[];
    hostname?: string;
    action?: string;
    cdata?: string;
  }>();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/api/contact" || request.method !== "POST") {
      return json({ ok: false, error: "Not found." }, 404);
    }

    let body: ContactPayload;
    try {
      body = await request.json<ContactPayload>();
    } catch {
      return json({ ok: false, error: "Invalid JSON body." }, 400);
    }

    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      message = "",
      turnstileToken = "",
    } = body;

    if (!turnstileToken) {
      return json({ ok: false, error: "Verification token missing." }, 400);
    }

    const cfConnectingIp = request.headers.get("CF-Connecting-IP");

    const verification = await validateTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      cfConnectingIp,
    );

    if (!verification.success) {
      return json(
        {
          ok: false,
          error: "Turnstile verification failed.",
          details: verification["error-codes"] ?? [],
        },
        400,
      );
    }

    if (!firstName) {
      return json({ ok: false, error: "First name is required." }, 400);
    }

    if (!lastName) {
      return json({ ok: false, error: "Last name is required." }, 400);
    }

    if (!email) {
      return json({ ok: false, error: "Email is required." }, 400);
    }

    if (!message) {
      return json({ ok: false, error: "Message is required." }, 400);
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `New website contact from ${firstName} ${lastName}`,
        text: [
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return json({ ok: false, error: errorText }, 500);
    }

    return json({ ok: true, message: "Message sent successfully." });
  },
} satisfies ExportedHandler<Env>;
