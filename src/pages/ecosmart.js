import React from 'react';
import { useEffect, useState } from 'react';
import Fuse from "fuse.js";
import "../css/ecosmart.css"
import { PowerBIEmbed } from 'powerbi-client-react';
import { Backdrop, Flex } from '@patternfly/react-core';
import { Bold } from 'lucide-react';
import { color } from 'chart.js/helpers';


const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <a onClick={onClose} style={styles.closeButton}>Fechar</a>
          <div style={styles.modalText}>
            <div className='title'>Separacão de residos</div>
            <br></br>
            <div>Uma das etapas mais importantes da coleta seletiva é separar corretamente os materiais recicláveis, orgânicos e rejeitos. Aqui está um guia prático e detalhado para ajudar: <span>PASSO A PASSO PARA SEPARAR RESÍDUOS</span></div> 
            <ol>
              <li>Tenha lixeiras ou sacos específicos para cada tipo de resíduo: Utilize recipientes diferentes, preferencialmente nas cores padrão da coleta seletiva (veja abaixo), para evitar a mistura de materiais. </li>
              <li>Lave os recicláveis antes de descartar: Embalagens de alimentos e bebidas devem ser limpas para evitar odores e contaminação. Não é necessário lavar completamente, apenas remover o excesso de resíduos. </li>
              <li>Dobre ou compacte materiais volumosos: Achate caixas de papelão, garrafas PET e latas de alumínio para economizar espaço.</li>
              <li>Evite misturar recicláveis com rejeitos: Materiais recicláveis contaminados (como papéis engordurados) não podem ser reciclados.</li>
            </ol>
              
              <div className='title'>Cores padrão das lixeiras</div>
              <br></br>
              <div>Essas cores são reconhecidas nacionalmente e ajudam na organização dos resíduos:</div>
              <br></br>
              <h3>Azul: Papel e papelão</h3>
              <div>Exemplos: jornais, revistas, caixas de papelão, folhas de caderno.</div> 
              <div>Evite: Papéis sujos, engordurados ou plastificados.</div>
              <br></br>
              <h3>Vermelho: Plásticos </h3>
              <div>Exemplos: garrafas PET, embalagens de produtos de limpeza, sacolas plásticas.</div> 
              <div>Evite: Embalagens metalizadas, plásticos misturados com outros materiais.</div>
              <br></br>
              <h3>Verde: Vidros</h3>
              <div>Exemplos: garrafas, potes de vidro, frascos de perfumes.</div>
              <div>Evite: Vidros quebrados, espelhos, lâmpadas fluorescentes. </div>
              <br></br>
              <h3>Amarelo: Metais</h3>
              <div>Exemplos: latas de alumínio, tampas metálicas, pregos.</div>
              <div>Evite: Metais contaminados, como latas de tinta ou óleo.</div>
              <br></br>
              <h3>Marrom: Resíduos orgânicos</h3>
              <div>Exemplos: restos de alimentos, cascas de frutas e legumes.</div>
              <div>Evite: Materiais recicláveis misturados com orgânicos.</div>
              <br></br>
              <h3>Preto: Rejeitos (não recicláveis)</h3> 
              <div>Exemplos: absorventes, fraldas descartáveis, esponjas de aço.</div>
              <br></br>
              <div style={{color: "#7ead9a"}}>DICAS ADICIONAIS </div>
              <br></br>
              <div>Use etiquetas ou rótulos: Identifique os recipientes para facilitar a separação.</div>
              <div>Compostagem: Aproveite resíduos orgânicos, como restos de comida, para fazer adubo caseiro.</div>
              <div>Descarte materiais especiais: Pilhas, baterias, eletrônicos e lâmpadas precisam ser descartados em pontos específicos.</div>
              
              <div>Com uma separação eficiente, você contribui para a coleta seletiva e ajuda a preservar o meio ambiente!</div>
            </div>
        </div>
      </div>
    );
  };


