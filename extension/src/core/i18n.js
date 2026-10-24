// Idioma de la interfaz: español (el del diseño), inglés y portugués.
// Los textos se escriben en español en todos lados (plantillas del diseño, parches, popup, aviso);
// acá se traducen al dibujar: el runtime pasa por translate() cada texto y cada atributo legible
// (ver setTranslator en dc/runtime.js) y localizeTemplate() traduce las partes fijas de las plantillas.
// Se guarda en Apariencia (localStorage 'archivero.ui.v1' → lang) y la librería lo copia en los
// ajustes compartidos para el service worker (aviso al guardar y menú del clic derecho).

export const LANGS = [['es', 'Español'], ['en', 'English'], ['pt', 'Português']];

// español | inglés | portugués
const ROWS = `
Todavía no hay nada hecho|Nothing here yet|Ainda não há nada aqui
Creá tu primera nota con el botón + del menú de abajo.|Create your first note with the + button in the menu below.|Crie sua primeira nota com o botão + do menu abaixo.
Dibujá, subí una imagen o insertá una captura en esta cara. Tocá la nota para escribir en el reverso.|Draw, upload an image or insert a screenshot on this side. Tap the note to write on the back.|Desenhe, envie uma imagem ou insira uma captura nesta face. Toque na nota para escrever no verso.
Captura|Screenshot|Captura
Tocá fuera del texto para volver al frente|Tap outside the text to go back to the front|Toque fora do texto para voltar à frente
Listo|Done|Pronto
← Notas|← Notes|← Notas
← Anterior|← Previous|← Anterior
Siguiente →|Next →|Próxima →
Se escribe en el reverso de la nota|Write on the back of the note|Escreva no verso da nota
Izq.|Left|Esq.
Centro|Center|Centro
Pasá sobre un trazo para borrarlo|Move over a stroke to erase it|Passe sobre um traço para apagá-lo
Borrar todo|Clear all|Apagar tudo
Subir imagen|Upload image|Enviar imagem
Arrastrala para moverla · PNG, JPG o WebP|Drag it to move it · PNG, JPG or WebP|Arraste para movê-la · PNG, JPG ou WebP
Insertar captura|Insert screenshot|Inserir captura
Maqueta: la extensión captura la pestaña activa|Mockup: the extension captures the active tab|Maquete: a extensão captura a aba ativa
Imagen de portada (opcional)|Cover image (optional)|Imagem de capa (opcional)
Quitar|Remove|Remover
Cancelar|Cancel|Cancelar
Ordenar notas|Sort notes|Ordenar notas
Se borra la nota con todo lo que tiene. No se puede deshacer.|The note is deleted with everything in it. This can't be undone.|A nota é apagada com tudo o que tem. Não é possível desfazer.
Eliminar|Delete|Excluir
Buscar en notas…|Search notes…|Buscar nas notas…
Recientes|Recent|Recentes
Todavía no buscaste nada.|You haven't searched for anything yet.|Você ainda não buscou nada.
Notas recientes|Recent notes|Notas recentes
Tus notas van a aparecer acá.|Your notes will show up here.|Suas notas vão aparecer aqui.
Reglas y ajustes|Rules and settings|Regras e ajustes
Proyecto activo|Active project|Projeto ativo
Reglas de organización|Organization rules|Regras de organização
Se aplican en orden. La primera regla que define un tablero decide dónde va la pieza; las etiquetas de todas las reglas que coinciden se suman.|They apply in order. The first rule that sets a board decides where the piece goes; the tags of every matching rule are added up.|São aplicadas em ordem. A primeira regra que define um quadro decide para onde vai a peça; as etiquetas de todas as regras que coincidem se somam.
+ Nueva regla|+ New rule|+ Nova regra
Reaplicar a Sin clasificar|Reapply to Unsorted|Reaplicar a Sem classificação
Editar regla|Edit rule|Editar regra
Los cambios se guardan solos|Changes are saved automatically|As alterações são salvas sozinhas
Los cambios se guardan solos.|Changes are saved automatically.|As alterações são salvas sozinhas.
Nombre|Name|Nome
Condiciones|Conditions|Condições
Coinciden|Match|Coincidem
todas|all|todas
alguna|any|alguma
+ Condición|+ Condition|+ Condição
Entonces|Then|Então
Mover a|Move to|Mover para
Etiquetar|Tag|Etiquetar
Eliminar regla|Delete rule|Excluir regra
Elegí una regla de la lista o creá una nueva.|Pick a rule from the list or create a new one.|Escolha uma regra da lista ou crie uma nova.
Tableros|Boards|Quadros
Las colecciones donde se guardan tus piezas. Las reglas mandan las piezas nuevas a un tablero; lo que no coincide queda en Sin clasificar.|The collections where your pieces are kept. Rules send new pieces to a board; whatever doesn't match stays in Unsorted.|As coleções onde suas peças ficam guardadas. As regras mandam as peças novas para um quadro; o que não coincide fica em Sem classificação.
piezas ·|pieces ·|peças ·
Proyectos|Projects|Projetos
Nube y copia|Cloud and backup|Nuvem e cópia
Nube y copia local|Cloud and local backup|Nuvem e cópia local
Tu librería se guarda en la nube para abrirla desde cualquier computadora. Además podés bajar una copia a este equipo y restaurarla cuando quieras.|Your library is saved in the cloud so you can open it from any computer. You can also download a backup to this device and restore it whenever you want.|Sua biblioteca fica salva na nuvem para abrir de qualquer computador. Você também pode baixar uma cópia neste dispositivo e restaurá-la quando quiser.
Sincronizar en la nube|Sync to the cloud|Sincronizar na nuvem
Sincronizar ahora|Sync now|Sincronizar agora
Iniciar sesión con Google|Sign in with Google|Entrar com o Google
Cerrar sesión|Sign out|Sair
Sincronizando…|Syncing…|Sincronizando…
Iniciá sesión con Google para usar tu librería en cualquier computadora.|Sign in with Google to use your library on any computer.|Entre com o Google para usar sua biblioteca em qualquer computador.
Se sincronizan tus piezas, imágenes, tableros, notas, reglas y apariencia entre la extensión, la web y tus otras computadoras.|Your pieces, images, boards, notes, rules and appearance sync between the extension, the web and your other computers.|Suas peças, imagens, quadros, notas, regras e aparência são sincronizadas entre a extensão, a web e seus outros computadores.
sin conexión.|you're offline.|sem conexão.
Google no devolvió el código de acceso.|Google didn't return the access code.|O Google não devolveu o código de acesso.
Maqueta: la cuenta en la nube se conecta en la app real. Ahora tenés|Mockup: the cloud account connects in the real app. Right now you have|Maquete: a conta na nuvem se conecta no app real. Agora você tem
Copia local|Local backup|Cópia local
Bajá una copia de tu librería a este equipo y restaurala cuando quieras.|Download a backup of your library to this device and restore it whenever you want.|Baixe uma cópia da sua biblioteca neste dispositivo e restaure quando quiser.
Exportar copia (.json)|Export backup (.json)|Exportar cópia (.json)
Importar copia|Import backup|Importar cópia
Atajo para guardar: Alt+Shift+S · clic derecho sobre imágenes y texto|Shortcut to save: Alt+Shift+S · right-click on images and text|Atalho para salvar: Alt+Shift+S · clique direito em imagens e texto
Apariencia|Appearance|Aparência
Se aplica a todas las pantallas de la librería.|Applies to every screen of the library.|Vale para todas as telas da biblioteca.
Idioma|Language|Idioma
Modo|Mode|Modo
Paleta|Palette|Paleta
Tipografía principal (títulos)|Main typeface (titles)|Tipografia principal (títulos)
Tipografía secundaria (texto)|Secondary typeface (text)|Tipografia secundária (texto)
Pantalla completa: imágenes menores a 1920×1080|Fullscreen: images smaller than 1920×1080|Tela cheia: imagens menores que 1920×1080
Opciones de|Options for|Opções de
Quitar imagen|Remove image|Remover imagem
Quitar captura|Remove screenshot|Remover captura
Título de la nota|Note title|Título da nota
Escribí acá…|Write here…|Escreva aqui…
Texto de la nota|Note text|Texto da nota
Volver a todas las notas|Back to all notes|Voltar para todas as notas
Nota anterior|Previous note|Nota anterior
Nueva nota|New note|Nova nota
Nota siguiente|Next note|Próxima nota
Texto más chico|Smaller text|Texto menor
Texto más grande|Larger text|Texto maior
Achicar la última imagen|Shrink the last image|Diminuir a última imagem
Agrandar la última imagen|Enlarge the last image|Aumentar a última imagem
Nombre de la nota|Note name|Nome da nota
Cerrar menú|Close menu|Fechar menu
Cerrar orden|Close sorting|Fechar ordenação
Abrir buscador|Open search|Abrir busca
Texto|Text|Texto
Formato|Format|Formato
Dibujar|Draw|Desenhar
Borrador|Eraser|Borracha
Captura de pantalla|Screenshot|Captura de tela
Principal|Home|Início
Principal (sección actual)|Home (current section)|Início (seção atual)
Archivo|Archive|Arquivo
Archivo (sección actual)|Archive (current section)|Arquivo (seção atual)
Anotador|Notebook|Anotações
Anotador (sección actual)|Notebook (current section)|Anotações (seção atual)
Cerrar buscador|Close search|Fechar busca
Cerrar ajustes|Close settings|Fechar ajustes
Subir regla|Move rule up|Subir regra
Bajar regla|Move rule down|Descer regra
Activar regla|Turn rule on|Ativar regra
Nombre de la regla|Rule name|Nome da regra
Tipo de condición|Condition type|Tipo de condição
Valor de la condición|Condition value|Valor da condição
Quitar condición|Remove condition|Remover condição
Tablero de destino|Destination board|Quadro de destino
paleta, hud (separadas por coma)|palette, hud (comma-separated)|paleta, hud (separadas por vírgula)
Etiquetas|Tags|Etiquetas
Todavía no tenés tableros|You don't have any boards yet|Você ainda não tem quadros
Creá uno para empezar a juntar referencias. Lo que guardes con la extensión va a ir apareciendo adentro.|Create one to start collecting references. Whatever you save with the extension will show up inside.|Crie um para começar a juntar referências. O que você salvar com a extensão vai aparecer dentro.
+ Crear tablero|+ Create board|+ Criar quadro
← Tableros|← Boards|← Quadros
Publicación de|Post from|Publicação de
Este tablero está vacío|This board is empty|Este quadro está vazio
Lo que guardes acá va a aparecer en mosaico, siempre lo último arriba. Podés probar arrastrando una imagen, un video o un enlace a esta pantalla.|Whatever you save here will show up as a mosaic, newest on top. Try dragging an image, a video or a link onto this screen.|O que você salvar aqui vai aparecer em mosaico, sempre o mais recente em cima. Experimente arrastar uma imagem, um vídeo ou um link para esta tela.
+ Agregar pieza|+ Add piece|+ Adicionar peça
Agregar pieza|Add piece|Adicionar peça
Soltá para sumarlo al tablero|Drop to add it to the board|Solte para adicionar ao quadro
Agregar a|Add to|Adicionar a
En el uso real lo guarda la extensión. Acá podés sumarlo a mano: va a aparecer primero en el tablero.|Normally the extension saves it. Here you can add it by hand: it will show up first on the board.|Normalmente a extensão salva. Aqui você pode adicionar à mão: vai aparecer primeiro no quadro.
Elegir imagen, GIF o video|Choose an image, GIF or video|Escolher imagem, GIF ou vídeo
o arrastralo acá · PNG, JPG, WebP, GIF, MP4 o WebM|or drag it here · PNG, JPG, WebP, GIF, MP4 or WebM|ou arraste aqui · PNG, JPG, WebP, GIF, MP4 ou WebM
Cambiar|Change|Mudar
Título (opcional)|Title (optional)|Título (opcional)
Sacado de (opcional)|Taken from (optional)|Tirado de (opcional)
Enlace|Link|Link
Etiquetas automáticas:|Automatic tags:|Etiquetas automáticas:
Agregar|Add|Adicionar
Portada de|Cover for|Capa de
Elegí una imagen o video del tablero, o subí otra. En automático usa lo último que guardaste.|Choose an image or video from the board, or upload another one. Automatic uses the last thing you saved.|Escolha uma imagem ou vídeo do quadro, ou envie outra. No automático usa o último que você salvou.
Automática|Automatic|Automática
Lo más reciente|Most recent|O mais recente
Subir otra imagen|Upload another image|Enviar outra imagem
Abrir sitio|Open site|Abrir site
Ir al sitio|Go to site|Ir ao site
Título|Title|Título
Nota|Note|Nota
Sitio web|Website|Site
Etiquetas automáticas (por el sitio)|Automatic tags (from the site)|Etiquetas automáticas (pelo site)
Tus etiquetas|Your tags|Suas etiquetas
Tablero|Board|Quadro
Eliminar pieza|Delete piece|Excluir peça
Tocá de nuevo para eliminar|Tap again to delete|Toque de novo para excluir
Guardado recientemente|Recently saved|Salvo recentemente
Lo que guardes va a aparecer acá.|Whatever you save will show up here.|O que você salvar vai aparecer aqui.
Abrir|Open|Abrir
Opciones del tablero|Board options|Opções do quadro
Ver|View|Ver
Ordenar|Sort|Ordenar
Nombre del tablero|Board name|Nome do quadro
Ej: paleta de atardecer|E.g.: sunset palette|Ex.: paleta de pôr do sol
Si lo dejás vacío uso el sitio|If you leave it empty, the site is used|Se deixar vazio, uso o site
Ej: idea para el HUD|E.g.: idea for the HUD|Ex.: ideia para o HUD
Pegá o escribí el texto que querés guardar|Paste or type the text you want to save|Cole ou escreva o texto que quer salvar
Elegir portada|Choose cover|Escolher capa
Usar|Use|Usar
como portada|as cover|como capa
Usar como portada|Use as cover|Usar como capa
Cerrar pieza|Close piece|Fechar peça
Texto guardado|Saved text|Texto salvo
Sin título|Untitled|Sem título
Por qué lo guardaste, dónde lo vas a usar…|Why you saved it, where you'll use it…|Por que você salvou, onde vai usar…
Todavía no guardaste nada|You haven't saved anything yet|Você ainda não salvou nada
Lo que guardes con la extensión va a ir apareciendo acá, siempre lo último primero.|Whatever you save with the extension will show up here, newest first.|O que você salvar com a extensão vai aparecer aqui, sempre o mais recente primeiro.
Ver ficha completa|See full details|Ver ficha completa
Buscar…|Search…|Buscar…
Ver pieza|View piece|Ver peça
Vista 1: pantalla completa|View 1: fullscreen|Visualização 1: tela cheia
Vista 2: mosaico|View 2: mosaic|Visualização 2: mosaico
No hay ninguna pieza abierta|No piece is open|Nenhuma peça aberta
Abrí una pieza desde un tablero o desde la pantalla principal y tocá «Ver ficha completa».|Open a piece from a board or from the home screen and tap “See full details”.|Abra uma peça de um quadro ou da tela inicial e toque em «Ver ficha completa».
volver|back|voltar
Nuevo tablero|New board|Novo quadro
Aplicar reglas al guardar|Apply rules when saving|Aplicar regras ao salvar
Mostrar aviso al guardar|Show a notice when saving|Mostrar aviso ao salvar
Guardar también una copia automática en este equipo|Also keep an automatic backup on this device|Salvar também uma cópia automática neste dispositivo
Dominio|Domain|Domínio
ej: pinterest.com|e.g.: pinterest.com|ex.: pinterest.com
Palabras clave|Keywords|Palavras-chave
ej: paleta, hud|e.g.: palette, hud|ex.: paleta, hud
Tipo|Type|Tipo
Regla sin nombre|Untitled rule|Regra sem nome
Nueva regla|New rule|Nova regra
Sin cambiar de tablero|Don't change board|Sem mudar de quadro
Reglas|Rules|Regras
Sin clasificar|Unsorted|Sem classificação
No hay reglas activas que muevan piezas a un tablero.|No active rule moves pieces to a board.|Nenhuma regra ativa move peças para um quadro.
sin reglas|no rules|sem regras
Activo|Active|Ativo
Hacer activo|Make active|Tornar ativo
Desactivada: solo se guarda en este navegador|Off: it's only kept in this browser|Desativada: só fica salva neste navegador
No se pudo descargar la copia desde acá.|The backup couldn't be downloaded from here.|Não foi possível baixar a cópia daqui.
Ese archivo no es una copia de Archivero.|That file isn't an Archivero backup.|Esse arquivo não é uma cópia do Archivero.
No hay piezas en Sin clasificar.|There are no pieces in Unsorted.|Não há peças em Sem classificação.
Claro|Light|Claro
Oscuro|Dark|Escuro
Fondo desenfocado|Blurred background|Fundo desfocado
La imagen entera, sobre una versión desenfocada de sí misma.|The whole image, over a blurred version of itself.|A imagem inteira, sobre uma versão desfocada de si mesma.
Color de fondo|Background color|Cor de fundo
La imagen entera, sobre su color promedio.|The whole image, over its average color.|A imagem inteira, sobre sua cor média.
Marco a tamaño real|Frame at actual size|Moldura em tamanho real
Sin agrandarla, con un paspartú blanco, como en una galería.|Without enlarging it, with a white mat, like in a gallery.|Sem aumentar, com um passe-partout branco, como numa galeria.
Ampliar y recortar|Enlarge and crop|Ampliar e cortar
Llena la pantalla aunque se pixele y se recorte.|Fills the screen even if it gets pixelated and cropped.|Preenche a tela mesmo que fique pixelada e cortada.
Grafito|Graphite|Grafite
Pizarra|Slate|Ardósia
Océano|Ocean|Oceano
Turquesa|Turquoise|Turquesa
Bosque|Forest|Floresta
Musgo|Moss|Musgo
Arena|Sand|Areia
Ámbar|Amber|Âmbar
Terracota|Terracotta|Terracota
Vino|Wine|Vinho
Rosa|Pink|Rosa
Lavanda|Lavender|Lavanda
Imagen|Image|Imagem
Video|Video|Vídeo
Sin tablero|No board|Sem quadro
Negro|Black|Preto
Gris oscuro|Dark gray|Cinza-escuro
Blanco|White|Branco
Gris|Gray|Cinza
Volver a la cara frontal|Back to the front|Voltar para a frente
Dar vuelta la nota|Flip the note|Virar a nota
Fino|Thin|Fino
Medio|Medium|Médio
Grueso|Thick|Grosso
Más recientes primero|Newest first|Mais recentes primeiro
Más antiguas primero|Oldest first|Mais antigas primeiro
Más antiguos primero|Oldest first|Mais antigos primeiro
Con más piezas primero|Most pieces first|Com mais peças primeiro
Editar nombre y portada|Edit name and cover|Editar nome e capa
Mover al principio|Move to the start|Mover para o início
Mover al final|Move to the end|Mover para o final
Editar nota|Edit note|Editar nota
Guardar|Save|Salvar
Crear nota|Create note|Criar nota
Cambiá el nombre o la imagen de portada.|Change the name or the cover image.|Mude o nome ou a imagem de capa.
Mi primer tablero|My first board|Meu primeiro quadro
Renombrar|Rename|Renomear
Eliminar tablero|Delete board|Excluir quadro
Ver y editar|View and edit|Ver e editar
Renombrar tablero|Rename board|Renomear quadro
Elegí un nombre nuevo.|Choose a new name.|Escolha um nome novo.
Ponele un nombre. Después podés cambiarlo o reordenarlo.|Give it a name. You can change it or reorder it later.|Dê um nome. Depois você pode mudá-lo ou reordená-lo.
Crear tablero|Create board|Criar quadro
Imagen o video|Image or video|Imagem ou vídeo
Ordenar piezas|Sort pieces|Ordenar peças
Ordenar tableros|Sort boards|Ordenar quadros
Buscar por nombre, #etiqueta, sitio o color…|Search by name, #tag, site or color…|Buscar por nome, #etiqueta, site ou cor…
No hay notas con eso.|No notes match that.|Nenhuma nota com isso.
No encontré nada con eso.|Nothing matches that.|Não encontrei nada com isso.
1 resultado|1 result|1 resultado
Mirando los colores…|Looking at the colors…|Analisando as cores…
Borrar|Clear|Apagar
Todavía no hay nada para mostrar acá|Nothing to show here yet|Ainda não há nada para mostrar aqui
La pantalla completa muestra tus imágenes y las páginas web que guardes.|Fullscreen shows your images and the web pages you save.|A tela cheia mostra suas imagens e as páginas web que você salvar.
Manifesto|Manifesto|Manifesto
Este proyecto fue hecho con el fin de ayudar a creativos / artistas / quien sea que lo necesite a sentir la capacidad de mantener esta falsa ilusión de posesión en esta etapa tan fugaz del presente en el que habitamos. Aunque sea tan solo por un momento.|This project was made to help creatives / artists / whoever needs it feel able to hold on to this false illusion of possession in this fleeting stage of the present we live in. Even if just for a moment.|Este projeto foi feito para ajudar criativos / artistas / quem precisar a sentir a capacidade de manter esta falsa ilusão de posse nesta etapa tão fugaz do presente em que habitamos. Nem que seja só por um momento.
Yo lo necesitaba, por eso lo hice. Estoy seguro que alguien mas en algún lugar del mundo se siente de la misma forma.|I needed it, so I made it. I'm sure someone else somewhere in the world feels the same way.|Eu precisava, por isso fiz. Tenho certeza de que mais alguém em algum lugar do mundo se sente da mesma forma.
Archivero es y siempre va a ser open source: el código está abierto para verlo, usarlo y mejorarlo.|Archivero is and always will be open source: the code is open to read, use and improve.|O Archivero é e sempre será open source: o código está aberto para ver, usar e melhorar.
Guardá img, links, etc. Se ordena solo.|Save images, links and more. It sorts itself.|Salve imagens, links etc. Se organiza sozinho.
Guardar en|Save to|Salvar em
Todavía no tenés tableros. Creá uno con + para elegir dónde se guardan tus elementos.|You don't have any boards yet. Create one with + to choose where your items are saved.|Você ainda não tem quadros. Crie um com + para escolher onde seus itens são salvos.
Guardar esta página|Save this page|Salvar esta página
Abrir mi archivero|Open my archivero|Abrir meu archivero
Atajo: Alt + Shift + S - Click Der sobre imagenes y texto|Shortcut: Alt + Shift + S - Right-click on images and text|Atalho: Alt + Shift + S - Clique direito em imagens e texto
Automático (según tus reglas)|Automatic (by your rules)|Automático (pelas suas regras)
Guardando…|Saving…|Salvando…
Página guardada|Page saved|Página salva
No se pudo guardar:|Couldn't save:|Não foi possível salvar:
Guardado|Saved|Salvo
Cerrar|Close|Fechar
+ Nuevo tablero…|+ New board…|+ Novo quadro…
Nombre del tablero nuevo|New board name|Nome do novo quadro
Crear|Create|Criar
Todavía no tenés tableros: creá uno para guardar acá.|You don't have any boards yet: create one to save here.|Você ainda não tem quadros: crie um para salvar aqui.
Etiquetas (separadas por coma)|Tags (comma-separated)|Etiquetas (separadas por vírgula)
copia|backup|cópia
Vista previa|Preview|Pré-visualização
Buscar|Search|Buscar
Quitar el color|Remove the color|Remover a cor
Buscar por color|Search by color|Buscar por cor
Color en hexadecimal|Hex color|Cor em hexadecimal
Sumar este color y elegir otro|Add this color and pick another|Adicionar esta cor e escolher outra
Tipo de contenido|Content type|Tipo de conteúdo
imagen|image|imagem
enlace|link|link
texto|text|texto
video|video|vídeo
captura|screenshot|captura
Buscar en tableros…|Search boards…|Buscar nos quadros…
Nombre (A–Z)|Name (A–Z)|Nome (A–Z)
Título (A–Z)|Title (A–Z)|Título (A–Z)
Manual (arrastrá para mover)|Manual (drag to move)|Manual (arraste para mover)
Por tipo (imagen, enlace, texto)|By type (image, link, text)|Por tipo (imagem, link, texto)
Portada elegida|Chosen cover|Capa escolhida
Está vacío. No se puede deshacer.|It's empty. This can't be undone.|Está vazio. Não é possível desfazer.
esta pieza|this piece|esta peça
su tablero|its board|seu quadro
sin condiciones|no conditions|sem condições
sin cambiar tablero|don't change board|sem mudar de quadro
chica|small|pequena
mediana|medium|média
grande|large|grande
horizontal|landscape|horizontal
vertical|portrait|vertical
cuadrada|square|quadrada
panorámica|panoramic|panorâmica
texto corto|short text|texto curto
texto medio|medium text|texto médio
texto largo|long text|texto longo
música embebida|embedded music|música incorporada
publicación embebida|embedded post|publicação incorporada
video embebido|embedded video|vídeo incorporado
video vertical embebido|embedded vertical video|vídeo vertical incorporado
enlace embebido|embedded link|link incorporado
Guardar imagen en Archivero|Save image to Archivero|Salvar imagem no Archivero
Guardar video en Archivero|Save video to Archivero|Salvar vídeo no Archivero
Guardar enlace en Archivero|Save link to Archivero|Salvar link no Archivero
Guardar texto seleccionado en Archivero|Save selected text to Archivero|Salvar texto selecionado no Archivero
Guardar esta página en Archivero|Save this page to Archivero|Salvar esta página no Archivero
`;

