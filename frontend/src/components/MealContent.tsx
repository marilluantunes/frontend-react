import { AlergDots, AlergLegende, SectionLabel } from '@/components/ui'
import type { FiltrosAlimentares, ItemCardapio, Refeicao, RefeicaoData } from '@/types'
import { getFruitEmoji, iAlerg, iNome } from '@/utils'

export interface MealContentProps {
  data: RefeicaoData
  dia?: number
  ref: Refeicao
  filtros?: FiltrosAlimentares
}

export default function MealContent({ data, ref: mealRef, filtros }: MealContentProps) {
  // ── Função que decide se um item deve aparecer ──
  const deveMostrar = (item: ItemCardapio): boolean => {
    if (!filtros) return true
    // Se o item contém algum alérgeno marcado → esconde
    const alergenosDoItem = iAlerg(item)
    const temAlergenoMarcado = filtros.alergenos.some(a => alergenosDoItem.includes(a))
    return !temAlergenoMarcado
  }

  // ── Lógica dos vegetarianos ──
  const esconderPratoPrincipal =
    filtros?.vegetariano || filtros?.vegetarianoEstrito
  const esconderOpcaoVegetariana =
    filtros?.vegetarianoEstrito && !filtros?.vegetariano
  const esconderVegetarianoEstrito =
    filtros?.vegetariano && !filtros?.vegetarianoEstrito

  return (
    <div className="space-y-3">
      {/* Hero — Prato Principal */}
      {!esconderPratoPrincipal && deveMostrar(data.prato_principal) && (
        <div className="rounded-3xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(30,86,49,0.08)', border: '1px solid rgba(30,86,49,0.1)' }}>
          <div style={{ background: 'linear-gradient(135deg, #1E5631 0%, #2D6A3F 100%)' }} className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase mb-2"
                  style={{ background: 'rgba(201,168,76,0.25)', color: '#C9A84C' }}>
                  Prato Principal
                </span>
                <h2 className="text-white text-xl font-bold leading-snug">
                  {iNome(data.prato_principal)}<AlergDots item={data.prato_principal} />
                </h2>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl"
                style={{ background: 'rgba(255,255,255,0.15)' }} aria-hidden="true">🍽️</div>
            </div>
          </div>
          <div className="px-5 py-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#e8f5ed', color: '#1E5631' }}>
              <span aria-hidden="true">●</span> Proteína
            </span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>· {data.horario}</span>
          </div>
        </div>
      )}

      {mealRef === 'cafe' ? (<>
        {/* ── CAFÉ DA MANHÃ ── */}

        {/* Bebidas + Panificação */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#EEF3F9' }} aria-hidden="true">☕</div>
            <SectionLabel>Bebidas</SectionLabel>
            <ul className="space-y-1">
              {data.acompanhamentos
                .filter(a => /café|chá|leite|suco|achocolatado|iogurte|soja/i.test(iNome(a)))
                .filter(deveMostrar)
                .map(a => (
                  <li key={iNome(a)} className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(a)}<AlergDots item={a} /></li>
                ))}
              {data.suco && <li className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Suco de {data.suco}</li>}
            </ul>
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#FDF6EE' }} aria-hidden="true">🍞</div>
            <SectionLabel>Panificação</SectionLabel>
            <ul className="space-y-1">
              {data.guarnicao.filter(deveMostrar).map((item, i) => (
                <li key={i} className="text-xs font-semibold flex items-start gap-1.5" style={{ color: 'var(--foreground)' }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 shrink-0" style={{ background: '#C9A84C' }} aria-hidden="true" />
                  <span>{iNome(item)}<AlergDots item={item} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opção Extra + Gordura */}
        <div className="grid grid-cols-2 gap-3">
          {data.opcao_extra && deveMostrar(data.opcao_extra) && (
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#FEF2F2' }} aria-hidden="true">⭐</div>
              <SectionLabel>Opção Extra</SectionLabel>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.opcao_extra)}<AlergDots item={data.opcao_extra} /></p>
            </div>
          )}
          {data.gordura && deveMostrar(data.gordura) && (
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#FFFBEB' }} aria-hidden="true">🧈</div>
              <SectionLabel>Gordura</SectionLabel>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.gordura)}<AlergDots item={data.gordura} /></p>
            </div>
          )}
        </div>

        {/* Complemento Padrão — só se prato principal não foi escondido */}
        {!esconderPratoPrincipal && deveMostrar(data.prato_principal) && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#F5F0E8' }} aria-hidden="true">🥚</div>
              <SectionLabel>Complemento Padrão</SectionLabel>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.prato_principal)}<AlergDots item={data.prato_principal} /></p>
          </div>
        )}

        {/* Complemento Ovolactovegetariano */}
        {!esconderOpcaoVegetariana && data.opcao_vegetariana && deveMostrar(data.opcao_vegetariana) && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#EEF7F1' }} aria-hidden="true">🥛</div>
              <SectionLabel>Complemento Ovolactovegetariano</SectionLabel>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.opcao_vegetariana)}<AlergDots item={data.opcao_vegetariana} /></p>
          </div>
        )}

        {/* Complemento Vegetariano Estrito */}
        {!esconderVegetarianoEstrito && data.complemento_vegetariano_estrito && deveMostrar(data.complemento_vegetariano_estrito) && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#F0FDF4' }} aria-hidden="true">🌱</div>
              <SectionLabel>Complemento Vegetariano Estrito</SectionLabel>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.complemento_vegetariano_estrito)}<AlergDots item={data.complemento_vegetariano_estrito} /></p>
          </div>
        )}

        {/* Fruta */}
        {deveMostrar(data.sobremesa) && (
          <div className="rounded-2xl p-4 flex flex-col items-center text-center"
            style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2" style={{ background: '#FDF6EE' }} aria-hidden="true">{getFruitEmoji(iNome(data.sobremesa))}</div>
            <SectionLabel>Fruta</SectionLabel>
            <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{iNome(data.sobremesa)}<AlergDots item={data.sobremesa} /></p>
          </div>
        )}

        <AlergLegende alergenos={data.alergenos} />
      </>) : (<>
        {/* ── ALMOÇO / JANTAR ── */}

        {/* Ovolactovegetariano + Guarnição */}
        <div className="grid grid-cols-2 gap-3">
          {!esconderOpcaoVegetariana && data.opcao_vegetariana && deveMostrar(data.opcao_vegetariana) && (
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#EEF7F1' }} aria-hidden="true">🥦</div>
              <SectionLabel>Ovolactovegetariano</SectionLabel>
              <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--foreground)' }}>{iNome(data.opcao_vegetariana)}<AlergDots item={data.opcao_vegetariana} /></p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: '#EEF7F1', color: '#1E5631' }}>Vegetariano</span>
            </div>
          )}
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#F5F0E8' }} aria-hidden="true">🍚</div>
            <SectionLabel>Guarnição</SectionLabel>
            <ul className="space-y-1">
              {data.guarnicao.filter(deveMostrar).map((item, i) => (
                <li key={i} className="text-xs font-semibold flex items-start gap-1.5" style={{ color: 'var(--foreground)' }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C9A84C' }} aria-hidden="true" />
                  <span>{iNome(item)}<AlergDots item={item} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vegetariano Estrito */}
        {!esconderVegetarianoEstrito && data.vegetariano_estrito && deveMostrar(data.vegetariano_estrito) && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#F0FDF4' }} aria-hidden="true">🌱</div>
              <SectionLabel>Vegetariano Estrito</SectionLabel>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.vegetariano_estrito)}<AlergDots item={data.vegetariano_estrito} /></p>
          </div>
        )}

        {/* Salada 1 + Salada 2 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#EEF7F1' }} aria-hidden="true">🥬</div>
            <SectionLabel>Salada 1</SectionLabel>
            {(() => {
              const s1 = data.salada1 ?? data.saladas[0] ?? '—'
              return deveMostrar(s1) ? <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(s1)}<AlergDots item={s1} /></p> : null
            })()}
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl" style={{ background: '#EEF7F1' }} aria-hidden="true">🥗</div>
            <SectionLabel>Salada 2</SectionLabel>
            {(() => {
              const s2 = data.salada2 ?? data.saladas[1] ?? '—'
              return deveMostrar(s2) ? <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(s2)}<AlergDots item={s2} /></p> : null
            })()}
          </div>
        </div>

        {/* Molho para Salada */}
        {data.molho_salada && deveMostrar(data.molho_salada) && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#FDF6EE' }} aria-hidden="true">🫙</div>
              <SectionLabel>Molho para Salada</SectionLabel>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{iNome(data.molho_salada)}<AlergDots item={data.molho_salada} /></p>
          </div>
        )}

        {/* Acompanhamentos */}
        {data.acompanhamentos.filter(deveMostrar).length > 0 && (
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: '#EEF7F1' }} aria-hidden="true">🍛</div>
              <SectionLabel>Acompanhamentos</SectionLabel>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.acompanhamentos.filter(deveMostrar).map(a => (
                <span key={iNome(a)} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>{iNome(a)}<AlergDots item={a} /></span>
              ))}
            </div>
          </div>
        )}

        {/* Sobremesa + Bebida */}
        <div className="grid grid-cols-2 gap-3">
          {deveMostrar(data.sobremesa) && (
            <div className="rounded-2xl p-4 flex flex-col items-center text-center"
              style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2" style={{ background: '#FDF6EE' }} aria-hidden="true">{getFruitEmoji(iNome(data.sobremesa))}</div>
              <SectionLabel>Sobremesa</SectionLabel>
              <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{iNome(data.sobremesa)}<AlergDots item={data.sobremesa} /></p>
            </div>
          )}
          {data.bebida && deveMostrar(data.bebida) && (
            <div className="rounded-2xl p-4 flex flex-col items-center text-center"
              style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2" style={{ background: '#EEF3F9' }} aria-hidden="true">🥤</div>
              <SectionLabel>Bebida</SectionLabel>
              <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{iNome(data.bebida)}<AlergDots item={data.bebida} /></p>
            </div>
          )}
        </div>

        <AlergLegende alergenos={data.alergenos} />
      </>)}

    </div>
  )
}