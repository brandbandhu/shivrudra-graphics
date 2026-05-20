import { NextResponse } from "next/server";

const complaintFormEndpointUrl = process.env.COMPLAINT_FORM_ENDPOINT_URL?.trim() || "";
const complaintFormSheetName = process.env.COMPLAINT_FORM_SHEET_NAME?.trim() || "Complaints";

type ComplaintPayload = {
  customerName?: string;
  contact?: string;
  email?: string;
  orderReference?: string;
  productService?: string;
  complaintType?: string;
  issueDate?: string;
  priority?: string;
  preferredResolution?: string;
  locationAddress?: string;
  attachmentLink?: string;
  complaintDetails?: string;
  additionalNotes?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!complaintFormEndpointUrl) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Complaint endpoint is not configured yet. Add COMPLAINT_FORM_ENDPOINT_URL in .env and restart the server.",
      },
      { status: 500 },
    );
  }

  let body: ComplaintPayload;

  try {
    body = (await request.json()) as ComplaintPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    source: "website-complaint-form",
    formType: "complaint",
    sheetName: complaintFormSheetName,
    customerName: normalize(body.customerName),
    contact: normalize(body.contact),
    email: normalize(body.email),
    orderReference: normalize(body.orderReference),
    productService: normalize(body.productService),
    complaintType: normalize(body.complaintType),
    issueDate: normalize(body.issueDate),
    priority: normalize(body.priority),
    preferredResolution: normalize(body.preferredResolution),
    locationAddress: normalize(body.locationAddress),
    attachmentLink: normalize(body.attachmentLink),
    complaintDetails: normalize(body.complaintDetails),
    additionalNotes: normalize(body.additionalNotes),
  };

  try {
    const endpointResponse = await fetch(complaintFormEndpointUrl, {
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
          error: `Complaint endpoint returned HTTP ${endpointResponse.status}.`,
          endpoint: complaintFormEndpointUrl,
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
            error: parsed.error || "Complaint endpoint returned an error response.",
            endpoint: complaintFormEndpointUrl,
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
              "Complaint endpoint response is missing sheet confirmation. Add { sheet: 'Complaints' } in Apps Script response.",
            endpoint: complaintFormEndpointUrl,
          },
          { status: 502 },
        );
      }

      if (returnedSheet.toLowerCase() !== complaintFormSheetName.toLowerCase()) {
        return NextResponse.json(
          {
            ok: false,
            error: `Complaint entry routing mismatch. Expected sheet '${complaintFormSheetName}' but got '${returnedSheet}'.`,
            endpoint: complaintFormEndpointUrl,
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        endpoint: complaintFormEndpointUrl,
        data: parsed,
      });
    } catch {
      return NextResponse.json({ ok: true, endpoint: complaintFormEndpointUrl });
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not connect to the configured complaint endpoint.",
        endpoint: complaintFormEndpointUrl,
      },
      { status: 502 },
    );
  }
}