const DICT = { en: new Map(), pt: new Map() };
for (const line of ROWS.split('\n')) {
  const [es, en, pt] = line.split('|');
  if (!es || !en || !pt) continue;
  DICT.en.set(es, en);
  DICT.pt.set(es, pt);
}

// Textos armados con datos (números, nombres): español → [inglés, portugués].
const PATTERNS = [
  [/^(\d+) resultados$/, (m) => [m[1] + ' results', m[1] + ' resultados']],
  [/^(\d+) resultados \(se muestran (\d+)\)$/, (m) => [m[1] + ' results (showing ' + m[2] + ')', m[1] + ' resultados (mostrando ' + m[2] + ')']],
  [/^(.*): ver ficha completa$/, (m) => [m[1] + ': see full details', m[1] + ': ver ficha completa']],
  [/^(.*): ver información$/, (m) => [m[1] + ': see details', m[1] + ': ver informações']],
  [/^Listo: (\d+) piezas clasificadas, (\d+) siguen en Sin clasificar\.$/, (m) => ['Done: ' + m[1] + ' pieces sorted, ' + m[2] + ' still in Unsorted.', 'Pronto: ' + m[1] + ' peças classificadas, ' + m[2] + ' continuam em Sem classificação.']],
  [/^(\d+) (piezas?|tableros?)$/, (m) => [m[1] + ' ' + count(m, 'en'), m[1] + ' ' + count(m, 'pt')]],
  [/^(\d+) piezas? en (\d+) tableros?$/, (m) => [m[1] + ' pieces in ' + m[2] + ' boards', m[1] + ' peças em ' + m[2] + ' quadros']],
  [/^Copia (descargada|restaurada): (\d+) piezas, (\d+) tableros y (\d+) notas\.$/, (m) => [
    'Backup ' + (m[1] === 'descargada' ? 'downloaded' : 'restored') + ': ' + m[2] + ' pieces, ' + m[3] + ' boards and ' + m[4] + ' notes.',
    'Cópia ' + (m[1] === 'descargada' ? 'baixada' : 'restaurada') + ': ' + m[2] + ' peças, ' + m[3] + ' quadros e ' + m[4] + ' notas.',
  ]],
  [/^Conectada como (.*)$/, (m) => ['Signed in as ' + m[1], 'Conectado como ' + m[1]]],
  [/^última sincronización (.*)$/, (m) => ['last synced ' + m[1], 'última sincronização ' + m[1]]],
  [/^No se pudo sincronizar: (.*)$/, (m, t) => ["Couldn't sync: " + t(m[1]), 'Não foi possível sincronizar: ' + t(m[1])]],
  [/^(Subiendo|Bajando) (imágenes|cambios) \((\d+) de (\d+)\)…$/, (m) => {
    const up = m[1] === 'Subiendo', img = m[2] === 'imágenes';
    return [(up ? 'Uploading ' : 'Downloading ') + (img ? 'images' : 'changes') + ' (' + m[3] + ' of ' + m[4] + ')…',
      (up ? 'Enviando ' : 'Baixando ') + (img ? 'imagens' : 'alterações') + ' (' + m[3] + ' de ' + m[4] + ')…'];
  }],
  [/^Tablero #(\d+)$/, (m) => ['Board #' + m[1], 'Quadro #' + m[1]]],
  [/^Buscar en (.*)…$/, (m, t) => ['Search ' + t(m[1]) + '…', 'Buscar em ' + t(m[1]) + '…']],
  [/^Tamaño en el tablero: (.*)$/, (m, t) => ['Size on the board: ' + t(m[1]), 'Tamanho no quadro: ' + t(m[1])]],
  [/^Activada · última sincronización (.*)$/, (m) => ['On · last synced ' + m[1], 'Ativada · última sincronização ' + m[1]]],
  [/^¿Eliminar «(.*)»\?$/, (m, t) => ['Delete “' + t(m[1]) + '”?', 'Excluir «' + t(m[1]) + '»?']],
  [/^También se borran sus (\d+) piezas?\. No se puede deshacer\.$/, (m) => ['Its ' + m[1] + ' pieces are deleted too. This can\'t be undone.', 'Suas ' + m[1] + ' peças também são apagadas. Não é possível desfazer.']],
  [/^Se quita de (.*)\. No se puede deshacer\.$/, (m, t) => ['It\'s removed from ' + t(m[1]) + '. This can\'t be undone.', 'É removida de ' + t(m[1]) + '. Não é possível desfazer.']],
  // Resumen de una regla: "dominio: x y palabras clave: y → Tablero · #tag".
  [/^(.*) → (.*?)( · #.*)?$/, (m, t) => {
    // El valor del tipo de contenido ('captura', 'imagen'…) también se traduce; los demás son del usuario.
    const cond = (p) => p.replace(/^([^:]+): (.*)$/, (x, k, v) => t(k[0].toUpperCase() + k.slice(1)).toLowerCase() + ': ' + (k === 'tipo de contenido' ? t(v) : v));
    const conds = (lang) => m[1].split(/ (y|o) /).map((p, i) => (i % 2 ? CONJ[lang][p] : cond(p))).join(' ');
    return [conds('en') + ' → ' + t(m[2]) + (m[3] || ''), conds('pt') + ' → ' + t(m[2]) + (m[3] || '')];
  }],
];
const CONJ = { en: { y: 'and', o: 'or' }, pt: { y: 'e', o: 'ou' } };
const count = (m, lang) => {
  const one = m[1] === '1', board = m[2].startsWith('tablero');
  if (lang === 'en') return board ? (one ? 'board' : 'boards') : (one ? 'piece' : 'pieces');
  return board ? (one ? 'quadro' : 'quadros') : (one ? 'peça' : 'peças');
};

let missing = null; // en la consola: window.__i18nMissing() lista lo que no se tradujo

function pick(lang, pair) { return lang === 'en' ? pair[0] : pair[1]; }

// Traduce un texto. Conserva los espacios de los costados; lo que no conoce lo deja igual.
export function translate(s, lang) {
  if (!s || lang === 'es' || !DICT[lang] || typeof s !== 'string') return s;
  const k = s.trim();
  if (!k) return s;
  let out = DICT[lang].get(k);
  const t = (x) => translate(x, lang);
  if (out == null) {
    for (const [re, fn] of PATTERNS) {
      const m = k.match(re);
      if (m) { out = pick(lang, fn(m, t)); break; }
    }
  }
  // Partes separadas por " · " (por ejemplo "mediana · horizontal · 1400×900"): cada una por su lado.
  if (out == null && k.includes(' · ')) {
    const parts = k.split(' · ');
    const tr = parts.map(t);
    if (tr.some((p, i) => p !== parts[i])) out = tr.join(' · ');
  }
  if (out == null) {
    if (missing && /[a-záéíóúñ]{3}/i.test(k) && k.length < 300) missing.add(k);
    return s;
  }
  return s.slice(0, s.indexOf(k)) + out + s.slice(s.indexOf(k) + k.length);
}

// Partes fijas de una plantilla del diseño: textos entre etiquetas y atributos legibles.
// Los {{huecos}} quedan como están (sus valores se traducen al dibujar).
const READABLE = /\b(aria-label|placeholder|data-tip|title|alt)="([^"]*)"/g;
export function localizeTemplate(tpl, lang) {
  if (lang === 'es') return tpl;
  const tr = (txt) => txt.split(/(\{\{[^}]*\}\})/).map((p) => (p.startsWith('{{') ? p : translate(p, lang))).join('');
  return tpl
    .replace(/>([^<>]+)</g, (m, txt) => '>' + tr(txt) + '<')
    .replace(READABLE, (m, a, v) => a + '="' + tr(v) + '"');
}

// Páginas comunes (el popup): traduce los textos y atributos legibles de un elemento.
export function translateDom(root, lang) {
  if (lang === 'es') return;
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) n.textContent = translate(n.textContent, lang);
  for (const el of root.querySelectorAll('[aria-label],[placeholder],[title],[alt]')) {
    for (const a of ['aria-label', 'placeholder', 'title', 'alt']) if (el.hasAttribute(a)) el.setAttribute(a, translate(el.getAttribute(a), lang));
  }
}

// Idioma elegido en Apariencia (páginas de la extensión, que comparten localStorage).
export function uiLang() {
  try {
    const l = (JSON.parse(localStorage.getItem('archivero.ui.v1') || 'null') || {}).lang;
    return LANGS.some((x) => x[0] === l) ? l : 'es';
  } catch {
    return 'es';
  }
}

// Para revisar traducciones faltantes desde la consola.
export function trackMissing() {
  missing = new Set();
  if (typeof window !== 'undefined') window.__i18nMissing = () => [...missing];
}
