import type { SVGProps } from 'react'

const colors = {
    text: '#171717',
    muted: '#666666',
    brand: '#0876DD',
    brandDark: '#0B5FC6',
    brandText: '#174EA6',
    brandSurface: '#F5F9FE',
    brandHeader: '#EAF3FC',
    brandBorder: '#9AC5F2',
    candidate: '#EAF3FC',
    candidateBorder: '#0876DD',
    border: '#E6E6E6',
    divider: '#D9D9D9',
    surface: '#FAFAFA',
    subtleSurface: '#F3F4F6',
    white: '#FFFFFF',
}

const sansFont = 'var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif'
const monoFont = 'var(--font-roboto-mono), ui-monospace, SFMono-Regular, Consolas, monospace'

const textDefaults: SVGProps<SVGTextElement> = {
    dominantBaseline: 'middle',
    fill: colors.text,
}

function DiagramFrame({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="not-prose my-[32px] w-full overflow-x-auto rounded-[12px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            {children}
        </div>
    )
}

type ColumnCardProps = {
    x: number
    width?: number
    name: string
    selected: boolean
    values: string[]
}

function ColumnCard({ x, width = 236, name, selected, values }: ColumnCardProps) {
    const status = selected ? 'read' : 'not read'
    const cardFill = selected ? colors.brandSurface : colors.white
    const contentColor = selected ? colors.text : colors.muted
    const statusColor = selected ? colors.brand : colors.muted

    return (
        <g aria-label={`${name} column is ${status}`}>
            <rect
                x={x}
                y="96"
                width={width}
                height="126"
                rx="12"
                fill={cardFill}
                stroke={selected ? colors.brand : colors.border}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
            />
            <text {...textDefaults} x={x + 18} y="119" fontSize="20" fontWeight="600" fill={contentColor}>
                {name}
            </text>
            <text
                {...textDefaults}
                x={x + width - 18}
                y="119"
                textAnchor="end"
                fontSize="16"
                fontWeight="500"
                fill={statusColor}
            >
                {status}
            </text>
            {values.map((value, index) => (
                <text
                    {...textDefaults}
                    key={value}
                    x={x + 18}
                    y={158 + index * 25}
                    fontSize="18"
                    fontWeight="400"
                    fill={index === values.length - 1 ? colors.muted : contentColor}
                >
                    {value}
                </text>
            ))}
        </g>
    )
}

type SegmentState = 'candidate' | 'skip' | 'scan'

function SegmentCells({ y, states }: Readonly<{ y: number; states: SegmentState[] }>) {
    const centers = [388, 522, 656, 790, 924]

    return (
        <>
            {states.map((state, index) => {
                const isCandidate = state === 'candidate'
                const isScan = state === 'scan'
                const fill = isScan ? colors.brandDark : isCandidate ? colors.candidate : colors.white
                const stroke = isCandidate ? colors.candidateBorder : 'none'
                const textColor = isScan ? colors.white : isCandidate ? colors.brandText : colors.muted

                return (
                    <g key={`${y}-${centers[index]}`}>
                        <rect
                            x={centers[index] - 58}
                            y={y}
                            width="116"
                            height="38"
                            rx="8"
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={isCandidate ? 1 : 0}
                            vectorEffect="non-scaling-stroke"
                        />
                        <text
                            {...textDefaults}
                            x={centers[index]}
                            y={y + 19}
                            textAnchor="middle"
                            fontSize="16"
                            fontWeight="500"
                            fill={textColor}
                        >
                            {state}
                        </text>
                    </g>
                )
            })}
        </>
    )
}

