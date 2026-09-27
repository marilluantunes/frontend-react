import type { Avaliacao, Campus, CardapioRefeicoes, CardapiosPorCampus, CategoriaReclamacao, Refeicao } from '@/types'

export const CAMPUSES: Campus[] = [
  { id: 'darcy', name: 'Darcy Ribeiro' },
  { id: 'gama', name: 'Gama' },
  { id: 'planaltina', name: 'Planaltina' },
  { id: 'ceilandia', name: 'Ceilândia' },
  { id: 'fal', name: 'FAL' },
]

// ═══════════════════════════════════════════════════════════════
// CARDÁPIO DO DARCY RIBEIRO (7 dias — funciona todos os dias)
// ═══════════════════════════════════════════════════════════════
const CARDAPIO_DARCY: CardapioRefeicoes[] = [
  // Domingo (0)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:{ nome:'Patê de atum', alergenos:[] },opcao_vegetariana:{ nome:'Requeijão cremoso', alergenos:['leite'] },guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },{ nome:'Pão de forma', alergenos:['trigo'] },'Tapioca'],acompanhamentos:['Café ou Chá',{ nome:'Leite ou Bebida de soja', alergenos:['leite','soja'] }],saladas:[],sobremesa:'Melancia',suco:'maracujá',gordura:{ nome:'Manteiga', alergenos:['leite'] },opcao_extra:{ nome:'Bolo de banana', alergenos:['trigo','ovo','leite'] },complemento_vegetariano_estrito:{ nome:'Pasta de amendoim natural', alergenos:['amendoim'] },alergenos:['trigo','leite','amendoim','soja'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:{ nome:'Frango assado com ervas finas', alergenos:[] },opcao_vegetariana:{ nome:'Quibe de aveia ao forno', alergenos:['trigo','ovo'] },guarnicao:['Arroz branco','Feijão carioca','Arroz integral'],acompanhamentos:[{ nome:'Farofa de cenoura', alergenos:['trigo'] },'Couve refogada','Vinagrete'],saladas:['Alface','Tomate','Chuchu cozido'],sobremesa:'Laranja',suco:'acerola',salada1:'Alface',salada2:'Tomate + Chuchu cozido',molho_salada:'Vinagrete clássico',bebida:'Suco de acerola',vegetariano_estrito:{ nome:'Quibe de aveia sem ovos', alergenos:['trigo'] },alergenos:['trigo','soja'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Filé de peixe grelhado com limão',opcao_vegetariana:{ nome:'Omelete de legumes', alergenos:['ovo','leite'] },guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:[{ nome:'Purê de batata-doce', alergenos:['leite'] },'Abobrinha refogada'],saladas:['Alface americana','Pepino','Tomate'],sobremesa:'Banana',suco:'laranja',salada1:'Alface americana',salada2:'Pepino + Tomate',molho_salada:'Azeite de oliva',bebida:'Suco de laranja',vegetariano_estrito:'Legumes grelhados ao azeite',alergenos:['ovo','leite'] },
  },
  // Segunda (1)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de frango',opcao_vegetariana:'Queijo minas',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },'Pão careca',{ nome:'Pão integral', alergenos:['trigo'] }],acompanhamentos:['Manteiga ou Creme Vegetal','Café ou Chá','Leite integral ou Bebida de soja'],saladas:[],sobremesa:'Melancia',suco:'limão',gordura:'Manteiga ou Creme Vegetal',opcao_extra:'Biscoito integral',complemento_vegetariano_estrito:'Homus com azeite',alergenos:['trigo','leite','soja'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:{ nome:'Frango ao molho de maracujá com alho-poró', alergenos:['soja'] },opcao_vegetariana:{ nome:'Croquete de grão-de-bico com molho de ervas', alergenos:['trigo','soja'] },guarnicao:['Arroz branco','Feijão carioca','Arroz integral'],acompanhamentos:[{ nome:'Farofa de bacon', alergenos:['trigo','suino'] },'Couve refogada com alho','Vinagrete'],saladas:['Alface crespa','Tomate cereja','Cenoura ralada','Beterraba cozida'],sobremesa:'Laranja',suco:'caju',salada1:'Alface crespa + Tomate cereja',salada2:'Cenoura ralada + Beterraba cozida',molho_salada:'Azeite com limão',bebida:'Suco de caju',vegetariano_estrito:{ nome:'Grão-de-bico ao azeite', alergenos:[] },alergenos:['soja','suino'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Carne assada ao molho escuro',opcao_vegetariana:'Omelete de espinafre com ricota',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Purê de batata','Abobrinha refogada'],saladas:['Alface americana','Pepino','Tomate'],sobremesa:'Banana',suco:'laranja',salada1:'Alface americana',salada2:'Pepino + Tomate',molho_salada:'Vinagrete',bebida:'Suco de laranja',vegetariano_estrito:'Espinafre refogado com alho',alergenos:['ovo','leite'] },
  },
  // Terça (2)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de peito de peru',opcao_vegetariana:'Cream cheese',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },{ nome:'Croissant', alergenos:['trigo','leite'] },{ nome:'Pão integral', alergenos:['trigo'] }],acompanhamentos:['Manteiga','Café ou Chá','Leite ou Iogurte'],saladas:[],sobremesa:'Mamão',suco:'laranja',gordura:'Manteiga',opcao_extra:'Tapioca recheada',complemento_vegetariano_estrito:'Pasta de berinjela',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:{ nome:'Carne bovina ao molho madeira', alergenos:['trigo'] },opcao_vegetariana:{ nome:'Estrogonofe de cogumelos', alergenos:['leite','cogumelo'] },guarnicao:['Arroz branco','Feijão fradinho',{ nome:'Macarrão', alergenos:['trigo'] }],acompanhamentos:[{ nome:'Farofa de milho', alergenos:['trigo'] },'Brócolis no vapor','Vinagrete'],saladas:['Rúcula','Tomate','Pepino','Cenoura'],sobremesa:'Melão',suco:'manga',salada1:'Rúcula + Tomate',salada2:'Pepino + Cenoura',molho_salada:{ nome:'Molho de iogurte', alergenos:['leite'] },bebida:'Suco de manga',vegetariano_estrito:'Tofu ao molho de legumes',alergenos:['trigo','leite','cogumelo','soja'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Frango xadrez',opcao_vegetariana:'Tofu grelhado com legumes',guarnicao:['Arroz branco','Lentilha'],acompanhamentos:['Batata-palha','Repolho refogado'],saladas:['Alface','Tomate','Beterraba'],sobremesa:'Laranja',suco:'abacaxi',salada1:'Alface + Tomate',salada2:'Beterraba',molho_salada:'Azeite com ervas',bebida:'Suco de abacaxi',vegetariano_estrito:'Lentilha ao curry',alergenos:['soja'] },
  },
  // Quarta (3)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de sardinha',opcao_vegetariana:'Ricota temperada',guarnicao:[{ nome:'Pão de forma', alergenos:['trigo'] },{ nome:'Pão francês', alergenos:['trigo'] },'Bisnaguinha'],acompanhamentos:['Manteiga','Café ou Chá','Achocolatado'],saladas:[],sobremesa:'Abacaxi',suco:'goiaba',gordura:'Manteiga',opcao_extra:'Mingau de aveia',complemento_vegetariano_estrito:'Pasta de grão-de-bico',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Peixe ao molho de tomates frescos',opcao_vegetariana:'Curry de grão-de-bico',guarnicao:['Arroz integral','Feijão carioca','Pirão'],acompanhamentos:['Farofa de dendê','Quiabo refogado','Vinagrete'],saladas:['Couve','Tomate','Cenoura','Chuchu'],sobremesa:'Manga',suco:'limão',salada1:'Couve + Tomate',salada2:'Cenoura + Chuchu',molho_salada:'Vinagrete de mostarda',bebida:'Suco de limão',vegetariano_estrito:'Curry de legumes sem laticínios',alergenos:['soja','pimenta'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Linguiça ao molho de pimenta',opcao_vegetariana:'Polenta grelhada com molho de tomate',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Batata cozida com ervas','Espinafre refogado'],saladas:['Alface','Tomate','Pepino'],sobremesa:'Banana',suco:'uva',salada1:'Alface + Tomate',salada2:'Pepino',molho_salada:'Molho de ervas',bebida:'Suco de uva',vegetariano_estrito:'Polenta com legumes',alergenos:['suino','pimenta'] },
  },
  // Quinta (4)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de frango defumado',opcao_vegetariana:'Queijo coalho',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },{ nome:'Pão de queijo', alergenos:['leite','trigo'] },{ nome:'Pão integral', alergenos:['trigo'] }],acompanhamentos:['Manteiga','Café ou Chá','Leite ou Bebida de soja'],saladas:[],sobremesa:'Pera',suco:'caju',gordura:'Manteiga',opcao_extra:'Cuscuz de milho',complemento_vegetariano_estrito:'Creme de castanha-de-caju',alergenos:['trigo','leite','oleaginosa'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Alcatra assada com alecrim',opcao_vegetariana:'Nhoque de batata ao molho pesto',guarnicao:['Arroz branco','Feijão mulatinho',{ nome:'Macarrão', alergenos:['trigo'] }],acompanhamentos:['Farofa de alho','Cenoura refogada','Vinagrete'],saladas:['Agrião','Tomate','Pepino','Milho'],sobremesa:'Laranja',suco:'maracujá',salada1:'Agrião + Tomate',salada2:'Pepino + Milho',molho_salada:'Azeite com limão',bebida:'Suco de maracujá',vegetariano_estrito:'Nhoque de mandioca sem laticínios',alergenos:['trigo','leite','oleaginosa'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Frango ao leite de coco',opcao_vegetariana:'Berinjela recheada com queijo',guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Mandioca cozida','Couve-flor refogada'],saladas:['Alface','Tomate','Beterraba'],sobremesa:'Maçã',suco:'abacaxi',salada1:'Alface + Tomate',salada2:'Beterraba',molho_salada:'Vinagrete',bebida:'Suco de abacaxi',vegetariano_estrito:'Berinjela grelhada com ervas',alergenos:['leite'] },
  },
  // Sexta (5)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de atum com ervas',opcao_vegetariana:'Cottage com tomate',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },{ nome:'Pão de forma', alergenos:['trigo'] },'Tapioca'],acompanhamentos:['Manteiga','Café ou Chá','Leite ou Iogurte'],saladas:[],sobremesa:'Uva',suco:'limão',gordura:'Manteiga',opcao_extra:'Pão de queijo',complemento_vegetariano_estrito:'Guacamole',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Peixe à Romana com molho tártaro',opcao_vegetariana:'Bolinho de feijão com salsa',guarnicao:['Arroz branco','Feijão carioca','Arroz integral'],acompanhamentos:['Pirão de peixe','Couve refogada','Vinagrete'],saladas:['Alface','Tomate','Cenoura','Beterraba'],sobremesa:'Melancia',suco:'acerola',salada1:'Alface + Tomate',salada2:'Cenoura + Beterraba',molho_salada:'Molho tártaro',bebida:'Suco de acerola',vegetariano_estrito:'Feijão temperado com ervas',alergenos:['trigo','ovo','leite'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Bife acebolado com molho de alho',opcao_vegetariana:'Quiche de queijo e espinafre',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Batata frita','Abobrinha grelhada'],saladas:['Rúcula','Tomate','Pepino'],sobremesa:'Banana',suco:'maçã',salada1:'Rúcula + Tomate',salada2:'Pepino',molho_salada:'Azeite com alho',bebida:'Suco de maçã',vegetariano_estrito:'Abobrinha grelhada com tomate',alergenos:['ovo','leite','trigo'] },
  },
  // Sábado (6)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Patê de presunto',opcao_vegetariana:'Queijo minas com geleia',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },{ nome:'Pão de forma', alergenos:['trigo'] },{ nome:'Broa de milho', alergenos:['trigo'] }],acompanhamentos:['Manteiga','Café ou Chá','Leite ou Bebida de soja'],saladas:[],sobremesa:'Mamão',suco:'laranja',gordura:'Manteiga',opcao_extra:'Bolo de fubá',complemento_vegetariano_estrito:'Pasta de girassol',alergenos:['trigo','leite','suino','oleaginosa'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Feijoada completa',opcao_vegetariana:'Feijão preto sem carnes com farofa',guarnicao:['Arroz branco','Couve refogada','Laranja'],acompanhamentos:['Farofa de mandioca','Torresmo','Vinagrete'],saladas:['Alface','Tomate','Cenoura'],sobremesa:'Laranja',suco:'maracujá',salada1:'Alface + Tomate',salada2:'Cenoura',molho_salada:'Vinagrete',bebida:'Suco de maracujá',vegetariano_estrito:'Feijão preto simples sem farofa',alergenos:['suino','trigo'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Frango grelhado com limão-siciliano',opcao_vegetariana:'Omelete de ricota com orégano',guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Batata assada','Brócolis no vapor'],saladas:['Alface americana','Pepino','Tomate'],sobremesa:'Melão',suco:'uva',salada1:'Alface americana + Pepino',salada2:'Tomate',molho_salada:'Azeite com orégano',bebida:'Suco de uva',vegetariano_estrito:'Brócolis grelhado com azeite',alergenos:['ovo','leite'] },
  },
]

