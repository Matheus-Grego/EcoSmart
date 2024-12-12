import React from 'react';
import { useEffect, useState } from 'react';
import "../css/ecosmart.css"
import { Separacao } from './EcoSmartTexts';
import { Beneficios } from './EcoSmartTexts';


const Modal = ({ isOpen, onClose, text }) => {
    if (!isOpen) return null;
    

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <a onClick={onClose} style={styles.closeButton}>Fechar</a>
          <div>{text}</div> 
        </div>
      </div>
    );
  };


const Ecosmart = () => {

    const [dados, setDados] = useState(null)
    const [Search, setSearch] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [trashcan, setTrash] = useState(null);

      // useEffect(() => {
      //   fetch('/wordlist.json') 
      //     .then((response) => response.json())
      //     .then((data) => setTrash(data))
      //     .catch((error) => console.error('Erro ao carregar o arquivo JSON:', error));
      // }, []);
      
    
    // Função para abrir o modal
    const openModal = (text) => {
      setModalText(text)
      setIsModalOpen(true);
    };
  
    // Função para fechar o modal
    const closeModal = () => {
      setIsModalOpen(false);
      setModalText(null);
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
          "caixa de papel",
          "embrulho",
          "caderno",
          "sulfite",
          "livro",
        ],
        "plastic": [
          "embalagem plástica",
          "embalagem transparente",
          "garrafa plástica",
          "plastica",
          "plastico",
          "sacola",
          "tampa",
          "copo plastico",
          "pote",
          "pacote"
        ],
        "glass": [
          "garrafa de vidro",
          "vidro",
          "cacos",
          "pote de vidro",
          "frasco",
          "recipiente de vidro",
          "copo de vidro"
        ],
        "metal": [
          "lata",
          "latinha",
          "aluminio",
          "garrafa de metal",
          "grampo",
          "metal"
        ],

        "organic": [
          "casca",
          "marmita",
          "guardanapo sujo",
          "papel toalha usado"
        ],
        "non-recycle": [
          "adesivo",
          "guardanapo limpo",
          "sujeira",
          "poeira",
          "silicone",
          "embalagem laminada",
          "embalagem de salgadinho",
          "sachê",
          "pacote laminado",
        ],
        "organic-food": [
          "restos",
          "alimentos",
          "legumes",
          "fruta",
          "maça",
          "massa",
          "alimentos",
          "vegetais",
          "semente",
          "carcaça",
          "osso"
        ]
      }]
      
      const SearchData = (searchvalue) => {
        document.getElementsByClassName("search").value = ""
         trash.map(item => {
             for (const type of ['paper', 'plastic', 'glass','metal','organic','organic-food','non-recycle']) {
               if (item[type].includes(searchvalue)) {
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

       const clickitem = (suggestion) => {
        setSearch(suggestion)
        SearchData(suggestion)
       }

      const handleKeyPress = e => {
        if (e.key === "Enter") {
          SearchData(Search);
        }
      };

      const handleSearchChange = (e) => {
        
        setSearch(e.target.value);
        const query = e.target.value.replace(' ', ''); 
        if (query.length > 0) {
            // Junta todas as palavras de todas as categorias
            const allWords = trash[0] ? Object.values(trash[0]).flat() : [];
            const filteredSuggestions = allWords.filter(word => (word.toLowerCase().includes(query) || query.includes(word))).slice(0,4);
            --
            setSuggestions(filteredSuggestions);
        } else {     
            setSuggestions([]);
        }
    };

    return(  
        <div className='Ecosmart'>
            <Modal isOpen={isModalOpen} onClose={closeModal} text={modalText}  />
             <div className='navbar'>
                <a>Dados Reciclagem</a>
                <a onClick={() => openModal(<Separacao />)}>Separacão de residos</a>
                <a onClick={() => openModal(<Beneficios />)}>Beneficios da coleta</a>
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
                      style={{outline: "none"}}
                      placeholder="Pesquise por palavras..." 
                  />
                    <img width={"20px"} src='/ecosmart-icons/search.png' onClick={() => SearchData(Search)} alt="Search" />
                    
                </div>
                {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => clickitem(suggestion)}>{suggestion}</li>
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