export function ColumnarIndexPruningDiagram() {
    return (
        <DiagramFrame>
            <svg
                viewBox="0 0 1120 650"
                role="img"
                aria-labelledby="columnar-index-pruning-title columnar-index-pruning-description"
                className="block h-auto w-full min-w-[680px]"
                style={{ fontFamily: sansFont }}
                shapeRendering="geometricPrecision"
                textRendering="optimizeLegibility"
            >
                <title id="columnar-index-pruning-title">Column selection and index segment pruning</title>
                <desc id="columnar-index-pruning-description">
                    The query reads two of four columns. A time filter may match segments one through three, while a service filter may
                    match segments two through four. Their intersection leaves segments two and three to scan.
                </desc>
                <rect width="1120" height="650" fill={colors.white} />

                <text {...textDefaults} x="48" y="50" fontSize="26" fontWeight="600">
                    Columnar storage
                </text>
                <text {...textDefaults} x="1072" y="50" textAnchor="end" fontSize="18" fontWeight="400" fill={colors.muted}>
                    Read referenced column data
                </text>
                <rect x="36" y="82" width="1048" height="158" rx="16" fill={colors.surface} />

                <ColumnCard x={62} name="time" selected values={['10:05', '10:18', '…']} />
                <ColumnCard x={316} name="service" selected values={['checkout', 'auth', '…']} />
                <ColumnCard x={570} name="message" selected={false} values={['payment approved', 'cache miss', '…']} />
                <ColumnCard x={824} width={234} name="var" selected={false} values={['{ region: … }', '{ version: … }', '…']} />

                <text {...textDefaults} x="48" y="286" fontSize="26" fontWeight="600">
                    Index pruning
                </text>
                <g aria-label="legend">
                    <rect
                        x="782"
                        y="277"
                        width="18"
                        height="18"
                        rx="4"
                        fill={colors.candidate}
                        stroke={colors.candidateBorder}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                    <text {...textDefaults} x="812" y="286" fontSize="16" fontWeight="500" fill={colors.muted}>
                        candidate
                    </text>
                    <rect x="942" y="277" width="18" height="18" rx="4" fill={colors.white} />
                    <text {...textDefaults} x="972" y="286" fontSize="16" fontWeight="500" fill={colors.muted}>
                        skip
                    </text>
                </g>
                <rect x="36" y="318" width="1048" height="238" rx="16" fill={colors.surface} />

                {['S1', 'S2', 'S3', 'S4', 'S5'].map((segment, index) => (
                    <text
                        {...textDefaults}
                        key={segment}
                        x={388 + index * 134}
                        y="342"
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="500"
                        fill={colors.muted}
                    >
                        {segment}
                    </text>
                ))}

                <text {...textDefaults} x="62" y="379" fontSize="20" fontWeight="600">
                    time range
                </text>
                <SegmentCells y={360} states={['candidate', 'candidate', 'candidate', 'skip', 'skip']} />

                <text {...textDefaults} x="62" y="433" fontSize="20" fontWeight="600">
                    service = &apos;checkout&apos;
                </text>
                <SegmentCells y={414} states={['skip', 'candidate', 'candidate', 'candidate', 'skip']} />

                <path d="M330 466 H982" stroke={colors.divider} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <text {...textDefaults} x="309" y="466" textAnchor="end" fontSize="16" fontWeight="500" fill={colors.muted}>
                    AND
                </text>

                <text {...textDefaults} x="62" y="499" fontSize="20" fontWeight="600">
                    segments to scan
                </text>
                <SegmentCells y={480} states={['skip', 'scan', 'scan', 'skip', 'skip']} />

                <rect x="194" y="582" width="732" height="50" rx="8" fill={colors.brandHeader} />
                <text {...textDefaults} x="222" y="607" fontSize="18" fontWeight="400">
                    2 of 4 columns read
                </text>
                <path d="M559 594 V620" stroke={colors.brandBorder} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <text {...textDefaults} x="592" y="607" fontSize="18" fontWeight="400">
                    In this example, scan 2 of 5 segments
                </text>
            </svg>
        </DiagramFrame>
    )
}

type EventRow = {
    label: string
    matches?: boolean
}

type ClusterSegment = {
    name: string
    candidate: boolean
    rows: EventRow[]
}

const beforeSegments: ClusterSegment[] = [
    {
        name: 'S1',
        candidate: true,
        rows: [{ label: 'api · 09:40' }, { label: 'auth · 10:34' }, { label: 'checkout · 10:05', matches: true }, { label: 'search · 09:48' }],
    },
    {
        name: 'S2',
        candidate: true,
        rows: [{ label: 'api · 10:12' }, { label: 'auth · 09:42' }, { label: 'checkout · 10:18', matches: true }, { label: 'search · 10:50' }],
    },
    {
        name: 'S3',
        candidate: true,
        rows: [{ label: 'api · 09:52' }, { label: 'auth · 10:21' }, { label: 'checkout · 10:26', matches: true }, { label: 'search · 09:38' }],
    },
    {
        name: 'S4',
        candidate: true,
        rows: [{ label: 'api · 10:45' }, { label: 'auth · 09:55' }, { label: 'checkout · 10:40', matches: true }, { label: 'search · 10:30' }],
    },
]

const afterSegments: ClusterSegment[] = [
    {
        name: 'S1',
        candidate: false,
        rows: [{ label: 'api · 09:40' }, { label: 'api · 09:52' }, { label: 'api · 10:12' }, { label: 'api · 10:45' }],
    },
    {
        name: 'S2',
        candidate: false,
        rows: [{ label: 'auth · 09:42' }, { label: 'auth · 09:55' }, { label: 'auth · 10:21' }, { label: 'auth · 10:34' }],
    },
    {
        name: 'S3',
        candidate: true,
        rows: [
            { label: 'checkout · 10:05', matches: true },
            { label: 'checkout · 10:18', matches: true },
            { label: 'checkout · 10:26', matches: true },
            { label: 'checkout · 10:40', matches: true },
        ],
    },
    {
        name: 'S4',
        candidate: false,
        rows: [{ label: 'search · 09:38' }, { label: 'search · 09:48' }, { label: 'search · 10:30' }, { label: 'search · 10:50' }],
    },
]