// ═══════════════════════════════════════════════════════════════
// CARDÁPIO DO GAMA (5 dias — seg a sex; dom e sáb são vazios)
// ═══════════════════════════════════════════════════════════════
const REFEICAO_VAZIA = {
  label: 'Sem funcionamento', horario: '—',
  prato_principal: '—', opcao_vegetariana: '—',
  guarnicao: [], acompanhamentos: [], saladas: [],
  sobremesa: '—', suco: '—',
}

const CARDAPIO_GAMA: CardapioRefeicoes[] = [
  // Domingo (0) — fechado
  { cafe: { ...REFEICAO_VAZIA, label: 'Café da Manhã' }, almoco: { ...REFEICAO_VAZIA, label: 'Almoço' }, jantar: { ...REFEICAO_VAZIA, label: 'Jantar' } },
  // Segunda (1)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Pão com ovo mexido',opcao_vegetariana:'Queijo minas',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] },'Tapioca'],acompanhamentos:['Café ou Chá','Leite'],saladas:[],sobremesa:'Mamão',suco:'laranja',alergenos:['trigo','ovo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Frango grelhado com legumes',opcao_vegetariana:{ nome:'Tofu grelhado', alergenos:['soja'] },guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Salada de tomate','Vinagrete'],saladas:['Alface','Tomate'],sobremesa:'Laranja',suco:'acerola',alergenos:['soja'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Peixe ao molho',opcao_vegetariana:'Omelete de legumes',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Purê de batata'],saladas:['Alface','Pepino'],sobremesa:'Banana',suco:'laranja',alergenos:['ovo','leite'] },
  },
  // Terça (2)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Pão com manteiga',opcao_vegetariana:'Requeijão',guarnicao:[{ nome:'Pão integral', alergenos:['trigo'] }],acompanhamentos:['Café','Leite'],saladas:[],sobremesa:'Banana',suco:'maracujá',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Carne cozida com batata',opcao_vegetariana:'Quibe de abóbora',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Couve refogada'],saladas:['Alface','Tomate'],sobremesa:'Melancia',suco:'caju',alergenos:['trigo'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Frango ao molho branco',opcao_vegetariana:'Estrogonofe de palmito',guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Batata palha'],saladas:['Alface'],sobremesa:'Maçã',suco:'uva',alergenos:['leite'] },
  },
  // Quarta (3)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Pão com queijo',opcao_vegetariana:'Ricota',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] }],acompanhamentos:['Café','Achocolatado'],saladas:[],sobremesa:'Mamão',suco:'goiaba',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Peixe assado com ervas',opcao_vegetariana:'Curry de grão-de-bico',guarnicao:['Arroz integral','Feijão carioca'],acompanhamentos:['Farofa','Vinagrete'],saladas:['Couve','Tomate'],sobremesa:'Manga',suco:'limão',alergenos:['soja'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Linguiça acebolada',opcao_vegetariana:'Polenta com molho',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Batata cozida'],saladas:['Alface','Pepino'],sobremesa:'Banana',suco:'uva',alergenos:['suino'] },
  },
  // Quinta (4)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Pão com ovo',opcao_vegetariana:'Queijo coalho',guarnicao:[{ nome:'Pão integral', alergenos:['trigo'] }],acompanhamentos:['Café','Leite'],saladas:[],sobremesa:'Pera',suco:'caju',alergenos:['trigo','ovo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Carne assada com alecrim',opcao_vegetariana:'Nhoque de batata',guarnicao:['Arroz branco','Feijão mulatinho'],acompanhamentos:['Farofa','Cenoura'],saladas:['Agrião','Tomate'],sobremesa:'Laranja',suco:'maracujá',alergenos:['trigo','leite'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Frango ao leite de coco',opcao_vegetariana:'Berinjela recheada',guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Mandioca'],saladas:['Alface','Beterraba'],sobremesa:'Maçã',suco:'abacaxi',alergenos:['leite'] },
  },
  // Sexta (5)
  {
    cafe: { label:'Café da Manhã',horario:'7h – 9h30',prato_principal:'Pão com atum',opcao_vegetariana:'Cottage',guarnicao:[{ nome:'Pão francês', alergenos:['trigo'] }],acompanhamentos:['Café','Iogurte'],saladas:[],sobremesa:'Uva',suco:'limão',alergenos:['trigo','leite'] },
    almoco: { label:'Almoço',horario:'11h – 14h30',prato_principal:'Peixe à Romana',opcao_vegetariana:'Bolinho de feijão',guarnicao:['Arroz branco','Feijão carioca'],acompanhamentos:['Pirão','Couve'],saladas:['Alface','Tomate'],sobremesa:'Melancia',suco:'acerola',alergenos:['trigo','ovo'] },
    jantar:  { label:'Jantar',horario:'17h – 19h30',prato_principal:'Bife acebolado',opcao_vegetariana:'Quiche de espinafre',guarnicao:['Arroz branco','Feijão preto'],acompanhamentos:['Batata frita'],saladas:['Rúcula','Tomate'],sobremesa:'Banana',suco:'maçã',alergenos:['ovo','leite'] },
  },
  // Sábado (6) — fechado
  { cafe: { ...REFEICAO_VAZIA, label: 'Café da Manhã' }, almoco: { ...REFEICAO_VAZIA, label: 'Almoço' }, jantar: { ...REFEICAO_VAZIA, label: 'Jantar' } },
]

