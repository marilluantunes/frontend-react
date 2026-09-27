import { MEAL_COLORS, MEAL_ICONS } from '@/data'
import type { Refeicao, RefeicaoData } from '@/types'
import { iNome } from '@/utils'

export interface MealCardProps {
  mealTipo: Refeicao
  mealStatus: 'agora' | 'proxima' | 'encerrado'
  mealData: RefeicaoData
  onVerCardapio: () => void
}

export default function MealCard({ mealTipo, mealStatus, mealData, onVerCardapio }: MealCardProps) {
  const mealColors = MEAL_COLORS[mealTipo]

  const statusLabel =
    mealStatus === "agora"
      ? "Aberto agora"
      : mealStatus === "proxima"
        ? "Próxima refeição"
        : "Encerrado hoje"

  const statusColor =
    mealStatus === "agora" ? "rgba(201,168,76,0.9)" : "rgba(255,255,255,0.45)"

  return (
    <>
        {/* ── CARD PRINCIPAL — refeição de agora ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(30,86,49,0.18)" }}
        >
          {/* Colored header band */}
          <div
            className="relative px-5 pt-5 pb-0"
            style={{
              background: `linear-gradient(135deg, ${mealColors.from} 0%, ${mealColors.to} 100%)`,
            }}
          >
            {/* Ghost watermark */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-0.5rem",
                bottom: "-1.5rem",
                fontSize: "9rem",
                lineHeight: 1,
                opacity: 0.06,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {MEAL_ICONS[mealTipo]}
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: statusColor,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: statusColor,
                    boxShadow:
                      mealStatus === "agora"
                        ? `0 0 6px ${statusColor}`
                        : "none",
                  }}
                  aria-hidden="true"
                />
                {statusLabel}
              </span>
            </div>

            {/* Meal label + time */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {mealData.label}
                </p>
                <p
                  className="text-white font-bold text-2xl leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {iNome(mealData.prato_principal)}
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ml-3"
                style={{ background: "rgba(255,255,255,0.12)" }}
                aria-hidden="true"
              >
                {MEAL_ICONS[mealTipo]}
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1.5 pb-4">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "rgba(255,255,255,0.4)" }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {mealData.horario}
              </span>
            </div>
          </div>

          {/* Details section */}
          <div style={{ background: "#fff" }} className="px-5 pt-4 pb-1">
            {mealTipo === "cafe" ? (
              <>
                {/* Complemento Padrão */}
                <div
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #F0EDE8" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#F5F0E8" }}
                    aria-hidden="true"
                  >
                    🥚
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#8B6914" }}
                    >
                      Complemento Padrão
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.prato_principal)}
                    </p>
                  </div>
                </div>
                {/* Ovolactovegetariano */}
                <div
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #F0EDE8" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#EEF7F1" }}
                    aria-hidden="true"
                  >
                    🥛
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#1E5631" }}
                    >
                      Ovolactovegetariano
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.opcao_vegetariana)}
                    </p>
                  </div>
                </div>
                {/* Vegetariano Estrito */}
                <div
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #F0EDE8" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#F0FDF4" }}
                    aria-hidden="true"
                  >
                    🌱
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#166534" }}
                    >
                      Vegetariano Estrito
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.complemento_vegetariano_estrito ?? "—")}
                    </p>
                  </div>
                </div>
                {/* Opção Extra */}
                <div className="flex items-start gap-3 py-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#FEF2F2" }}
                    aria-hidden="true"
                  >
                    ⭐
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#9A3412" }}
                    >
                      Opção Extra
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.opcao_extra ?? "—")}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Ovolactovegetariano */}
                <div
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #F0EDE8" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#EEF7F1" }}
                    aria-hidden="true"
                  >
                    🥦
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#1E5631" }}
                    >
                      Ovolactovegetariano
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.opcao_vegetariana)}
                    </p>
                  </div>
                </div>
                {/* Vegetariano Estrito */}
                <div
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #F0EDE8" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#F0FDF4" }}
                    aria-hidden="true"
                  >
                    🌱
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#166534" }}
                    >
                      Vegetariano Estrito
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {iNome(mealData.vegetariano_estrito ?? "—")}
                    </p>
                  </div>
                </div>
                {/* Guarnição */}
                <div className="flex items-start gap-3 py-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background: "#F5F0E8" }}
                    aria-hidden="true"
                  >
                    🍚
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "#8B6914" }}
                    >
                      Guarnição
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A18" }}
                    >
                      {mealData.guarnicao.map(iNome).join(" · ")}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={onVerCardapio}
            className="w-full flex items-center justify-between px-5 py-4 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: "#1E5631", color: "#fff" }}
          >
            <span>Ver cardápio completo</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
    </>
  )
}
