import { useState, useRef, useMemo } from 'react'
import HomeScreen from '@/screens/HomeScreen'
import A11yFloat from '@/components/A11yFloat'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import AppNav from '@/components/AppNav'
import AvaliarTab from '@/screens/AvaliarTab'
import CardapioTab from '@/screens/CardapioTab'
import LotacaoTab from '@/screens/LotacaoTab'

import { AVALIACOES_INICIAIS, CAMPUSES, CARDAPIO_SEMANA, DIAS_SEMANA } from './data'
import type { Avaliacao, NivelLotacao, Reclamacao, Refeicao, ReportLotacao } from './types'
import { getCurrentMealInfo } from './utils'

export default function App() {
  const [campus, setCampus] = useState(CAMPUSES[0])
  const [restaurante, setRestaurante] = useState(CAMPUSES[0].restaurantes[0])
  const [refeicao, setRefeicao] = useState<Refeicao>('almoco')
  const [tab, setTab] = useState<'hoje' | 'cardapio' | 'lotacao' | 'avaliar'>('hoje')
  const [diaSemana, setDiaSemana] = useState<number>(new Date().getDay())
  const [tabAvaliar, setTabAvaliar] = useState<'form' | 'historico' | 'reclamacao'>('form')

  // Meal planning
  const [refeicoesPlanejadas, setRefeicoesPlanejadas] = useState<Set<string>>(new Set())
  const togglePlanejada = (dia: number, ref: Refeicao) => {
    const key = `${dia}-${ref}`
    setRefeicoesPlanejadas(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }
  const isPlanejada = (dia: number, ref: Refeicao) => refeicoesPlanejadas.has(`${dia}-${ref}`)

  // Lotação
  const [lotacaoReports, setLotacaoReports] = useState<ReportLotacao[]>([])
  const [lotacaoEnviada, setLotacaoEnviada] = useState(false)
  const [lotacaoNivel, setLotacaoNivel] = useState<NivelLotacao | null>(null)

  const reportarLotacao = () => {
    if (!lotacaoNivel) return
    setLotacaoReports(prev => [...prev, { campus: campus.name, restaurante, nivel: lotacaoNivel, timestamp: Date.now() }])
    setLotacaoEnviada(true)
    setLotacaoNivel(null)
    setTimeout(() => setLotacaoEnviada(false), 2500)
  }

  const getLotacaoStats = (campusName: string, rest: string) => {
    const recentes = lotacaoReports.filter(r => r.campus === campusName && r.restaurante === rest && Date.now() - r.timestamp < 3600000)
    const total = recentes.length
    if (total === 0) return null
    const counts = { vazio: 0, moderado: 0, cheio: 0 }
    recentes.forEach(r => counts[r.nivel]++)
    const predominante = (Object.entries(counts) as [NivelLotacao, number][]).sort((a, b) => b[1] - a[1])[0][0]
    return { total, counts, predominante }
  }

  const currentLotacao = getLotacaoStats(campus.name, restaurante)
  const lotacaoLabel = currentLotacao?.predominante === 'cheio' ? 'Alto movimento' :
                       currentLotacao?.predominante === 'moderado' ? 'Movimento moderado' : 'Tranquilo'
  const lotacaoEmoji = currentLotacao?.predominante === 'cheio' ? '🔴' :
                       currentLotacao?.predominante === 'moderado' ? '🟡' : '🟢'
  const lotacaoColor = currentLotacao?.predominante === 'cheio' ? '#EF4444' :
                       currentLotacao?.predominante === 'moderado' ? '#F59E0B' : '#22C55E'

  // Avaliações
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(AVALIACOES_INICIAIS)
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([])

  const [avNome, setAvNome] = useState('')
  const [avSabor, setAvSabor] = useState(0)
  const [avSal, setAvSal] = useState(0)
  const [avTemp, setAvTemp] = useState(0)
  const [avApres, setAvApres] = useState(0)
  const [avQtd, setAvQtd] = useState(0)
  const [avGeral, setAvGeral] = useState(0)
  const [avComentario, setAvComentario] = useState('')
  const [avFoto, setAvFoto] = useState<string | undefined>()
  const [avSuccess, setAvSuccess] = useState(false)

  const [recNome, setRecNome] = useState('')
  const [recCategoria, setRecCategoria] = useState('Qualidade da comida')
  const [recDescricao, setRecDescricao] = useState('')
  const [recFoto, setRecFoto] = useState<string | null>(null)
  const [recSuccess, setRecSuccess] = useState(false)
  const recFotoRef = useRef<HTMLInputElement>(null)

  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleCampusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = CAMPUSES.find(x => x.id === e.target.value)!
    setCampus(c)
    setRestaurante(c.restaurantes[0])
    if (c.id !== 'darcy' && (diaSemana === 0 || diaSemana === 6)) setDiaSemana(5)
  }

  const handleFoto = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => setAvFoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) handleFoto(file)
  }

  const submitAvaliacao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!avSabor || !avSal || !avTemp || !avApres || !avQtd || !avGeral) return
    const nova: Avaliacao = {
      id: Date.now(), autor: avNome || 'Anônimo',
      refeicao: cardapioDia[refeicao].label,
      sabor: avSabor, sal: avSal, temperatura: avTemp,
      apresentacao: avApres, quantidade: avQtd, geral: avGeral,
      comentario: avComentario, foto: avFoto,
      data: new Date().toLocaleDateString('pt-BR'),
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }
    setAvaliacoes(prev => [nova, ...prev])
    setAvNome(''); setAvSabor(0); setAvSal(0); setAvTemp(0); setAvApres(0); setAvQtd(0); setAvGeral(0)
    setAvComentario(''); setAvFoto(undefined)
    setAvSuccess(true)
    setTimeout(() => { setAvSuccess(false); setTab('avaliar'); setTabAvaliar('historico') }, 1800)
  }

  const submitReclamacao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recDescricao.trim()) return
    const nova: Reclamacao = {
      id: Date.now(), autor: recNome || 'Anônimo', categoria: recCategoria,
      descricao: recDescricao,
      data: new Date().toLocaleDateString('pt-BR'),
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'Aberta',
    }
    setReclamacoes(prev => [nova, ...prev])
    setRecNome(''); setRecDescricao(''); setRecCategoria('Qualidade da comida'); setRecFoto(null)
    setRecSuccess(true)
    setTimeout(() => setRecSuccess(false), 3000)
  }

  const cardapioDia = CARDAPIO_SEMANA[diaSemana]
  const cardapio = cardapioDia[refeicao]
  const diasDisponiveis = campus.id === 'darcy' ? [0,1,2,3,4,5,6] : [1,2,3,4,5]
  const mediaGeral = avaliacoes.length
    ? (avaliacoes.reduce((s, a) => s + a.geral, 0) / avaliacoes.length).toFixed(1) : '—'

  const hoje = new Date()
  const hojeIdx = hoje.getDay()
  const hojeCardapio = CARDAPIO_SEMANA[hojeIdx]
  const mealInfo = getCurrentMealInfo()
  const hojeMeal = hojeCardapio[mealInfo.tipo]
  const planejadosCount = refeicoesPlanejadas.size

  // Build week-day planning summary for HomeScreen (Mon–Fri for non-Darcy, all for Darcy)
  const diasPlanejadosHome = useMemo(() => {
    return diasDisponiveis.map(d => ({
      dia: d,
      label: DIAS_SEMANA[d],
      planejado: (['cafe','almoco','jantar'] as Refeicao[]).some(r => isPlanejada(d, r)),
    }))
  }, [diasDisponiveis, refeicoesPlanejadas])

  // Acessibilidade
  const [a11yOpen, setA11yOpen] = useState(false)
  const [fontSize, setFontSize] = useState<'normal' | 'grande' | 'maior'>('normal')
  const [altoContraste, setAltoContraste] = useState(false)
  const [espacamento, setEspacamento] = useState(false)
  const [sublinharLinks, setSublinharLinks] = useState(false)

  return (
    <div
      className={`min-h-screen ${espacamento ? 'tracking-wide leading-loose' : ''} ${sublinharLinks ? 'underline-links' : ''} ${altoContraste ? 'alto-contraste' : ''}`}
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      {/* Skip link */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm focus:text-white focus:shadow-lg"
        style={{ background: 'var(--primary)' }}>
        Pular para o conteúdo
      </a>

    {/* Acessibilidade flutuante */}
    <A11yFloat a11yOpen={a11yOpen} setA11yOpen={setA11yOpen} fontSize={fontSize} setFontSize={setFontSize} altoContraste={altoContraste} setAltoContraste={setAltoContraste} espacamento={espacamento} setEspacamento={setEspacamento} sublinharLinks={sublinharLinks} setSublinharLinks={setSublinharLinks} />

    {/* Header */}
    <AppHeader campus={campus} restaurante={restaurante} hoje={hoje} mediaGeral={mediaGeral} totalAvaliacoes={avaliacoes.length} planejadosCount={planejadosCount} handleCampusChange={handleCampusChange} onRestauranteChange={setRestaurante} />

    {/* Nav */}
    <AppNav tab={tab} setTab={setTab} />

      {/* Content */}
      <main id="main-content" style={{ scrollMarginTop: '60px', background: 'var(--background)' }}>

        {/* ─── HOJE ─── */}
        {tab === 'hoje' && (
          <div id="panel-hoje" role="tabpanel" aria-labelledby="tab-hoje">
            <HomeScreen
              hoje={hoje}
              campusName={campus.name}
              restauranteName={campus.restaurantes.length > 1 ? restaurante : campus.name}
              mealTipo={mealInfo.tipo}
              mealStatus={mealInfo.status}
              mealData={hojeMeal}
              lotacao={currentLotacao}
              planejadosCount={planejadosCount}
              diasPlanejados={diasPlanejadosHome}
              mediaAvaliacoes={mediaGeral}
              totalAvaliacoes={avaliacoes.length}
              avaliacoesHoje={avaliacoes.filter(a => {
                if (!hojeMeal || a.refeicao !== hojeMeal.label) return false
                const hojeStr = hoje.toLocaleDateString('pt-BR')
                return a.data === hojeStr || a.data === 'hoje'
              })}
              onVerCardapio={() => { setTab('cardapio'); setDiaSemana(hojeIdx); setRefeicao(mealInfo.tipo) }}
              onVerLotacao={() => setTab('lotacao')}
              onAvaliar={() => { setTab('avaliar'); setTabAvaliar('form'); setRefeicao(mealInfo.tipo) }}
              onVerHistorico={() => { setTab('avaliar'); setTabAvaliar('historico') }}
              onReclamar={() => { setTab('avaliar'); setTabAvaliar('reclamacao') }}
              onPlanejar={() => { setTab('cardapio'); setDiaSemana(hojeIdx) }}
            />
          </div>
        )}

    {/* ─── CARDÁPIO ─── */}
    {tab === 'cardapio' && (
      <CardapioTab cardapioDia={cardapioDia} diaSemana={diaSemana} setDiaSemana={setDiaSemana} diasDisponiveis={diasDisponiveis} refeicao={refeicao} setRefeicao={setRefeicao} isPlanejada={isPlanejada} planejadosCount={planejadosCount} cardapio={cardapio} />
    )}

    {/* ─── LOTAÇÃO ─── */}
    {tab === 'lotacao' && (
      <LotacaoTab campus={campus} restaurante={restaurante} currentLotacao={currentLotacao} lotacaoLabel={lotacaoLabel} lotacaoEmoji={lotacaoEmoji} lotacaoColor={lotacaoColor} lotacaoEnviada={lotacaoEnviada} lotacaoNivel={lotacaoNivel} setLotacaoNivel={setLotacaoNivel} reportarLotacao={reportarLotacao} getLotacaoStats={getLotacaoStats} />
    )}

    {/* ─── AVALIAR ─── */}
    {tab === 'avaliar' && (
      <AvaliarTab
        tabAvaliar={tabAvaliar}
        setTabAvaliar={setTabAvaliar}
        formProps={{ cardapioDia, refeicao, setRefeicao, avNome, setAvNome, avSabor, setAvSabor, avSal, setAvSal, avTemp, setAvTemp, avApres, setAvApres, avQtd, setAvQtd, avGeral, setAvGeral, avComentario, setAvComentario, avFoto, setAvFoto, avSuccess, fileRef, dragging, setDragging, handleFoto, handleDrop, submitAvaliacao }}
        historicoProps={{ avaliacoes, mediaGeral, setTab }}
        reclamacoesProps={{ recSuccess, recCategoria, setRecCategoria, recNome, setRecNome, recDescricao, setRecDescricao, recFoto, setRecFoto, recFotoRef, submitReclamacao, reclamacoes }}
      />
    )}
      </main>

    <AppFooter campus={campus} restaurante={restaurante} />
  </div>
  )
}