// Placeholders: Ceilândia, Planaltina e FAL reusam o cardápio do Gama
const CARDAPIO_CEILANDIA = CARDAPIO_GAMA
const CARDAPIO_PLANALTINA = CARDAPIO_GAMA
const CARDAPIO_FAL = CARDAPIO_GAMA

// ═══════════════════════════════════════════════════════════════
// MAPA campus → cardápio
// ═══════════════════════════════════════════════════════════════
export const CARDAPIOS_POR_CAMPUS: CardapiosPorCampus = {
  darcy: CARDAPIO_DARCY,
  gama: CARDAPIO_GAMA,
  ceilandia: CARDAPIO_CEILANDIA,
  planaltina: CARDAPIO_PLANALTINA,
  fal: CARDAPIO_FAL,
}

// Compatibilidade com código legado
export const CARDAPIO_SEMANA = CARDAPIO_DARCY

// ═══════════════════════════════════════════════════════════════
// Alérgenos
// ═══════════════════════════════════════════════════════════════
export const ALERGENOS_MAP: Record<string, { label: string; emoji: string; color: string }> = {
  trigo:      { label: 'Trigo/Glúten', emoji: '🌾', color: '#D4A017' },
  soja:       { label: 'Soja',         emoji: '🫘', color: '#7CB518' },
  leite:      { label: 'Leite',        emoji: '🥛', color: '#4A90D9' },
  ovo:        { label: 'Ovo',          emoji: '🥚', color: '#E8A020' },
  amendoim:   { label: 'Amendoim',     emoji: '🥜', color: '#B5651D' },
  oleaginosa: { label: 'Oleaginosa',   emoji: '🌰', color: '#8B4513' },
  suino:      { label: 'Suíno',        emoji: '🐷', color: '#D4748B' },
  pimenta:    { label: 'Pimenta',      emoji: '🌶️', color: '#CC2200' },
  mel:        { label: 'Mel',          emoji: '🍯', color: '#C8960C' },
  cogumelo:   { label: 'Cogumelo',     emoji: '🍄', color: '#8B7355' },
}

