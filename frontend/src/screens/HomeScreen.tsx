/**
 * HOME — HOJE NO RU
 * Artboard independente. Não altera nenhuma tela existente.
 */
import AvaliacoesDiaLinks from '@/components/home/AvaliacoesDiaLinks'
import CommunityMini from '@/components/home/CommunityMini'
import FeedbackCTA from '@/components/home/FeedbackCTA'
import GreetingHeader from '@/components/home/GreetingHeader'
import LiveReviews from '@/components/home/LiveReviews'
import LotacaoAgora from '@/components/home/LotacaoAgora'
import MealCard from '@/components/home/MealCard'
import PlanejamentoSemana from '@/components/home/PlanejamentoSemana'
import TopBar from '@/components/home/TopBar'
import type { Avaliacao, DiaPlanejado, LotacaoStats, Refeicao, RefeicaoData } from '@/types'

export interface HomeScreenProps {
  hoje: Date
  campusName: string
  restauranteName: string
  mealTipo: Refeicao
  mealStatus: "agora" | "proxima" | "encerrado"
  mealData: RefeicaoData
  lotacao: LotacaoStats | null
  planejadosCount: number
  diasPlanejados: DiaPlanejado[]
  mediaAvaliacoes: string
  totalAvaliacoes: number
  avaliacoesHoje: Avaliacao[]
  onVerCardapio: () => void
  onVerLotacao: () => void
  onAvaliar: () => void
  onVerHistorico: () => void
  onReclamar: () => void
  onPlanejar: () => void
}

export default function HomeScreen({
  hoje,
  campusName,
  restauranteName,
  mealTipo,
  mealStatus,
  mealData,
  lotacao,
  planejadosCount,
  diasPlanejados = [],
  mediaAvaliacoes,
  totalAvaliacoes,
  avaliacoesHoje = [],
  onVerCardapio,
  onVerLotacao,
  onAvaliar,
  onVerHistorico,
  onReclamar,
  onPlanejar,
}: HomeScreenProps) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
    <TopBar hoje={hoje} campusName={campusName} restauranteName={restauranteName} />
      {/* ── Scrollable content ── */}
      <div className="max-w-lg mx-auto px-4 pt-6 pb-32 space-y-5">
      <GreetingHeader hoje={hoje} />
      {/* Planejamento: props recebidas mas nunca renderizadas no original (ver PlanejamentoSemana) */}
      <PlanejamentoSemana diasPlanejados={diasPlanejados} planejadosCount={planejadosCount} onPlanejar={onPlanejar} />
      <MealCard mealTipo={mealTipo} mealStatus={mealStatus} mealData={mealData} onVerCardapio={onVerCardapio} />
      <LiveReviews avaliacoesHoje={avaliacoesHoje} mealData={mealData} restauranteName={restauranteName} mealStatus={mealStatus} onAvaliar={onAvaliar} />
      <AvaliacoesDiaLinks hoje={hoje} onVerHistorico={onVerHistorico} />
      <LotacaoAgora lotacao={lotacao} mealData={mealData} mealTipo={mealTipo} onVerLotacao={onVerLotacao} />
      <FeedbackCTA totalAvaliacoes={totalAvaliacoes} mediaAvaliacoes={mediaAvaliacoes} onAvaliar={onAvaliar} onReclamar={onReclamar} />
      <CommunityMini totalAvaliacoes={totalAvaliacoes} mediaAvaliacoes={mediaAvaliacoes} />
    </div>
  </div>
  )
}
