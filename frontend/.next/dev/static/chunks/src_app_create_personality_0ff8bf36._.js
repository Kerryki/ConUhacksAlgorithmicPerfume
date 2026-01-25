(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/create/personality/components/hexagon-background.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HexagonBackground",
    ()=>HexagonBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HexagonBackground() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "03b670e1cf83d8e9d93fabd45777214e439ee53a2a4c934d4c9f87ff9233be66") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "03b670e1cf83d8e9d93fabd45777214e439ee53a2a4c934d4c9f87ff9233be66";
    }
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "HexagonBackground[useEffect()]": ()=>{
                const canvas = canvasRef.current;
                if (!canvas) {
                    return;
                }
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    return;
                }
                const resizeCanvas = {
                    "HexagonBackground[useEffect() > resizeCanvas]": ()=>{
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        drawHexagons();
                    }
                }["HexagonBackground[useEffect() > resizeCanvas]"];
                const drawHexagon = {
                    "HexagonBackground[useEffect() > drawHexagon]": (x, y, size, opacity)=>{
                        ctx.beginPath();
                        ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
                        for(let i = 1; i <= 6; i++){
                            ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
                        }
                        ctx.closePath();
                        ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }["HexagonBackground[useEffect() > drawHexagon]"];
                const drawHexagons = {
                    "HexagonBackground[useEffect() > drawHexagons]": ()=>{
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        for(let row = -1; row < canvas.height / 90 + 2; row++){
                            for(let col = -1; col < canvas.width / 105 + 2; col++){
                                const x_0 = col * 105 + (row % 2 === 0 ? 0 : 52.5);
                                const y_0 = row * 90;
                                const distanceFromCenter = Math.sqrt(Math.pow(x_0 - canvas.width / 2, 2) + Math.pow(y_0 - canvas.height / 2, 2));
                                const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2));
                                const opacity_0 = 0.03 + (1 - distanceFromCenter / maxDistance) * 0.08;
                                drawHexagon(x_0, y_0, 60, opacity_0);
                            }
                        }
                        const nodePositions = [
                            {
                                x: canvas.width * 0.2,
                                y: canvas.height * 0.3
                            },
                            {
                                x: canvas.width * 0.8,
                                y: canvas.height * 0.2
                            },
                            {
                                x: canvas.width * 0.15,
                                y: canvas.height * 0.7
                            },
                            {
                                x: canvas.width * 0.85,
                                y: canvas.height * 0.8
                            },
                            {
                                x: canvas.width * 0.5,
                                y: canvas.height * 0.1
                            },
                            {
                                x: canvas.width * 0.5,
                                y: canvas.height * 0.9
                            }
                        ];
                        nodePositions.forEach({
                            "HexagonBackground[useEffect() > drawHexagons > nodePositions.forEach()]": (pos)=>{
                                const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 80);
                                gradient.addColorStop(0, "rgba(251, 191, 36, 0.12)");
                                gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
                                ctx.fillStyle = gradient;
                                ctx.beginPath();
                                ctx.arc(pos.x, pos.y, 80, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = "rgba(251, 191, 36, 0.5)";
                                ctx.beginPath();
                                ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }["HexagonBackground[useEffect() > drawHexagons > nodePositions.forEach()]"]);
                    }
                }["HexagonBackground[useEffect() > drawHexagons]"];
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas);
                return ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                };
            }
        })["HexagonBackground[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "fixed inset-0 pointer-events-none",
            style: {
                zIndex: 0
            }
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/hexagon-background.tsx",
            lineNumber: 113,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_s(HexagonBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = HexagonBackground;
var _c;
__turbopack_context__.k.register(_c, "HexagonBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/create/personality/components/personality-hex-grid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PersonalityHexGrid",
    ()=>PersonalityHexGrid,
    "personalities",
    ()=>personalities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
"use client";
;
;
;
;
const personalities = [
    {
        id: "optimist",
        name: "Optimist",
        title: "The Optimist",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"],
        description: "Bright, uplifting, radiant energy",
        tagline: "See the light in everything",
        gradient: "from-amber-400 via-yellow-500 to-orange-400",
        glowColor: "rgba(251, 191, 36, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 40%, transparent 70%)",
        accentColor: "#fbbf24"
    },
    {
        id: "romantic",
        name: "Romantic",
        title: "The Romantic",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        description: "Passionate, tender, deeply emotional",
        tagline: "Love is your language",
        gradient: "from-rose-400 via-pink-500 to-red-400",
        glowColor: "rgba(244, 114, 182, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(244, 114, 182, 0.15) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%)",
        accentColor: "#f472b6"
    },
    {
        id: "minimalist",
        name: "Minimalist",
        title: "The Minimalist",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"],
        description: "Clean, refined, elegantly simple",
        tagline: "Less is more",
        gradient: "from-slate-300 via-gray-400 to-zinc-500",
        glowColor: "rgba(148, 163, 184, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(148, 163, 184, 0.12) 0%, rgba(100, 116, 139, 0.06) 40%, transparent 70%)",
        accentColor: "#94a3b8"
    },
    {
        id: "explorer",
        name: "Explorer",
        title: "The Explorer",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"],
        description: "Adventurous, curious, free-spirited",
        tagline: "The world awaits",
        gradient: "from-emerald-400 via-teal-500 to-cyan-500",
        glowColor: "rgba(45, 212, 191, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, rgba(20, 184, 166, 0.08) 40%, transparent 70%)",
        accentColor: "#2dd4bf"
    },
    {
        id: "rebel",
        name: "Rebel",
        title: "The Rebel",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
        description: "Bold, unconventional, fearless",
        tagline: "Break the rules",
        gradient: "from-red-500 via-orange-500 to-amber-500",
        glowColor: "rgba(239, 68, 68, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.15) 0%, rgba(234, 88, 12, 0.08) 40%, transparent 70%)",
        accentColor: "#ef4444"
    },
    {
        id: "intellectual",
        name: "Intellectual",
        title: "The Intellectual",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        description: "Thoughtful, analytical, wise",
        tagline: "Knowledge is power",
        gradient: "from-blue-400 via-indigo-500 to-violet-500",
        glowColor: "rgba(99, 102, 241, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.08) 40%, transparent 70%)",
        accentColor: "#6366f1"
    },
    {
        id: "enigma",
        name: "Enigma",
        title: "The Enigma",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        description: "Mysterious, captivating, alluring",
        tagline: "Embrace the unknown",
        gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
        glowColor: "rgba(192, 132, 252, 0.6)",
        bgGradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)",
        accentColor: "#c084fc"
    }
];
function HexagonButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(86);
    if ($[0] !== "dc4aed68dcc9e63539575529be392fc3723f93bb8d2c3e7ab52454ce1a0bbeee") {
        for(let $i = 0; $i < 86; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "dc4aed68dcc9e63539575529be392fc3723f93bb8d2c3e7ab52454ce1a0bbeee";
    }
    const { personality, isSelected, onClick, index } = t0;
    const Icon = personality.icon;
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            scale: 0.5,
            y: 30
        };
        t2 = {
            opacity: 1,
            scale: 1,
            y: 0
        };
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    const t3 = index * 0.08;
    let t4;
    if ($[3] !== t3) {
        t4 = {
            duration: 0.5,
            delay: t3,
            type: "spring",
            stiffness: 200,
            damping: 15
        };
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    let t6;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            scale: 1.08
        };
        t6 = {
            scale: 0.95
        };
        $[5] = t5;
        $[6] = t6;
    } else {
        t5 = $[5];
        t6 = $[6];
    }
    const t7 = isSelected ? 1.2 : 1;
    let t8;
    if ($[7] !== t7) {
        t8 = {
            scale: t7
        };
        $[7] = t7;
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            type: "spring",
            stiffness: 400,
            damping: 25
        };
        $[9] = t9;
    } else {
        t9 = $[9];
    }
    let t10;
    if ($[10] !== isSelected || $[11] !== personality.accentColor || $[12] !== personality.glowColor) {
        t10 = isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute -inset-4 rounded-full blur-2xl",
                    style: {
                        background: personality.glowColor
                    },
                    initial: {
                        opacity: 0,
                        scale: 0.8
                    },
                    animate: {
                        opacity: [
                            0.4,
                            0.7,
                            0.4
                        ],
                        scale: [
                            1,
                            1.1,
                            1
                        ]
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 191,
                    columnNumber: 27
                }, this),
                [
                    ...Array(6)
                ].map({
                    "HexagonButton[(anonymous)()]": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute w-2 h-2 rounded-full",
                            style: {
                                background: personality.accentColor,
                                left: "50%",
                                top: "50%"
                            },
                            initial: {
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0
                            },
                            animate: {
                                opacity: [
                                    0,
                                    1,
                                    0
                                ],
                                scale: [
                                    0,
                                    1,
                                    0
                                ],
                                x: Math.cos(i * 60 * Math.PI / 180) * 70,
                                y: Math.sin(i * 60 * Math.PI / 180) * 70
                            },
                            transition: {
                                duration: 0.6,
                                delay: i * 0.05,
                                ease: "easeOut"
                            }
                        }, i, false, {
                            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                            lineNumber: 204,
                            columnNumber: 51
                        }, this)
                }["HexagonButton[(anonymous)()]"])
            ]
        }, void 0, true);
        $[10] = isSelected;
        $[11] = personality.accentColor;
        $[12] = personality.glowColor;
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    const t11 = `grad-${personality.id}`;
    let t12;
    if ($[14] !== isSelected || $[15] !== personality.accentColor) {
        t12 = isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "0%",
                    stopColor: personality.accentColor,
                    stopOpacity: "0.9"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 234,
                    columnNumber: 26
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "100%",
                    stopColor: personality.accentColor,
                    stopOpacity: "0.6"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 234,
                    columnNumber: 100
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "0%",
                    stopColor: "rgba(30, 30, 40, 0.9)"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 234,
                    columnNumber: 184
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "100%",
                    stopColor: "rgba(20, 20, 30, 0.95)"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 234,
                    columnNumber: 238
                }, this)
            ]
        }, void 0, true);
        $[14] = isSelected;
        $[15] = personality.accentColor;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] !== t11 || $[18] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
            id: t11,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[17] = t11;
        $[18] = t12;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    const t14 = `glow-${personality.id}`;
    let t15;
    let t16;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
            stdDeviation: "2",
            result: "coloredBlur"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 254,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                    in: "coloredBlur"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 255,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                    in: "SourceGraphic"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 255,
                    columnNumber: 52
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 255,
            columnNumber: 11
        }, this);
        $[20] = t15;
        $[21] = t16;
    } else {
        t15 = $[20];
        t16 = $[21];
    }
    let t17;
    if ($[22] !== t14) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
            id: t14,
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 264,
            columnNumber: 11
        }, this);
        $[22] = t14;
        $[23] = t17;
    } else {
        t17 = $[23];
    }
    let t18;
    if ($[24] !== t13 || $[25] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: [
                t13,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 272,
            columnNumber: 11
        }, this);
        $[24] = t13;
        $[25] = t17;
        $[26] = t18;
    } else {
        t18 = $[26];
    }
    const t19 = `url(#grad-${personality.id})`;
    const t20 = isSelected ? `url(#glow-${personality.id})` : undefined;
    const t21 = isSelected ? personality.accentColor : "rgba(255,255,255,0.1)";
    const t22 = isSelected ? 2.5 : 1;
    let t23;
    if ($[27] !== t19 || $[28] !== t20 || $[29] !== t21 || $[30] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
            points: "50 2, 98 29.75, 98 85.25, 50 113, 2 85.25, 2 29.75",
            fill: t19,
            filter: t20,
            className: "transition-all duration-300",
            stroke: t21,
            strokeWidth: t22
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 285,
            columnNumber: 11
        }, this);
        $[27] = t19;
        $[28] = t20;
        $[29] = t21;
        $[30] = t22;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    const t24 = isSelected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.05)";
    let t25;
    if ($[32] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
            points: "50 8, 92 32, 92 83, 50 107, 8 83, 8 32",
            fill: "transparent",
            stroke: t24,
            strokeWidth: "1",
            className: "transition-all duration-300"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[32] = t24;
        $[33] = t25;
    } else {
        t25 = $[33];
    }
    let t26;
    if ($[34] !== personality.accentColor) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
            points: "50 2, 98 29.75, 98 85.25, 50 113, 2 85.25, 2 29.75",
            fill: "transparent",
            className: "transition-all duration-300 opacity-0 group-hover:opacity-100",
            stroke: personality.accentColor,
            strokeWidth: "1.5",
            strokeOpacity: "0.5"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 305,
            columnNumber: 11
        }, this);
        $[34] = personality.accentColor;
        $[35] = t26;
    } else {
        t26 = $[35];
    }
    let t27;
    if ($[36] !== t18 || $[37] !== t23 || $[38] !== t25 || $[39] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 100 115",
            className: "w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-36 lg:h-40 drop-shadow-lg",
            children: [
                t18,
                t23,
                t25,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 313,
            columnNumber: 11
        }, this);
        $[36] = t18;
        $[37] = t23;
        $[38] = t25;
        $[39] = t26;
        $[40] = t27;
    } else {
        t27 = $[40];
    }
    const t28 = isSelected ? 1.2 : 1;
    let t29;
    if ($[41] !== t28) {
        t29 = {
            scale: t28
        };
        $[41] = t28;
        $[42] = t29;
    } else {
        t29 = $[42];
    }
    let t30;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = {
            duration: 0.3
        };
        $[43] = t30;
    } else {
        t30 = $[43];
    }
    let t31;
    if ($[44] !== Icon || $[45] !== isSelected || $[46] !== personality.accentColor) {
        t31 = isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute inset-0 blur-md",
            style: {
                color: personality.accentColor
            },
            animate: {
                opacity: [
                    0.5,
                    1,
                    0.5
                ]
            },
            transition: {
                duration: 1.5,
                repeat: Infinity
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                lineNumber: 351,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 344,
            columnNumber: 25
        }, this);
        $[44] = Icon;
        $[45] = isSelected;
        $[46] = personality.accentColor;
        $[47] = t31;
    } else {
        t31 = $[47];
    }
    const t32 = isSelected ? "#ffffff" : "rgba(255,255,255,0.5)";
    let t33;
    if ($[48] !== t32) {
        t33 = {
            color: t32
        };
        $[48] = t32;
        $[49] = t33;
    } else {
        t33 = $[49];
    }
    let t34;
    if ($[50] !== Icon) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            className: "w-full h-full"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 372,
            columnNumber: 11
        }, this);
        $[50] = Icon;
        $[51] = t34;
    } else {
        t34 = $[51];
    }
    let t35;
    if ($[52] !== t33 || $[53] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10 transition-colors duration-300 inline-flex",
            style: t33,
            children: t34
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 380,
            columnNumber: 11
        }, this);
        $[52] = t33;
        $[53] = t34;
        $[54] = t35;
    } else {
        t35 = $[54];
    }
    let t36;
    if ($[55] !== t29 || $[56] !== t31 || $[57] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "relative",
            animate: t29,
            transition: t30,
            children: [
                t31,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 389,
            columnNumber: 11
        }, this);
        $[55] = t29;
        $[56] = t31;
        $[57] = t35;
        $[58] = t36;
    } else {
        t36 = $[58];
    }
    const t37 = isSelected ? "#ffffff" : "rgba(255,255,255,0.6)";
    const t38 = isSelected ? `0 0 20px ${personality.accentColor}` : "none";
    let t39;
    if ($[59] !== t37 || $[60] !== t38) {
        t39 = {
            color: t37,
            textShadow: t38
        };
        $[59] = t37;
        $[60] = t38;
        $[61] = t39;
    } else {
        t39 = $[61];
    }
    let t40;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = {
            duration: 0.3
        };
        $[62] = t40;
    } else {
        t40 = $[62];
    }
    let t41;
    if ($[63] !== personality.name || $[64] !== t39) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
            className: "text-xs sm:text-sm font-light tracking-wider text-center leading-tight",
            style: t39,
            transition: t40,
            children: personality.name
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 422,
            columnNumber: 11
        }, this);
        $[63] = personality.name;
        $[64] = t39;
        $[65] = t41;
    } else {
        t41 = $[65];
    }
    let t42;
    if ($[66] !== isSelected || $[67] !== personality.tagline) {
        t42 = isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
            className: "text-[9px] sm:text-[10px] font-light tracking-wide text-center leading-tight max-w-[70px] sm:max-w-[80px] italic",
            style: {
                color: "rgba(255,255,255,0.8)"
            },
            initial: {
                opacity: 0,
                y: 5
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: 0.3,
                delay: 0.1
            },
            children: personality.tagline
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 431,
            columnNumber: 25
        }, this);
        $[66] = isSelected;
        $[67] = personality.tagline;
        $[68] = t42;
    } else {
        t42 = $[68];
    }
    let t43;
    if ($[69] !== t36 || $[70] !== t41 || $[71] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center gap-1 px-2",
            children: [
                t36,
                t41,
                t42
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 451,
            columnNumber: 11
        }, this);
        $[69] = t36;
        $[70] = t41;
        $[71] = t42;
        $[72] = t43;
    } else {
        t43 = $[72];
    }
    let t44;
    if ($[73] !== isSelected || $[74] !== personality.accentColor) {
        t44 = isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
            style: {
                background: personality.accentColor
            },
            initial: {
                scale: 0,
                rotate: -180
            },
            animate: {
                scale: 1,
                rotate: 0
            },
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 25
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-3.5 h-3.5 text-white",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 3,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M5 13l4 4L19 7"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 473,
                    columnNumber: 118
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                lineNumber: 473,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 461,
            columnNumber: 25
        }, this);
        $[73] = isSelected;
        $[74] = personality.accentColor;
        $[75] = t44;
    } else {
        t44 = $[75];
    }
    let t45;
    if ($[76] !== t10 || $[77] !== t27 || $[78] !== t43 || $[79] !== t44 || $[80] !== t8) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "relative",
            animate: t8,
            transition: t9,
            children: [
                t10,
                t27,
                t43,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 482,
            columnNumber: 11
        }, this);
        $[76] = t10;
        $[77] = t27;
        $[78] = t43;
        $[79] = t44;
        $[80] = t8;
        $[81] = t45;
    } else {
        t45 = $[81];
    }
    let t46;
    if ($[82] !== onClick || $[83] !== t4 || $[84] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            onClick: onClick,
            className: "relative group outline-none focus:outline-none",
            initial: t1,
            animate: t2,
            transition: t4,
            whileHover: t5,
            whileTap: t6,
            children: t45
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 494,
            columnNumber: 11
        }, this);
        $[82] = onClick;
        $[83] = t4;
        $[84] = t45;
        $[85] = t46;
    } else {
        t46 = $[85];
    }
    return t46;
}
_c = HexagonButton;
function PersonalityHexGrid(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "dc4aed68dcc9e63539575529be392fc3723f93bb8d2c3e7ab52454ce1a0bbeee") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "dc4aed68dcc9e63539575529be392fc3723f93bb8d2c3e7ab52454ce1a0bbeee";
    }
    const { selected, onSelect } = t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[1] !== onSelect || $[2] !== selected?.id) {
        const row1 = personalities.slice(0, 3);
        const row2 = personalities.slice(3, 5);
        const row3 = personalities.slice(5, 7);
        t3 = "flex flex-col items-center gap-0";
        const t6 = row1.map({
            "PersonalityHexGrid[row1.map()]": (personality, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HexagonButton, {
                    personality: personality,
                    isSelected: selected?.id === personality.id,
                    onClick: {
                        "PersonalityHexGrid[row1.map() > <HexagonButton>.onClick]": ()=>onSelect(personality)
                    }["PersonalityHexGrid[row1.map() > <HexagonButton>.onClick]"],
                    index: index
                }, personality.id, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 527,
                    columnNumber: 65
                }, this)
        }["PersonalityHexGrid[row1.map()]"]);
        if ($[8] !== t6) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 sm:gap-3 md:gap-4",
                children: t6
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                lineNumber: 532,
                columnNumber: 12
            }, this);
            $[8] = t6;
            $[9] = t4;
        } else {
            t4 = $[9];
        }
        const t7 = row2.map({
            "PersonalityHexGrid[row2.map()]": (personality_0, index_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HexagonButton, {
                    personality: personality_0,
                    isSelected: selected?.id === personality_0.id,
                    onClick: {
                        "PersonalityHexGrid[row2.map() > <HexagonButton>.onClick]": ()=>onSelect(personality_0)
                    }["PersonalityHexGrid[row2.map() > <HexagonButton>.onClick]"],
                    index: index_0 + 3
                }, personality_0.id, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 539,
                    columnNumber: 69
                }, this)
        }["PersonalityHexGrid[row2.map()]"]);
        if ($[10] !== t7) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 sm:gap-3 md:gap-4 -mt-4 sm:-mt-5 md:-mt-6",
                children: t7
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                lineNumber: 544,
                columnNumber: 12
            }, this);
            $[10] = t7;
            $[11] = t5;
        } else {
            t5 = $[11];
        }
        t1 = "flex items-center justify-center gap-2 sm:gap-3 md:gap-4 -mt-4 sm:-mt-5 md:-mt-6";
        t2 = row3.map({
            "PersonalityHexGrid[row3.map()]": (personality_1, index_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HexagonButton, {
                    personality: personality_1,
                    isSelected: selected?.id === personality_1.id,
                    onClick: {
                        "PersonalityHexGrid[row3.map() > <HexagonButton>.onClick]": ()=>onSelect(personality_1)
                    }["PersonalityHexGrid[row3.map() > <HexagonButton>.onClick]"],
                    index: index_1 + 5
                }, personality_1.id, false, {
                    fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
                    lineNumber: 552,
                    columnNumber: 69
                }, this)
        }["PersonalityHexGrid[row3.map()]"]);
        $[1] = onSelect;
        $[2] = selected?.id;
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
    } else {
        t1 = $[3];
        t2 = $[4];
        t3 = $[5];
        t4 = $[6];
        t5 = $[7];
    }
    let t6;
    if ($[12] !== t1 || $[13] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 572,
            columnNumber: 10
        }, this);
        $[12] = t1;
        $[13] = t2;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t3 || $[16] !== t4 || $[17] !== t5 || $[18] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/components/personality-hex-grid.tsx",
            lineNumber: 581,
            columnNumber: 10
        }, this);
        $[15] = t3;
        $[16] = t4;
        $[17] = t5;
        $[18] = t6;
        $[19] = t7;
    } else {
        t7 = $[19];
    }
    return t7;
}
_c1 = PersonalityHexGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "HexagonButton");
__turbopack_context__.k.register(_c1, "PersonalityHexGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/create/personality/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PersonalityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$create$2f$personality$2f$components$2f$hexagon$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/create/personality/components/hexagon-background.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$create$2f$personality$2f$components$2f$personality$2d$hex$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/create/personality/components/personality-hex-grid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Floating particle component
function FloatingParticles(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "5f19af93d06168327a57851121a393a7009eafd20fd50e52c67c00990bf391f5") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5f19af93d06168327a57851121a393a7009eafd20fd50e52c67c00990bf391f5";
    }
    const { color, count: t1 } = t0;
    const count = t1 === undefined ? 20 : t1;
    let t2;
    if ($[1] !== count) {
        t2 = [
            ...Array(count)
        ];
        $[1] = count;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== color || $[4] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 overflow-hidden pointer-events-none",
            children: t2.map({
                "FloatingParticles[(anonymous)()]": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute w-1 h-1 rounded-full",
                        style: {
                            background: color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        },
                        animate: {
                            y: [
                                0,
                                -30,
                                0
                            ],
                            x: [
                                0,
                                Math.random() * 20 - 10,
                                0
                            ],
                            opacity: [
                                0,
                                0.8,
                                0
                            ],
                            scale: [
                                0,
                                1.5,
                                0
                            ]
                        },
                        transition: {
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }
                    }, i, false, {
                        fileName: "[project]/src/app/create/personality/page.tsx",
                        lineNumber: 37,
                        columnNumber: 55
                    }, this)
            }["FloatingParticles[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 36,
            columnNumber: 10
        }, this);
        $[3] = color;
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    return t3;
}
_c = FloatingParticles;
function PersonalityPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(61);
    if ($[0] !== "5f19af93d06168327a57851121a393a7009eafd20fd50e52c67c00990bf391f5") {
        for(let $i = 0; $i < 61; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5f19af93d06168327a57851121a393a7009eafd20fd50e52c67c00990bf391f5";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedPersonality, setSelectedPersonality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showParticles, setShowParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] !== selectedPersonality) {
        t0 = ({
            "PersonalityPage[useEffect()]": ()=>{
                if (selectedPersonality) {
                    setShowParticles(true);
                }
            }
        })["PersonalityPage[useEffect()]"];
        t1 = [
            selectedPersonality
        ];
        $[1] = selectedPersonality;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "PersonalityPage[handleSelect]": (personality)=>{
                setSelectedPersonality(personality);
            }
        })["PersonalityPage[handleSelect]"];
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleSelect = t2;
    let t3;
    if ($[5] !== router || $[6] !== selectedPersonality) {
        t3 = ({
            "PersonalityPage[handleContinue]": async ()=>{
                if (!selectedPersonality) {
                    return;
                }
                setIsSubmitting(true);
                const payload = {
                    personality: {
                        id: selectedPersonality.id,
                        name: selectedPersonality.name,
                        title: selectedPersonality.title
                    },
                    timestamp: new Date().toISOString()
                };
                console.log("Personality payload:", JSON.stringify(payload, null, 2));
                localStorage.setItem("perfume_personality_data", JSON.stringify(payload));
                await new Promise(_temp);
                setIsSubmitting(false);
                router.push("/create/color-picker");
            }
        })["PersonalityPage[handleContinue]"];
        $[5] = router;
        $[6] = selectedPersonality;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    const handleContinue = t3;
    let t4;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$create$2f$personality$2f$components$2f$hexagon$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexagonBackground"], {}, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 136,
            columnNumber: 10
        }, this);
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== selectedPersonality || $[10] !== showParticles) {
        t5 = selectedPersonality && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute inset-0 pointer-events-none",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.8
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        background: selectedPersonality.bgGradient
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 151,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full",
                    style: {
                        background: selectedPersonality.glowColor
                    },
                    initial: {
                        opacity: 0,
                        scale: 0.5
                    },
                    animate: {
                        opacity: [
                            0.1,
                            0.25,
                            0.1
                        ],
                        scale: [
                            0.8,
                            1,
                            0.8
                        ]
                    },
                    transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 153,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute bottom-0 left-0 w-[500px] h-[300px] blur-[100px] rounded-full",
                    style: {
                        background: selectedPersonality.glowColor
                    },
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 0.15
                    },
                    transition: {
                        duration: 0.8
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 165,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute bottom-0 right-0 w-[500px] h-[300px] blur-[100px] rounded-full",
                    style: {
                        background: selectedPersonality.glowColor
                    },
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 0.15
                    },
                    transition: {
                        duration: 0.8
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 173,
                    columnNumber: 12
                }, this),
                showParticles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticles, {
                    color: selectedPersonality.accentColor,
                    count: 25
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 181,
                    columnNumber: 30
                }, this)
            ]
        }, selectedPersonality.id, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 143,
            columnNumber: 33
        }, this);
        $[9] = selectedPersonality;
        $[10] = showParticles;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 190,
            columnNumber: 10
        }, this);
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 198,
            columnNumber: 10
        }, this);
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t10;
    let t8;
    let t9;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            opacity: 0,
            y: -20
        };
        t9 = {
            opacity: 1,
            y: 0
        };
        t10 = {
            duration: 0.6
        };
        $[15] = t10;
        $[16] = t8;
        $[17] = t9;
    } else {
        t10 = $[15];
        t8 = $[16];
        t9 = $[17];
    }
    let t11;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 228,
                    columnNumber: 114
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-light tracking-wide",
                    children: "Back"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 228,
                    columnNumber: 149
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    const t12 = selectedPersonality ? `linear-gradient(135deg, ${selectedPersonality.accentColor}15, transparent)` : "rgba(251, 191, 36, 0.1)";
    const t13 = `1px solid ${selectedPersonality?.accentColor || "rgba(251, 191, 36, 0.3)"}`;
    let t14;
    if ($[19] !== t12 || $[20] !== t13) {
        t14 = {
            background: t12,
            border: t13
        };
        $[19] = t12;
        $[20] = t13;
        $[21] = t14;
    } else {
        t14 = $[21];
    }
    const t15 = selectedPersonality?.accentColor || "#fbbf24";
    let t16;
    if ($[22] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs font-light tracking-widest uppercase",
            style: {
                color: t15
            },
            children: "Step 1 of 8"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[22] = t15;
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    let t17;
    if ($[24] !== t14 || $[25] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-5",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm",
                    style: t14,
                    children: t16
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 260,
                    columnNumber: 72
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 260,
            columnNumber: 11
        }, this);
        $[24] = t14;
        $[25] = t16;
        $[26] = t17;
    } else {
        t17 = $[26];
    }
    const t18 = selectedPersonality?.accentColor || "#fbbf24";
    const t19 = selectedPersonality ? `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50` : "0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)";
    let t20;
    if ($[27] !== t18 || $[28] !== t19) {
        t20 = {
            color: t18,
            textShadow: t19
        };
        $[27] = t18;
        $[28] = t19;
        $[29] = t20;
    } else {
        t20 = $[29];
    }
    let t21;
    if ($[30] !== selectedPersonality) {
        t21 = selectedPersonality ? {
            textShadow: [
                `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50`,
                `0 0 50px ${selectedPersonality.accentColor}, 0 0 80px ${selectedPersonality.accentColor}60`,
                `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50`
            ]
        } : {};
        $[30] = selectedPersonality;
        $[31] = t21;
    } else {
        t21 = $[31];
    }
    let t22;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        };
        $[32] = t22;
    } else {
        t22 = $[32];
    }
    let t23;
    if ($[33] !== t20 || $[34] !== t21) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mb-3 text-4xl md:text-5xl font-light text-white tracking-wide",
            children: [
                "Choose Your",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    className: "italic font-serif",
                    style: t20,
                    animate: t21,
                    transition: t22,
                    children: "Essence"
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 304,
                    columnNumber: 105
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 304,
            columnNumber: 11
        }, this);
        $[33] = t20;
        $[34] = t21;
        $[35] = t23;
    } else {
        t23 = $[35];
    }
    let t24;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mx-auto max-w-md text-sm text-white/60 font-light tracking-wide",
            children: "Select the archetype that resonates with your inner self"
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 313,
            columnNumber: 11
        }, this);
        $[36] = t24;
    } else {
        t24 = $[36];
    }
    let t25;
    if ($[37] !== t23) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                t23,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        $[37] = t23;
        $[38] = t25;
    } else {
        t25 = $[38];
    }
    let t26;
    if ($[39] !== t17 || $[40] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "px-6 pb-4 pt-8 md:pt-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t8,
                animate: t9,
                transition: t10,
                children: [
                    t17,
                    t25
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/create/personality/page.tsx",
                lineNumber: 328,
                columnNumber: 55
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 328,
            columnNumber: 11
        }, this);
        $[39] = t17;
        $[40] = t25;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    let t28;
    let t29;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = {
            opacity: 0,
            scale: 0.9
        };
        t28 = {
            opacity: 1,
            scale: 1
        };
        t29 = {
            duration: 0.6,
            delay: 0.2
        };
        $[42] = t27;
        $[43] = t28;
        $[44] = t29;
    } else {
        t27 = $[42];
        t28 = $[43];
        t29 = $[44];
    }
    let t30;
    if ($[45] !== selectedPersonality) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "flex flex-1 items-center justify-center px-4 py-6",
            initial: t27,
            animate: t28,
            transition: t29,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$create$2f$personality$2f$components$2f$personality$2d$hex$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersonalityHexGrid"], {
                selected: selectedPersonality,
                onSelect: handleSelect
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/page.tsx",
                lineNumber: 361,
                columnNumber: 130
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        $[45] = selectedPersonality;
        $[46] = t30;
    } else {
        t30 = $[46];
    }
    let t31;
    let t32;
    let t33;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = {
            opacity: 0,
            y: 20
        };
        t32 = {
            opacity: 1,
            y: 0
        };
        t33 = {
            duration: 0.6,
            delay: 0.4
        };
        $[47] = t31;
        $[48] = t32;
        $[49] = t33;
    } else {
        t31 = $[47];
        t32 = $[48];
        t33 = $[49];
    }
    let t34;
    if ($[50] !== handleContinue || $[51] !== isSubmitting || $[52] !== selectedPersonality) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "px-6 pb-8 pt-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "mx-auto max-w-md",
                initial: t31,
                animate: t32,
                transition: t33,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: selectedPersonality ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        exit: {
                            opacity: 0,
                            y: -20,
                            scale: 0.95
                        },
                        className: "flex flex-col items-center gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "text-center px-6 py-4 rounded-2xl backdrop-blur-sm",
                                style: {
                                    background: `linear-gradient(135deg, ${selectedPersonality.accentColor}10, transparent)`,
                                    border: `1px solid ${selectedPersonality.accentColor}30`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-widest text-white/40 font-light mb-1",
                                        children: "Selected Essence"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-light tracking-wide",
                                        style: {
                                            color: selectedPersonality.accentColor,
                                            textShadow: `0 0 20px ${selectedPersonality.accentColor}60`
                                        },
                                        children: selectedPersonality.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 115
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-white/50 font-light mt-1.5",
                                        children: selectedPersonality.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 49
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/create/personality/page.tsx",
                                lineNumber: 405,
                                columnNumber: 59
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                className: "relative group w-full py-4 rounded-full font-light text-lg tracking-wide overflow-hidden backdrop-blur-sm",
                                onClick: handleContinue,
                                disabled: isSubmitting,
                                whileHover: {
                                    scale: 1.02
                                },
                                whileTap: {
                                    scale: 0.98
                                },
                                style: {
                                    background: `linear-gradient(135deg, ${selectedPersonality.accentColor}25, ${selectedPersonality.accentColor}15)`,
                                    border: `1px solid ${selectedPersonality.accentColor}40`,
                                    boxShadow: `0 0 30px ${selectedPersonality.accentColor}20`,
                                    color: "#ffffff"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12",
                                        animate: {
                                            x: [
                                                "-200%",
                                                "200%"
                                            ]
                                        },
                                        transition: {
                                            duration: 2.5,
                                            repeat: Infinity,
                                            repeatDelay: 1.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10 flex items-center justify-center gap-3",
                                        children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full",
                                            animate: {
                                                rotate: 360
                                            },
                                            transition: {
                                                duration: 0.8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/create/personality/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 107
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Continue",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    animate: {
                                                        x: [
                                                            0,
                                                            4,
                                                            0
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 1.2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    },
                                                    className: "inline-flex",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 46
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/create/personality/page.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/create/personality/page.tsx",
                                        lineNumber: 426,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/create/personality/page.tsx",
                                lineNumber: 411,
                                columnNumber: 154
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "PersonalityPage[<button>.onClick]": ()=>{
                                        setSelectedPersonality(null);
                                        setShowParticles(false);
                                    }
                                }["PersonalityPage[<button>.onClick]"],
                                className: "text-xs uppercase tracking-widest text-white/30 hover:text-white/50 transition-all duration-300 font-light",
                                type: "button",
                                children: "Reset Selection"
                            }, void 0, false, {
                                fileName: "[project]/src/app/create/personality/page.tsx",
                                lineNumber: 438,
                                columnNumber: 110
                            }, this)
                        ]
                    }, "selected", true, {
                        fileName: "[project]/src/app/create/personality/page.tsx",
                        lineNumber: 393,
                        columnNumber: 184
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -10
                        },
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: "text-white/40 text-sm font-light tracking-wide",
                            animate: {
                                opacity: [
                                    0.3,
                                    0.6,
                                    0.3
                                ]
                            },
                            transition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            children: "Select a hexagon to reveal your essence"
                        }, void 0, false, {
                            fileName: "[project]/src/app/create/personality/page.tsx",
                            lineNumber: 452,
                            columnNumber: 38
                        }, this)
                    }, "instruction", false, {
                        fileName: "[project]/src/app/create/personality/page.tsx",
                        lineNumber: 443,
                        columnNumber: 226
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/create/personality/page.tsx",
                    lineNumber: 393,
                    columnNumber: 132
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/create/personality/page.tsx",
                lineNumber: 393,
                columnNumber: 46
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[50] = handleContinue;
        $[51] = isSubmitting;
        $[52] = selectedPersonality;
        $[53] = t34;
    } else {
        t34 = $[53];
    }
    let t35;
    if ($[54] !== t26 || $[55] !== t30 || $[56] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 flex min-h-screen flex-col",
            children: [
                t26,
                t30,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 468,
            columnNumber: 11
        }, this);
        $[54] = t26;
        $[55] = t30;
        $[56] = t34;
        $[57] = t35;
    } else {
        t35 = $[57];
    }
    let t36;
    if ($[58] !== t35 || $[59] !== t6) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "relative min-h-screen overflow-hidden bg-[#050505]",
            children: [
                t4,
                t6,
                t7,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/create/personality/page.tsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[58] = t35;
        $[59] = t6;
        $[60] = t36;
    } else {
        t36 = $[60];
    }
    return t36;
}
_s(PersonalityPage, "2xZfDBVTLGXHeRU1JF+kxLT9mzM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = PersonalityPage;
function _temp(resolve) {
    return setTimeout(resolve, 800);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "FloatingParticles");
__turbopack_context__.k.register(_c1, "PersonalityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_create_personality_0ff8bf36._.js.map