export const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
export const DIAS_SEMANA_COMPLETO = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

// ═══════════════════════════════════════════════════════════════
// Lotação
// ═══════════════════════════════════════════════════════════════
export const LOTACAO_TIMELINE: Record<Refeicao, { hora: string; pct: number }[]> = {
  cafe: [
    { hora: '7h', pct: 30 }, { hora: '7h30', pct: 55 }, { hora: '8h', pct: 75 },
    { hora: '8h30', pct: 60 }, { hora: '9h', pct: 35 }, { hora: '9h30', pct: 15 },
  ],
  almoco: [
    { hora: '11h', pct: 25 }, { hora: '11h30', pct: 60 }, { hora: '12h', pct: 90 },
    { hora: '12h30', pct: 95 }, { hora: '13h', pct: 85 }, { hora: '13h30', pct: 55 },
    { hora: '14h', pct: 30 }, { hora: '14h30', pct: 10 },
  ],
  jantar: [
    { hora: '17h', pct: 20 }, { hora: '17h30', pct: 50 }, { hora: '18h', pct: 80 },
    { hora: '18h30', pct: 85 }, { hora: '19h', pct: 55 }, { hora: '19h30', pct: 20 },
  ],
}

export const CATEGORIAS_RECLAMACAO: CategoriaReclamacao[] = [
  { id: 'Qualidade da comida', emoji: '🍽️', label: 'Qualidade' },
  { id: 'Higiene', emoji: '🧼', label: 'Higiene' },
  { id: 'Atendimento', emoji: '👥', label: 'Atendimento' },
  { id: 'Quantidade', emoji: '🍛', label: 'Quantidade' },
  { id: 'Infraestrutura', emoji: '🏠', label: 'Estrutura' },
  { id: 'Outro', emoji: '💬', label: 'Outro' },
]

