import { NextRequest, NextResponse } from "next/server";
import Personalize from "@contentstack/personalize-edge-sdk";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept .well-known routes early and return 404 immediately
  if (pathname.startsWith("/.well-known")) {
    return new NextResponse(null, {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Add personalization logic
  try {
    // Check if project UID is configured
    const projectUid =
      process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;
    if (!projectUid) {
      console.warn(
        "⚠️ [Proxy] NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not set"
      );
      return NextResponse.next();
    }

    // Set a custom edge API URL if provided (must be before init)
    let edgeApiUrl =
      process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL;

    if (edgeApiUrl) {
      Personalize.setEdgeApiUrl(edgeApiUrl);
    }
    // Initialize the SDK and pass the request
    const personalizeSdk = await Personalize.init(projectUid, {
      request: request,
    });

    // Get variant aliases
    const variantAliases = personalizeSdk.getVariantAliases();

    if (variantAliases && variantAliases.length > 0) {
      // Create a new URL with the variant aliases in search params
      const url = request.nextUrl.clone();

      // Join multiple variant aliases with comma
      const variantAlias = variantAliases.join(",");

      // Add or update the variantAlias search param
      url.searchParams.set("variantAlias", variantAlias);

      // Rewrite to the new URL with search params
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("❌ [Proxy] Error in personalization proxy:", error);
    // Continue with the request even if personalization fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
