"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookiebotScript = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const script_1 = __importDefault(require("next/script"));
const CookiebotScript = ({ dataCbid = "8776d47d-b119-406e-b740-75e92a9bb6c7", dataGeoregions = "{'region':'US','cbid':'968102f8-faa9-4a36-b62d-fd80106ae2ec'}", locale }) => {
    return ((0, jsx_runtime_1.jsx)(script_1.default, { id: "Cookiebot", src: "https://consent.cookiebot.com/uc.js", "data-culture": locale, "data-georegions": dataGeoregions, "data-cbid": dataCbid, strategy: "afterInteractive" }));
};
exports.CookiebotScript = CookiebotScript;
