import { ImageResponse } from "next/og";

export const alt = "ScopeDB Docs — serverless database for event analytics";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: "flex-start",
                    background: "linear-gradient(135deg, #ffffff 0%, #eef7ff 100%)",
                    color: "#111827",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        alignItems: "center",
                        color: "#0879e0",
                        display: "flex",
                        fontSize: 34,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                    }}
                >
                    ScopeDB Docs
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 64,
                            fontWeight: 650,
                            letterSpacing: "-0.045em",
                            lineHeight: 1.05,
                            maxWidth: 1000,
                        }}
                    >
                        Serverless database for event analytics
                    </div>
                    <div style={{ color: "#52606d", display: "flex", fontSize: 27 }}>
                        ScopeQL · SDKs · APIs · Guides
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