export const AVALIACOES_INICIAIS: Avaliacao[] = [
  { id: 1, autor: 'Gabriel S.', refeicao: 'Almoço', campus: 'Darcy Ribeiro', sabor: 4, sal: 3, temperatura: 5, apresentacao: 4, quantidade: 4, geral: 4,
    comentario: 'O frango estava no ponto certo, mas o molho poderia ter mais tempero. A couve refogada estava ótima!', data: '22/09/2026' },
  { id: 2, autor: 'Mariana L.', refeicao: 'Almoço', campus: 'Darcy Ribeiro', sabor: 5, sal: 4, temperatura: 4, apresentacao: 5, quantidade: 5, geral: 5,
    comentario: 'Melhor bandejão da semana! Croquete vegetariano simplesmente perfeito.', data: '22/09/2026' },
  { id: 3, autor: 'Pedro H.', refeicao: 'Jantar', campus: 'Gama', sabor: 3, sal: 2, temperatura: 3, apresentacao: 3, quantidade: 4, geral: 3,
    comentario: 'A carne estava um pouco salgada demais. Esperando melhorar amanhã.', data: '21/09/2026' },
]

export const SAUDACOES = {
  manha: "Bom dia",
  tarde: "Boa tarde",
  noite: "Boa noite",
}

export const MEAL_ICONS: Record<Refeicao, string> = {
  cafe: "☕",
  almoco: "🍽️",
  jantar: "🌙",
}

