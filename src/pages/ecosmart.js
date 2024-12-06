import React from 'react';
import { useEffect, useState } from 'react';
import Fuse from "fuse.js";
import "../css/ecosmart.css"
import { PowerBIEmbed } from 'powerbi-client-react';
import { Backdrop } from '@patternfly/react-core';


const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <button onClick={onClose} style={styles.closeButton}>Fechar</button>
          <h2>Separacão de residos</h2>
          <p>Uma das etapas mais importantes da coleta seletiva é separar corretamente os materiais recicláveis, orgânicos e rejeitos. Aqui está um guia prático e detalhado para ajudar: PASSO A PASSO PARA SEPARAR RESÍDUOS 1. Tenha lixeiras ou sacos específicos para cada tipo de resíduo: Utilize recipientes diferentes, preferencialmente nas cores padrão da coleta seletiva (veja abaixo), para evitar a mistura de materiais. 2. Lave os recicláveis antes de descartar: Embalagens de alimentos e bebidas devem ser limpas para evitar odores e contaminação. Não é necessário lavar completamente, apenas remover o excesso de resíduos. 3. Dobre ou compacte materiais volumosos: Achate caixas de papelão, garrafas PET e latas de alumínio para economizar espaço. 4. Evite misturar recicláveis com rejeitos: Materiais recicláveis contaminados (como papéis engordurados) não podem ser reciclados. CORES PADRÃO DAS LIXEIRAS Essas cores são reconhecidas nacionalmente e ajudam na organização dos resíduos:  Azul: Papel e papelão Exemplos: jornais, revistas, caixas de papelão, folhas de caderno. Evite: Papéis sujos, engordurados ou plastificados.  Vermelho: Plásticos Exemplos: garrafas PET, embalagens de produtos de limpeza, sacolas plásticas. Evite: Embalagens metalizadas, plásticos misturados com outros materiais.
          Verde: Vidros Exemplos: garrafas, potes de vidro, frascos de perfumes. Evite: Vidros quebrados, espelhos, lâmpadas fluorescentes.  Amarelo: Metais Exemplos: latas de alumínio, tampas metálicas, pregos. Evite: Metais contaminados, como latas de tinta ou óleo.  Marrom: Resíduos orgânicos Exemplos: restos de alimentos, cascas de frutas e legumes. Evite: Materiais recicláveis misturados com orgânicos.  Preto: Rejeitos (não recicláveis) Exemplos: absorventes, fraldas descartáveis, esponjas de aço. DICAS ADICIONAIS  Use etiquetas ou rótulos: Identifique os recipientes para facilitar a separação.  Compostagem: Aproveite resíduos orgânicos, como restos de comida, para fazer adubo caseiro.  Descarte materiais especiais: Pilhas, baterias, eletrônicos e lâmpadas precisam ser descartados em pontos específicos. Com uma separação eficiente, você contribui para a coleta seletiva e ajuda a preservar o meio ambiente!</p>
        </div>
      </div>
    );
  };


const Ecosmart = () => {

    const [dados, setDados] = useState(null)
    const [Search, setSearch] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            "livro",
          ],
          "plastic": [
            "embalagem",
            "garrafa",
            "frasco",
            "sacola",
            "embalagem",
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
            "refrigerante",
            "conserva",
            "tampa",
            "cerveja",
            "embalagem",
            "ferro"
          ],
          "organic": [
            "restos",
            "resto de comida",
            "casca de fruta",
            "legume estragado",
            "casca de ovo",
            "borra de café",
            "comida cozida",
            "papel toalha"
          ],
          "non-recycle":["restos",
            "resto de comida",]
        }
      ]

      
      const SearchData = () => {

        trash.map(item => {
            for (const type of ['paper', 'plastic', 'glass','metal']) {
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
                <div class="search-container">
                    <input type="text" className='search' onChange={e => setSearch(e.target.value) } onKeyPress={handleKeyPress}></input>
                    <img width={"20px"} src='/ecosmart-icons/search.png' onClick={() => SearchData()}></img>
                </div>
               
            </div>
            <div className='cardscontainer'>
            <div className='card'style={{backgroundColor: "#BFBFBF"}}>
                    <img  className='cover' width={"100%"} src='/ecosmart-icons/cover.png'></img>
                    <div className='contentbox'>
                        <img className="recycle-icon" width={"80px"} src='/ecosmart-icons/recycle.png'></img>
                    </div>
                    
                </div>
                <div className='card' id="organic" style={{backgroundColor: "#A44343"}}>
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
                
                <div className='card'style={{backgroundColor: "#2CFF64"}}>
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
    },
    closeButton: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '3px',
    },
  };

export default Ecosmart;
