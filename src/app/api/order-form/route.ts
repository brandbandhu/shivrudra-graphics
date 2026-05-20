import { NextResponse } from "next/server";

const orderFormEndpointUrl = process.env.ORDER_FORM_ENDPOINT_URL?.trim() || "";
const orderFormSheetName = process.env.ORDER_FORM_SHEET_NAME?.trim() || "Orders";

type OrderPayload = {
  customerName?: string;
  contact?: string;
  email?: string;
  companyName?: string;
  productName?: string;
  quantity?: string;
  size?: string;
  material?: string;
  deadline?: string;
  deliveryMode?: string;
  deliveryAddress?: string;
  artworkStatus?: string;
  notes?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!orderFormEndpointUrl) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Order form endpoint is not configured yet. Add ORDER_FORM_ENDPOINT_URL in .env and restart the server.",
      },
      { status: 500 },
    );
  }

  let body: OrderPayload;

  try {
    body = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    source: "website-order-form",
    formType: "order",
    sheetName: orderFormSheetName,
    customerName: normalize(body.customerName),
    contact: normalize(body.contact),
    email: normalize(body.email),
    companyName: normalize(body.companyName),
    productName: normalize(body.productName),
    quantity: normalize(body.quantity),
    size: normalize(body.size),
    material: normalize(body.material),
    deadline: normalize(body.deadline),
    deliveryMode: normalize(body.deliveryMode),
    deliveryAddress: normalize(body.deliveryAddress),
    artworkStatus: normalize(body.artworkStatus),
    notes: normalize(body.notes),
  };

  try {
    const endpointResponse = await fetch(orderFormEndpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await endpointResponse.text();

    if (!endpointResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Order form endpoint returned HTTP ${endpointResponse.status}.`,
          endpoint: orderFormEndpointUrl,
        },
        { status: 502 },
      );
    }

    try {
      const parsed = JSON.parse(responseText) as {
        ok?: boolean;
        error?: string;
        sheet?: string;
      };
      if (parsed.ok === false) {
        return NextResponse.json(
          {
            ok: false,
            error: parsed.error || "Endpoint returned an error response.",
            endpoint: orderFormEndpointUrl,
          },
          { status: 502 },
        );
      }

      const returnedSheet = normalize(parsed.sheet);
      if (!returnedSheet) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Order endpoint response is missing sheet confirmation. Add { sheet: 'Orders' } in Apps Script response.",
            endpoint: orderFormEndpointUrl,
          },
          { status: 502 },
        );
      }

      if (returnedSheet.toLowerCase() !== orderFormSheetName.toLowerCase()) {
        return NextResponse.json(
          {
            ok: false,
            error: `Order entry routing mismatch. Expected sheet '${orderFormSheetName}' but got '${returnedSheet}'.`,
            endpoint: orderFormEndpointUrl,
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        endpoint: orderFormEndpointUrl,
        data: parsed,
      });
    } catch {
      return NextResponse.json({ ok: true, endpoint: orderFormEndpointUrl });
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not connect to the configured order form endpoint.",
        endpoint: orderFormEndpointUrl,
      },
      { status: 502 },
    );
  }
}
