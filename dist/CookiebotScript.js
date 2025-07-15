"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookiebotScript = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const script_1 = __importDefault(require("next/script"));
const CookiebotScript = ({ dataCbid = "861c1b39-c9d3-4683-8e87-f8bfdf277ab2", dataGeoregions = "{'region':'US','cbid':'413d7e56-4be1-412e-9e11-166a1381b987'}", locale }) => {
    return ((0, jsx_runtime_1.jsx)(script_1.default, { id: "Cookiebot", src: "https://consent.cookiebot.com/uc.js", "data-culture": locale, "data-georegions": dataGeoregions, "data-cbid": dataCbid, strategy: "afterInteractive" }));
};
exports.CookiebotScript = CookiebotScript;