function ClusterSegmentCard({ x, y, segment }: Readonly<{ x: number; y: number; segment: ClusterSegment }>) {
    const statusColor = segment.candidate ? colors.brandText : colors.muted
    const cardFill = segment.candidate ? colors.brandSurface : colors.white

    return (
        <g aria-label={`${segment.name} ${segment.candidate ? 'may match and is a candidate' : 'can be skipped'}`}>
            <rect
                x={x}
                y={y}
                width="230"
                height="172"
                rx="12"
                fill={cardFill}
                stroke={segment.candidate ? colors.brand : 'none'}
                strokeWidth={segment.candidate ? 1 : 0}
                vectorEffect="non-scaling-stroke"
            />
            <text {...textDefaults} x={x + 16} y={y + 23} fontSize="20" fontWeight="600">
                {segment.name}
            </text>
            <text
                {...textDefaults}
                x={x + 212}
                y={y + 23}
                textAnchor="end"
                fontSize="16"
                fontWeight="500"
                fill={statusColor}
            >
                {segment.candidate ? 'candidate' : 'skip'}
            </text>

            {segment.rows.map((row, index) => {
                const rowTop = y + 44 + index * 32
                const rowCenter = rowTop + 13
                const textColor = row.matches ? colors.brandText : segment.candidate ? colors.text : colors.muted

                return (
                    <g key={row.label}>
                        {row.matches ? (
                            <rect x={x + 12} y={rowTop} width="206" height="26" rx="4" fill={colors.candidate} />
                        ) : null}
                        <text
                            {...textDefaults}
                            x={x + 20}
                            y={rowCenter}
                            fontSize="18"
                            fontWeight={row.matches ? '500' : '400'}
                            fill={textColor}
                        >
                            {row.label}
                        </text>
                    </g>
                )
            })}
        </g>
    )
}

export function ClusteringIndexPruningDiagram() {
    const xPositions = [62, 317, 572, 827]

    return (
        <DiagramFrame>
            <svg
                viewBox="0 0 1120 800"
                role="img"
                aria-labelledby="clustering-index-pruning-title clustering-index-pruning-description"
                className="block h-auto w-full min-w-[680px]"
                style={{ fontFamily: sansFont }}
                shapeRendering="geometricPrecision"
                textRendering="optimizeLegibility"
            >
                <title id="clustering-index-pruning-title">Clustering concentrates matching events into fewer segments</title>
                <desc id="clustering-index-pruning-description">
                    The same sixteen events are spread across four candidate segments before clustering. After clustering by service and
                    time, checkout events are together in one candidate segment, allowing the other three segments to be skipped for the
                    example filter.
                </desc>
                <rect width="1120" height="800" fill={colors.white} />

                <rect x="160" y="22" width="800" height="52" rx="8" fill={colors.surface} />
                <text {...textDefaults} x="188" y="48" fontSize="16" fontWeight="500" fill={colors.muted}>
                    Example filter
                </text>
                <path d="M356 34 V62" stroke={colors.divider} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <text {...textDefaults} x="384" y="48" fontSize="18" fontWeight="400" style={{ fontFamily: monoFont }}>
                    service = &apos;checkout&apos; AND time &gt;= 10:00
                </text>

                <text {...textDefaults} x="48" y="116" fontSize="26" fontWeight="600">
                    Before clustering
                </text>
                <text {...textDefaults} x="1072" y="116" textAnchor="end" fontSize="18" fontWeight="400" fill={colors.muted}>
                    4 of 4 may match in this example
                </text>
                <rect x="36" y="144" width="1048" height="198" rx="16" fill={colors.surface} />
                {beforeSegments.map((segment, index) => (
                    <ClusterSegmentCard key={segment.name} x={xPositions[index]} y={158} segment={segment} />
                ))}

                <path
                    d="M184 404 H332 M788 404 H936"
                    stroke={colors.divider}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                />
                <text
                    {...textDefaults}
                    x="560"
                    y="404"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="500"
                    fill={colors.brandText}
                >
                    Illustrative layout with{' '}
                    <tspan style={{ fontFamily: monoFont }}>CLUSTER BY service, time</tspan>
                </text>
                <path
                    d="M560 420 V438 M554 432 L560 438 L566 432"
                    fill="none"
                    stroke={colors.brand}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />

                <text {...textDefaults} x="48" y="464" fontSize="26" fontWeight="600">
                    After clustering
                </text>
                <text {...textDefaults} x="1072" y="464" textAnchor="end" fontSize="18" fontWeight="400" fill={colors.muted}>
                    1 of 4 may match in this example
                </text>
                <rect x="36" y="490" width="1048" height="198" rx="16" fill={colors.surface} />
                {afterSegments.map((segment, index) => (
                    <ClusterSegmentCard key={segment.name} x={xPositions[index]} y={504} segment={segment} />
                ))}

                <rect x="240" y="724" width="640" height="48" rx="8" fill={colors.brandHeader} />
                <text {...textDefaults} x="268" y="748" fontSize="16" fontWeight="500" fill={colors.muted}>
                    Candidate segments
                </text>
                <path d="M500 736 V760" stroke={colors.brandBorder} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <text {...textDefaults} x="532" y="748" fontSize="18" fontWeight="400">
                    4 before → 1 after in this example
                </text>
            </svg>
        </DiagramFrame>
    )
}
