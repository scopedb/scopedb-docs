import './callout.css'

export default function Callout({
    children,
    type,
    title,
}: {
    children: React.ReactNode;
    type: "info" | "tip" | "warn" | "caution" | "note";
    title?: string;
}) {
    const callouts = {
        info: {
            title: "Info",
            hint: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"><path d="M12 8h.01M12 12v4" /><circle cx="12" cy="12" r="10" /></svg>),
        },
        tip: {
            title: "Tip",
            hint: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"><path d="m8 12 2.7 2.7L16 9.3" /><circle cx="12" cy="12" r="10" /></svg>),
        },
        warn: {
            title: "Warning",
            hint: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"><path d="M12 9v4m0 4h.01M8.681 4.082C9.351 2.797 10.621 2 12 2s2.649.797 3.319 2.082l6.203 11.904a4.28 4.28 0 0 1-.046 4.019C20.793 21.241 19.549 22 18.203 22H5.797c-1.346 0-2.59-.759-3.273-1.995a4.28 4.28 0 0 1-.046-4.019L8.681 4.082Z" /></svg>),
        },
        caution: {
            title: "Caution",
            hint: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"><path d="M12 12s-5.6 4.6-3.6 8c1.6 2.6 5.7 2.7 7.2 0 2-3.7-3.6-8-3.6-8Z" /><path d="M13.004 2 8.5 9 6.001 6s-4.268 7.206-1.629 11.8c3.016 5.5 11.964 5.7 15.08 0C23.876 10 13.004 2 13.004 2Z" /></svg>),
        },
        note: {
            title: "Note",
            hint: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true"><circle cx="19" cy="5" r="3" /><path d="M20 11.929V15c0 1.656-1.344 3-3 3h-3l-6 4v-4H5c-1.656 0-3-1.344-3-3V7c0-1.656 1.344-3 3-3h7.071" /></svg>),
        }
    }

    const Icon = callouts[type].hint;

    return (
        <aside className={`callout callout-${type}`}>
            <div className="callout-indicator">
                <div className="callout-hint">
                    {Icon}
                </div>
                <div className="callout-title">{title ?? callouts[type].title}</div>
            </div>
            <div className="callout-content">
                {children}
            </div>
        </aside>
    )
}