const Ecosmart = () => {

    const [dados, setDados] = useState(null)
    const [Search, setSearch] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [suggestions, setSuggestions] = useState([]);
    const [trashcan, setTrash] = useState(null);

      // useEffect(() => {
      //   fetch('/wordlist.json') 
      //     .then((response) => response.json())
      //     .then((data) => setTrash(data))
      //     .catch((error) => console.error('Erro ao carregar o arquivo JSON:', error));
      // }, []);
      
    
    // Função para abrir o modal
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Função para fechar o modal
    const closeModal = () => {
      setIsModalOpen(false);
    };



    const useNavBar = () => {
        useEffect(() => {
            const navBar = document.getElementsByClassName("nav-report-order")[0];
            if (navBar) {
                navBar.classList.add("nav-comm");
            }

            return () => {
                const navBarComm = document.getElementsByClassName("nav-comm")[0];
                if (navBarComm)
                    navBarComm.classList.remove("nav-comm");
            };
        }, []);
    };
    
    useNavBar();
    var trash =  [
      {
        "paper": [
          "papel",
          "papelão",
          "jornal",
          "revista",
          "caixa",
          "embrulho",
          "caderno",
          "sulfite",
          "livro"
        ],
        "plastic": [
          "embalagem",
          "garrafa plástica",
          "frasco",
          "sacola",
          "tampa",
          "copo",
          "pote"
        ],
        "glass": [
          "garrafa",
          "pote",
          "frasco",
          "recipiente",
          "copo"
        ],
        "metal": [
          "lata",
          "garrafa de metal",
          "conserva",
          "tampa",
          "cerveja",
          "embalagem",
          "ferro"
        ],
        "organic": [
          "casca",
          "borra",
          "papel toalha"
        ],
        "non-recycle": [
          "embalagem laminada",
          "salgadinho",
          "sachê",
          "pacote",
          "metálica",
          "alumínio",
          "brilho"
        ],
        "organic-food": [
          "resto",
          "legume",
          "semente",
          "carcaça",
          "camarão",
          "osso"
        ]
      }]
      
      const SearchData = () => {
        document.getElementsByClassName("search").value = ""
         trash.map(item => {
             for (const type of ['paper', 'plastic', 'glass','metal','organic','organic-food','non-recycle']) {
               if (item[type].includes(Search)) {
                 document.getElementById(type).classList.add('active');
                 setTimeout(() => {
                     document.getElementById(type).classList.remove('active');
                   }, 2000);
                 return
               }
             }
             alert("nao encontrado")
             return
           }).filter(result => result !== null);
       }

      const handleKeyPress = e => {
        if (e.key === "Enter") {
          SearchData();
        }
      };

      const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);

        // Filtra as palavras com base na entrada do usuário
        if (query.length > 0) {
            // Junta todas as palavras de todas as categorias
            const allWords = trash[0] ? Object.values(trash[0]).flat() : [];
            const filteredSuggestions = allWords.filter(word => word.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    return(  
        <div className='Ecosmart'>

            <Modal isOpen={isModalOpen} onClose={closeModal} />
             <div className='navbar'>
                <a>Dados Reciclagem</a>
                <a onClick={openModal}>Separacão de residos</a>
                <a>Beneficios da coleta</a>
                <a>Educacão e dicas</a>
            </div>
            <div className='maincontainer'>
                <div className='IconContainer'>
                    <img width={"350px"} src='/ecosmart-icons/logo.png'></img>
                </div>
                <div className="search-container">
                  <input 
                      type="text" 
                      className='search' 
                      value={Search} 
                      onChange={handleSearchChange} 
                      onKeyPress={handleKeyPress} 
                      placeholder="Pesquise por palavras..." 
                  />
                    <img width={"20px"} src='/ecosmart-icons/search.png' onClick={SearchData} alt="Search" />
                    
                </div>
                {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => alert(suggestion)}>{suggestion}</li>
                            ))}
                        </ul>
                    )}
               
            </div>
            <div className='cardscontainer'>
            <div className='card' id='non-recycle' style={{backgroundColor: "#BFBFBF"}}>
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                    </div>
                    
                </div>
                <div className='card' id="organic-food" style={{backgroundColor: "#A44343"}}>
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                        <div className='content'>
                        <h1>Lixo Orgânico (Alimentos)</h1>
                                <div>
                                    Restos de alimentos (frutas, legumes, cascas)
                                </div>
                        
                                <div>
                                    Papel toalha usado
                                </div>
                              
                            <img width={"100%"} src='/ecosmart-icons/waste.png'></img>
                        </div>
                    </div>
                </div>
                <div className='card' id="plastic" style={{backgroundColor: "#FF5555"}}>
                    
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img  className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                        <div className='content'>
                        <h1>Plástico</h1>
                            <div>
                                Garrafas pet (limpas)
                            </div>
                            <div>
                                Embalagens de alimentos (potes, bandejas)
                            </div>
                            <div>
                                Canudos e copos plásticos
                            </div>
                            <div>
                                Sacos plásticos
                            </div>
                            <img width={"100%"} src='/ecosmart-icons/plastic.png'></img>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className='card' id="paper" style={{backgroundColor: "#5B9BFC"}}>
                    <img className='cover'  width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                        <div className='content'>
                            <h1>Papel e Papelão</h1>
                            <div>
                                Jornais e revistas
                            </div>
                            <div>
                                Caixas de papelão
                            </div>
                            <div>
                                Cartões de papelão (embalagens)
                            </div>
                            <div>
                                Cadernos e folhas usadas
                            </div>
                            <img width={"100%"} src='/ecosmart-icons/paper2.png'></img>
                        </div>
                    </div>
                </div>
                <div className='card' id="organic" style={{backgroundColor: "#A44343"}}>
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                        <div className='content'>
                        <h1>Lixo Orgânico</h1>
                                <div>
                                    Restos de alimentos (frutas, legumes, cascas)
                                </div>
                                <div>
                                    Papel toalha usado
                                </div>
                              
                            <img width={"100%"} src='/ecosmart-icons/waste.png'></img>
                        </div>
                    </div>
                </div>
                <div className='card' id="metal" style={{backgroundColor: "#FAEA43"}}>
                    <img   className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                        <div className='content'>
                            <h1>Metais</h1>
                            <div>
                                Latas de bebidas (alumínio, aço)
                            </div>
                            <div>
                                Tampas metálicas
                            </div>
                            <img width={"100%"} src='/ecosmart-icons/metal.png'></img>
                        </div>
                    </div>
                </div>
                
                <div className='card' id='glass' style={{backgroundColor: "#2CFF64"}}>
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                    <img className="recycle-icon"  width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                    </div>
                </div>
            </div>
            
        </div>
    );

}
const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      width: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxHeight: '80vh', 
      overflowY: 'auto', 
    },
    closeButton: {
    
    
  
      padding: '2px 5px',
      cursor: 'pointer',
    },
    modalText: {
      marginTop: "10px",
      color: "#2B302E",
      maxHeight: '70vh',
      overflowY: 'auto', 
      marginBottom: '10px', 
    },
  };

export default Ecosmart;
