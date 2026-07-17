"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CheckCircle2,
  Eraser,
  PenLine,
  Type,
  Upload,
  X,
} from "lucide-react";
import type { ApprovalItem } from "@/lib/types";
import { getProjectById, currentUser } from "@/lib/data";

type SignMode = "draw" | "type" | "upload";
type Step = "document" | "adopt" | "complete";

export function SignatureModal({
  item,
  onClose,
  onComplete,
}: {
  item: ApprovalItem;
  onClose: () => void;
  onComplete: (itemId: string) => void;
}) {
  const [step, setStep] = useState<Step>("document");
  const [mode, setMode] = useState<SignMode>("draw");
  const [typedName, setTypedName] = useState(currentUser.name);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const project = item.projectId ? getProjectById(item.projectId) : undefined;
  const signedAt = new Date().toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }, []);

  useEffect(() => {
    if (mode !== "draw" || step !== "adopt") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#0a3d2e";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [mode, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.preventDefault();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const moveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.preventDefault();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasInk(true);
  };

  const endDraw = () => {
    drawing.current = false;
  };

  const adoptTyped = () => {
    if (!typedName.trim()) return;
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "transparent";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0a3d2e";
    ctx.font = "italic 48px 'Segoe Script', 'Apple Chancery', cursive";
    ctx.fillText(typedName.trim(), 24, 85);
    setSignatureDataUrl(canvas.toDataURL("image/png"));
    setPlaced(true);
    setStep("document");
  };

  const adoptDrawn = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk) return;
    setSignatureDataUrl(canvas.toDataURL("image/png"));
    setPlaced(true);
    setStep("document");
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureDataUrl(String(reader.result));
      setPlaced(true);
      setStep("document");
    };
    reader.readAsDataURL(file);
  };

  const finishSigning = (e?: FormEvent) => {
    e?.preventDefault();
    if (!placed || !signatureDataUrl) return;
    setStep("complete");
    window.setTimeout(() => {
      onComplete(item.id);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">
      <div
        className="absolute inset-0"
        onClick={step === "complete" ? undefined : onClose}
        aria-hidden
      />
      <div className="relative flex max-h-[min(920px,96vh)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#f4f7f6] shadow-2xl">
        {/* Header — DocuSign-like */}
        <div className="flex items-center justify-between border-b border-[#dce5e0] bg-white px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a3d2e] text-white">
              <PenLine className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#1a2e26]">
                {item.title}
              </p>
              <p className="text-[11px] text-[#6b7c74]">
                Takla Nation · Electronic signature
                {project ? ` · ${project.name}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {step !== "complete" ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-[12px] font-medium text-[#5a6b63] hover:bg-[#f0f5f2]"
              >
                Cancel
              </button>
            ) : null}
            {step === "document" ? (
              <button
                type="button"
                disabled={!placed}
                onClick={() => finishSigning()}
                className="rounded-lg bg-[#0a3d2e] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#0d4a38] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Finish
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-[#8a9a92] hover:bg-[#f0f5f2] hover:text-[#1a2e26]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {step === "complete" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5ef]">
              <CheckCircle2 className="h-9 w-9 text-[#0d7a4f]" />
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-[#1a2e26]">
                Document signed
              </h3>
              <p className="mt-2 max-w-md text-[14px] text-[#6b7c74]">
                {item.title} was electronically signed by {currentUser.name} on{" "}
                {signedAt}. A certificate of completion has been recorded.
              </p>
            </div>
            {signatureDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signatureDataUrl}
                alt="Applied signature"
                className="h-14 object-contain"
              />
            ) : null}
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_280px]">
            {/* Document canvas */}
            <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
              <div className="mx-auto max-w-[680px] rounded-sm border border-[#d5ddd8] bg-white shadow-[0_4px_24px_rgba(10,61,46,0.08)]">
                <div className="border-b border-[#eef2f0] px-8 py-6">
                  <p className="text-[11px] tracking-[0.14em] text-[#8a9a92] uppercase">
                    Takla Nation · Official document
                  </p>
                  <h2 className="mt-2 text-[20px] font-semibold text-[#1a2e26]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#6b7c74]">{item.subtitle}</p>
                </div>
                <div className="space-y-4 px-8 py-6 text-[13px] leading-relaxed text-[#3d4f46]">
                  <p>
                    This instrument is issued for the purpose of recording the
                    Nation&apos;s position and authorizing the actions described
                    herein. By signing below, the authorized signatory confirms
                    review of the attached schedules and supporting materials.
                  </p>
                  <p>
                    Reference: {project?.name ?? "Chief's Office file"} ·
                    Prepared for electronic execution under Takla Nation portal
                    procedures. Signature fields marked in yellow require action
                    before completion.
                  </p>
                  <div className="rounded-lg border border-[#e5ebe8] bg-[#f7faf8] p-4 text-[12px]">
                    <p className="font-semibold text-[#1a2e26]">Summary</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-[#5a6b63]">
                      <li>Document type: {item.action === "sign" ? "Signature required" : "Approval"}</li>
                      <li>Requested of: {currentUser.name}</li>
                      <li>Department file: linked project workspace</li>
                      <li>Status: {placed ? "Signature applied — ready to finish" : "Awaiting signature"}</li>
                    </ul>
                  </div>

                  <div className="pt-8">
                    <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#8a9a92] uppercase">
                      Authorized signature
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (!placed) setStep("adopt");
                        else setStep("adopt");
                      }}
                      className={`relative flex h-28 w-full max-w-md flex-col items-start justify-center rounded border-2 border-dashed px-4 transition ${
                        placed
                          ? "border-[#0d7a4f] bg-[#e8f5ef]/40"
                          : "border-[#f5c842] bg-[#fff8db] hover:bg-[#fff3c4]"
                      }`}
                    >
                      {!placed ? (
                        <>
                          <span className="absolute -top-2.5 left-3 rounded bg-[#f5c842] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#5c4a1a] uppercase">
                            Sign here
                          </span>
                          <span className="flex items-center gap-2 text-[13px] font-medium text-[#8a6d1a]">
                            <PenLine className="h-4 w-4" />
                            Click to sign
                          </span>
                        </>
                      ) : (
                        <>
                          {signatureDataUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={signatureDataUrl}
                              alt="Signature"
                              className="h-14 max-w-full object-contain object-left"
                            />
                          ) : null}
                          <span className="mt-1 text-[10px] text-[#6b7c74]">
                            Electronically signed by {currentUser.name} · Click to
                            change
                          </span>
                        </>
                      )}
                    </button>
                    <div className="mt-3 h-px w-full max-w-md bg-[#1a2e26]" />
                    <p className="mt-1 text-[11px] text-[#6b7c74]">
                      Name: {currentUser.name} · Title: Chief
                    </p>
                    <p className="text-[11px] text-[#6b7c74]">
                      Date: {placed ? signedAt : "——————"}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#eef2f0] px-8 py-3 text-[10px] text-[#8a9a92]">
                  Page 1 of 1 · Encrypted session · Demo e-signature (DocuSign-style)
                </div>
              </div>
            </div>

            {/* Right rail */}
            <aside className="hidden border-l border-[#e5ebe8] bg-white p-4 lg:block">
              <p className="text-[11px] font-semibold tracking-wide text-[#8a9a92] uppercase">
                Required
              </p>
              <button
                type="button"
                onClick={() => setStep("adopt")}
                className={`mt-3 w-full rounded-lg border px-3 py-3 text-left text-[12px] transition ${
                  placed
                    ? "border-[#0d7a4f] bg-[#e8f5ef]"
                    : "border-[#f5c842] bg-[#fff8db]"
                }`}
              >
                <span className="font-semibold text-[#1a2e26]">
                  {placed ? "Signature applied" : "Sign"}
                </span>
                <span className="mt-0.5 block text-[#6b7c74]">
                  {placed
                    ? "Review document, then Finish"
                    : "Click the yellow field on the document"}
                </span>
              </button>
              <div className="mt-6 space-y-2 text-[11px] text-[#6b7c74]">
                <p className="font-semibold text-[#1a2e26]">How it works</p>
                <ol className="list-decimal space-y-1.5 pl-4">
                  <li>Open the Sign here field</li>
                  <li>Draw, type, or upload your signature</li>
                  <li>Adopt &amp; place on the document</li>
                  <li>Click Finish to complete</li>
                </ol>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Adopt signature panel */}
      {step === "adopt" ? (
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-black/40 p-3 sm:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-[#1a2e26]">
                  Adopt your signature
                </p>
                <p className="text-[12px] text-[#6b7c74]">
                  Confirm style to place on this document
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("document")}
                className="rounded-lg p-2 text-[#8a9a92] hover:bg-[#f0f5f2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-1 border-b border-[#eef2f0] px-3 pt-2">
              {(
                [
                  { id: "draw", label: "Draw", icon: PenLine },
                  { id: "type", label: "Type", icon: Type },
                  { id: "upload", label: "Upload", icon: Upload },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMode(t.id)}
                  className={`inline-flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-[12px] font-semibold ${
                    mode === t.id
                      ? "bg-[#f7faf8] text-[#0a3d2e]"
                      : "text-[#6b7c74] hover:text-[#1a2e26]"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {mode === "draw" ? (
                <div>
                  <div className="overflow-hidden rounded-xl border border-[#dce5e0] bg-[#fafcfb]">
                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={160}
                      className="h-40 w-full touch-none cursor-crosshair"
                      onMouseDown={startDraw}
                      onMouseMove={moveDraw}
                      onMouseUp={endDraw}
                      onMouseLeave={endDraw}
                      onTouchStart={startDraw}
                      onTouchMove={moveDraw}
                      onTouchEnd={endDraw}
                    />
                  </div>
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6b7c74] hover:text-[#1a2e26]"
                    >
                      <Eraser className="h-3.5 w-3.5" />
                      Clear
                    </button>
                    <button
                      type="button"
                      disabled={!hasInk}
                      onClick={adoptDrawn}
                      className="rounded-lg bg-[#0a3d2e] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#0d4a38] disabled:opacity-40"
                    >
                      Adopt and sign
                    </button>
                  </div>
                </div>
              ) : null}

              {mode === "type" ? (
                <div>
                  <input
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[#dce5e0] px-3 text-[14px] outline-none focus:border-[#0a3d2e]"
                    placeholder="Full legal name"
                  />
                  <div className="mt-3 flex h-24 items-center justify-center rounded-xl border border-dashed border-[#dce5e0] bg-[#fafcfb]">
                    <p
                      className="px-4 text-center text-[32px] text-[#0a3d2e]"
                      style={{
                        fontFamily:
                          "'Segoe Script', 'Apple Chancery', 'Snell Roundhand', cursive",
                      }}
                    >
                      {typedName || "Your signature"}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      disabled={!typedName.trim()}
                      onClick={adoptTyped}
                      className="rounded-lg bg-[#0a3d2e] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#0d4a38] disabled:opacity-40"
                    >
                      Adopt and sign
                    </button>
                  </div>
                </div>
              ) : null}

              {mode === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={onUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#dce5e0] bg-[#fafcfb] text-[13px] text-[#6b7c74] hover:border-[#0a3d2e] hover:text-[#0a3d2e]"
                  >
                    <Upload className="h-6 w-6" />
                    Upload a PNG or JPG of your signature
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