export const MEAL_COLORS: Record<Refeicao, { from: string; to: string }> = {
  cafe: { from: "#7C4A1E", to: "#A3622A" },
  almoco: { from: "#1E5631", to: "#2D6A3F" },
  jantar: { from: "#1A2E4A", to: "#243D5E" },
}

export const LOTACAO_INFO = {
  vazio: { emoji: "🟢", label: "Tranquilo", color: "#22C55E", bg: "#F0FDF4" },
  moderado: { emoji: "🟡", label: "Moderado", color: "#F59E0B", bg: "#FFFBEB" },
  cheio: {
    emoji: "🔴",
    label: "Alto movimento",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
}

export const MELHOR_HORARIO: Record<Refeicao, string> = {
  cafe: "7h – 7h30",
  almoco: "11h – 11h30",
  jantar: "17h – 17h30",
}

export const LOTACAO_BAR: Record<Refeicao, number[]> = {
  cafe: [30, 55, 75, 60, 35, 15],
  almoco: [25, 60, 90, 95, 85, 55, 30, 10],
  jantar: [20, 50, 80, 85, 55, 20],
}

export const LOTACAO_HOURS: Record<Refeicao, string[]> = {
  cafe: ["7h", "", "8h", "", "9h", ""],
  almoco: ["11h", "", "12h", "", "13h", "", "14h", ""],
  jantar: ["17h", "", "18h", "", "19h", ""],
}